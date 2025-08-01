import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import schema from "./schema";
import { paginationOptsValidator } from "convex/server";

export const getAllNewsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("news")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
export const getMatchedNews = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return { news: [], hasMore: false };
    }
    const subscriber = ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId));
    return;
  },
});

export const getNewsFeed = query({
  args: {
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
    filterTags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let userId = null;
    try {
      userId = await getAuthUserId(ctx);
    } catch {
      // User is not authenticated, continue with null userId
    }
    const limit = args.limit ?? 20;

    // Get subscriber info if authenticated
    let subscriber = null;
    if (userId) {
      subscriber = await ctx.db
        .query("subscribers")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .unique();
    }

    let newsQuery = ctx.db.query("news").order("desc");

    if (args.search) {
      const searchResults = await ctx.db
        .query("news")
        .withSearchIndex("search_text", (q) => q.search("text", args.search!))
        .take(limit);
      return { news: searchResults, hasMore: false };
    }

    if (args.filterTags && args.filterTags.length > 0) {
      const allNews = await newsQuery.collect();
      const filtered = allNews.filter((news) =>
        args.filterTags!.some((tag) => news.tags.includes(tag as any))
      );
      return {
        news: filtered.slice(0, limit),
        hasMore: filtered.length > limit,
      };
    }

    const allNews = await newsQuery.take(limit * 2);

    // If not authenticated or no subscriber, return basic news feed
    if (!userId || !subscriber) {
      return { news: allNews.slice(0, limit), hasMore: allNews.length > limit };
    }

    // Score news based on user preferences for authenticated subscribers
    const scoredNews = allNews.map((news) => {
      let score = 0;

      // Topic matches (10 points each)
      news.tags.forEach((tag) => {
        if (subscriber!.topics.includes(tag)) {
          score += 10;
        }
      });

      // Hashtag matches (5 points each)
      news.tags.forEach((tag) => {
        if (subscriber!.hashtags.includes(tag)) {
          score += 5;
        }
      });

      // Mention matches (15 points each)
      news.mentions.forEach((mention) => {
        if (subscriber!.mentions.includes(mention)) {
          score += 15;
        }
      });

      // Date decay (newer is better)
      const daysSincePublished =
        (Date.now() - news._creationTime) / (1000 * 60 * 60 * 24);
      const dateScore = Math.max(0, 10 - daysSincePublished);
      score += dateScore;

      return { ...news, score };
    });

    // Sort by score
    scoredNews.sort((a, b) => b.score - a.score);

    // Apply 75%/25% mix
    const relevantNews = scoredNews.filter((n) => n.score > 0);
    const randomNews = scoredNews.filter((n) => n.score === 0);

    const mixedNews = [];
    let relevantIndex = 0;
    let randomIndex = 0;

    for (let i = 0; i < limit; i++) {
      if (i % 4 === 3 && randomIndex < randomNews.length) {
        // Every 4th item is random (25%)
        mixedNews.push(randomNews[randomIndex++]);
      } else if (relevantIndex < relevantNews.length) {
        // 75% relevant
        mixedNews.push(relevantNews[relevantIndex++]);
      } else if (randomIndex < randomNews.length) {
        // Fill remaining with random
        mixedNews.push(randomNews[randomIndex++]);
      }
    }

    return {
      news: mixedNews.slice(0, limit),
      hasMore:
        relevantIndex < relevantNews.length || randomIndex < randomNews.length,
    };
  },
});

export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").collect();
    const tagSet = new Set<string>();
    news.forEach((item) => {
      item.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
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
