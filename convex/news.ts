import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import schema, {
  topics,
  topicsValidator,
  singleTopicValidator,
  newsFields,
} from "./schema";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { getUser } from "./helpers/shared";

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
    topics: v.optional(topicsValidator),
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
          if (typeof news.image === "string" && news.image.startsWith("http")) {
            imageUrl = news.image;
          } else {
            imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
          }
        }

        if (news.authorImage) {
          if (
            typeof news.authorImage === "string" &&
            news.authorImage.startsWith("http")
          ) {
            authorImageUrl = news.authorImage;
          } else {
            authorImageUrl = await ctx.storage.getUrl(
              news.authorImage as Id<"_storage">
            );
          }
        }

        return {
          ...news,
          image: imageUrl,
          authorImage: authorImageUrl,
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
    const news = await ctx.db.get(args.id);
    if (!news) return null;

    let imageUrl = null;
    let authorImageUrl = null;

    if (news.image) {
      imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
    }

    if (news.authorImage) {
      if (
        typeof news.authorImage === "string" &&
        news.authorImage.startsWith("http")
      ) {
        authorImageUrl = news.authorImage;
      } else {
        authorImageUrl = await ctx.storage.getUrl(
          news.authorImage as Id<"_storage">
        );
      }
    }

    return {
      ...news,
      image: imageUrl,
      authorImage: authorImageUrl,
    };
  },
});

export const getNewsByIdInternal = internalQuery({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
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
    userTopics: v.optional(topicsValidator),
    limit: v.optional(v.number()),
    excludeId: v.optional(v.id("news")),
  },
  handler: async (ctx, args) => {
    const allNews = await ctx.db.query("news").order("desc").take(50);

    const filteredNews = args.excludeId
      ? allNews.filter((news) => news._id !== args.excludeId)
      : allNews;

    if (!args.userTopics || args.userTopics.length === 0) {
      const sortedNews = filteredNews
        .map((news) => ({
          ...news,
          score: calculateBaseScore(news),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, args.limit || 10);

      const resultsWithImage = await Promise.all(
        sortedNews.map(async (news) => {
          let imageUrl = null;
          let authorImageUrl = null;

          if (news.image) {
            if (
              typeof news.image === "string" &&
              news.image.startsWith("http")
            ) {
              imageUrl = news.image;
            } else {
              imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
            }
          }

          if (news.authorImage) {
            if (
              typeof news.authorImage === "string" &&
              news.authorImage.startsWith("http")
            ) {
              authorImageUrl = news.authorImage;
            } else {
              authorImageUrl = await ctx.storage.getUrl(
                news.authorImage as Id<"_storage">
              );
            }
          }

          return {
            ...news,
            image: imageUrl,
            authorImage: authorImageUrl,
          };
        })
      );

      return resultsWithImage;
    }

    const scoredNews = filteredNews.map((news) => {
      let score = calculatePersonalizedScore(news, args.userTopics!);
      return { ...news, score };
    });

    const sortedNews = scoredNews
      .sort((a, b) => b.score - a.score)
      .slice(0, args.limit || 10);

    const resultsWithImage = await Promise.all(
      sortedNews.map(async (news) => {
        let imageUrl = null;
        let authorImageUrl = null;

        if (news.image) {
          if (typeof news.image === "string" && news.image.startsWith("http")) {
            imageUrl = news.image;
          } else {
            imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
          }
        }

        if (news.authorImage) {
          if (
            typeof news.authorImage === "string" &&
            news.authorImage.startsWith("http")
          ) {
            authorImageUrl = news.authorImage;
          } else {
            authorImageUrl = await ctx.storage.getUrl(
              news.authorImage as Id<"_storage">
            );
          }
        }

        return {
          ...news,
          image: imageUrl,
          authorImage: authorImageUrl,
        };
      })
    );

    return resultsWithImage;
  },
});

function calculateBaseScore(news: any): number {
  let score = 0;

  score += 1;

  if (news.views > 1000) score += 3;
  else if (news.views > 500) score += 2;
  else if (news.views > 100) score += 1;

  const daysSinceCreation =
    (Date.now() - news._creationTime) / (1000 * 60 * 60 * 24);
  if (daysSinceCreation <= 1) score += 4;
  else if (daysSinceCreation <= 3) score += 3;
  else if (daysSinceCreation <= 7) score += 2;
  else if (daysSinceCreation <= 14) score += 1;

  if (news.isPremium) score += 1;

  return score;
}

function calculatePersonalizedScore(news: any, userTopics: string[]): number {
  let score = calculateBaseScore(news);

  const matchingTopics = news.topics.filter((topic: string) =>
    userTopics.includes(topic)
  );

  if (matchingTopics.length > 0) {
    score += matchingTopics.length * 5;

    if (matchingTopics.length >= 2) score += 3;
    if (matchingTopics.length >= 3) score += 5;
  } else {
    score -= 2;
  }
  if (news.averageRating && news.averageRating > 4) score += 2;
  else if (news.averageRating && news.averageRating > 3) score += 1;

  return score;
}

export const getPremiumNews = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 15;

    const allNews = await ctx.db.query("news").order("desc").collect();

    const premiumNews = allNews
      .filter((news) => news.isPremium)
      .slice(0, limit);

    const resultsWithImage = await Promise.all(
      premiumNews.map(async (news) => {
        let imageUrl = null;
        let authorImageUrl = null;

        if (news.image) {
          if (typeof news.image === "string" && news.image.startsWith("http")) {
            imageUrl = news.image;
          } else {
            imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
          }
        }

        if (news.authorImage) {
          if (
            typeof news.authorImage === "string" &&
            news.authorImage.startsWith("http")
          ) {
            authorImageUrl = news.authorImage;
          } else {
            authorImageUrl = await ctx.storage.getUrl(
              news.authorImage as Id<"_storage">
            );
          }
        }

        return {
          ...news,
          image: imageUrl,
          authorImage: authorImageUrl,
        };
      })
    );

    return resultsWithImage;
  },
});

export const getNewsByTopic = query({
  args: {
    topic: singleTopicValidator,
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;

    const allNews = await ctx.db.query("news").order("desc").collect();

    const topicNews = allNews
      .filter((news) => news.topics.includes(args.topic))
      .slice(0, limit);

    console.log(
      `Found ${topicNews.length} articles for topic: "${args.topic}"`
    );
    console.log(`Total articles in DB: ${allNews.length}`);

    const resultsWithImage = await Promise.all(
      topicNews.map(async (news) => {
        let imageUrl = null;
        let authorImageUrl = null;

        if (news.image) {
          if (typeof news.image === "string" && news.image.startsWith("http")) {
            imageUrl = news.image;
          } else {
            imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
          }
        }

        if (news.authorImage) {
          if (
            typeof news.authorImage === "string" &&
            news.authorImage.startsWith("http")
          ) {
            authorImageUrl = news.authorImage;
          } else {
            authorImageUrl = await ctx.storage.getUrl(
              news.authorImage as Id<"_storage">
            );
          }
        }

        return {
          ...news,
          image: imageUrl,
          authorImage: authorImageUrl,
        };
      })
    );

    return resultsWithImage;
  },
});

export const insertMultipleBlogPosts = mutation({
  args: {
    blogPosts: v.array(v.object(newsFields)),
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

    const newViews = news.views + 1;

    await ctx.db.patch(args.newsId, {
      views: newViews,
    });
    const milestones = [10, 50, 100, 200, 500, 1000, 5000];

    if (milestones.includes(newViews)) {
      await ctx.scheduler.runAfter(0, internal.emailJobs.checkViewsMilestone, {
        newsId: args.newsId,
      });
    }

    return { success: true, newViews };
  },
});

export const createNews = mutation({
  args: schema.tables.news.validator,
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    if (!user) {
      throw new Error("Must be authenticated to create news");
    }

    const newsId = await ctx.db.insert("news", {
      ...args,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.emailJobs.sendNewPostCreatedEmail,
      {
        newsId,
        authorId: user._id,
      }
    );

    return newsId;
  },
});

export const getRecentNewsInternal = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    return await ctx.db.query("news").order("desc").take(limit);
  },
});

export const shareNewsViaEmail = mutation({
  args: {
    newsId: v.id("news"),
    recipientEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const news = await ctx.db.get(args.newsId);
    if (!news) {
      throw new Error("Article not found");
    }

    const user = await getUser(ctx);

    await ctx.scheduler.runAfter(
      0,
      internal.sendEmails.sendSharedArticleEmail,
      {
        recipientEmail: args.recipientEmail,
        sharedByUser: user?.name || "Someone",
        sharedByEmail: user?.email,
        newsItem: {
          _id: news._id,
          title: news.title,
          text: news.text,
          summary: news.summary,
          topics: news.topics,
          author: news.author,
          views: news.views,
          averageRating: news.averageRating,
          totalRatings: news.totalRatings,
          isPremium: news.isPremium,
          image: news.image,
          _creationTime: news._creationTime,
        },
      }
    );

    return { success: true };
  },
});
