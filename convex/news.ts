import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import schema, { topics } from "./schema";
import { Id } from "./_generated/dataModel";

export const getAllNewsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    order: v.optional(
      v.union(
        v.literal("desc"),
        v.literal("asc"),
        v.literal("viewsDesc"),
        v.literal("viewsAsc")
      )
    ),
    topics: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let query;
    if (args.order === "viewsDesc") {
      query = ctx.db.query("news").withIndex("by_views").order("desc");
    } else if (args.order === "viewsAsc") {
      query = ctx.db.query("news").withIndex("by_views").order("asc");
    } else {
      query = ctx.db.query("news").order("desc");
    }
    const paginated = await query.paginate(args.paginationOpts);

    const resultsWithImage = await Promise.all(
      paginated.page.map(async (news) => {
        let imageUrl = null;
        let authorImageUrl = null;
        if (news.image) {
          imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
        }
        if (news.authorImage) {
          authorImageUrl = await ctx.storage.getUrl(
            news.authorImage as Id<"_storage">
          );
        }
        return {
          ...news,
          image: imageUrl ?? news.image ?? null,
          authorImage: authorImageUrl ?? null,
        };
      })
    );

    return {
      ...paginated,
      page: resultsWithImage,
    };
  },
});

export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id as Id<"news">);
  },
});

export const getAllTopics = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").collect();
    const topicSet = new Set<(typeof topics)[number]>();
    news.forEach((item) => {
      item.topics.forEach((topic) => topicSet.add(topic));
    });
    return Array.from(topicSet);
  },
});

export const getPersonalizedNews = query({
  args: {
    userTopics: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Получаем все новости
    const allNews = await ctx.db.query("news").collect();

    // Если у пользователя нет выбранных тем, возвращаем обычные новости
    if (!args.userTopics || args.userTopics.length === 0) {
      const sortedNews = allNews.sort(
        (a, b) => b._creationTime - a._creationTime
      );

      const resultsWithImage = await Promise.all(
        sortedNews.map(async (news) => {
          let imageUrl = null;
          let authorImageUrl = null;
          if (news.image) {
            imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
          }
          if (news.authorImage) {
            authorImageUrl = await ctx.storage.getUrl(
              news.authorImage as Id<"_storage">
            );
          }
          return {
            ...news,
            image: imageUrl ?? news.image ?? null,
            authorImage: authorImageUrl ?? null,
            score: 0, // Базовый балл
          };
        })
      );

      return resultsWithImage;
    }

    // Система баллов для персонализации
    const scoredNews = allNews.map((news) => {
      let score = 0;

      // Базовый балл за каждую новость
      score += 1;

      // Баллы за совпадение тем с предпочтениями пользователя
      const matchingTopics = news.topics.filter((topic) =>
        args.userTopics!.includes(topic)
      );
      score += matchingTopics.length * 3; // 3 балла за каждую совпадающую тему

      // Дополнительные баллы за популярность (просмотры)
      if (news.views > 1000) score += 2;
      else if (news.views > 500) score += 1;

      // Баллы за свежесть (новые статьи получают больше баллов)
      const daysSinceCreation =
        (Date.now() - news._creationTime) / (1000 * 60 * 60 * 24);
      if (daysSinceCreation <= 1) score += 3; // Очень свежие (1 день)
      else if (daysSinceCreation <= 3) score += 2; // Свежие (3 дня)
      else if (daysSinceCreation <= 7) score += 1; // Недельные

      // Бонус за премиум контент
      if (news.isPremium) score += 1;

      return {
        ...news,
        score,
      };
    });

    // Сортируем по баллам (от высшего к низшему)
    const sortedNews = scoredNews.sort((a, b) => b.score - a.score);

    const resultsWithImage = await Promise.all(
      sortedNews.map(async (news) => {
        let imageUrl = null;
        let authorImageUrl = null;
        if (news.image) {
          imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
        }
        if (news.authorImage) {
          authorImageUrl = await ctx.storage.getUrl(
            news.authorImage as Id<"_storage">
          );
        }
        return {
          ...news,
          image: imageUrl ?? news.image ?? null,
          authorImage: authorImageUrl ?? null,
        };
      })
    );

    return resultsWithImage;
  },
});

export const insertMultipleBlogPosts = mutation({
  args: {
    blogPosts: v.array(schema.tables.news.validator),
  },
  handler: async (ctx, args) => {
    const insertedIds = [];
    for (const blogPost of args.blogPosts) {
      const id = await ctx.db.insert("news", blogPost);
      insertedIds.push(id);
    }
    return { insertedIds, count: insertedIds.length };
  },
});

export const incrementViews = mutation({
  args: {
    newsId: v.id("news"),
  },
  handler: async (ctx, args) => {
    const news = await ctx.db.get(args.newsId);
    if (!news) {
      throw new Error("News article not found");
    }

    await ctx.db.patch(args.newsId, {
      views: news.views + 1,
    });

    return { success: true, newViews: news.views + 1 };
  },
});
