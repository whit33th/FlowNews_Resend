import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getSubscriber = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const getSubscriberByEmail = query({
  args: {},
  handler: async (ctx) => {
    const loggedInUser = await getAuthUserId(ctx);
    if (!loggedInUser) return null;
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", loggedInUser))
      .unique();
    return subscriber;
  },
});

export const createSubscriber = mutation({
  args: {
    email: v.string(),
    topics: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      throw new Error("Subscriber already exists");
    }

    return await ctx.db.insert("subscribers", {
      userId,
      email: args.email,
      topics: args.topics,
      hashtags: [],
      mentions: [],
    });
  },
});

export const updateTopics = mutation({
  args: {
    topics: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    await ctx.db.patch(subscriber._id, {
      topics: args.topics,
    });
  },
});

export const subscribeToTopic = mutation({
  args: {
    topic: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    if (!subscriber.topics.includes(args.topic)) {
      await ctx.db.patch(subscriber._id, {
        topics: [...subscriber.topics, args.topic],
      });
    }
  },
});

export const unsubscribeFromTopic = mutation({
  args: {
    topic: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    await ctx.db.patch(subscriber._id, {
      topics: subscriber.topics.filter((t) => t !== args.topic),
    });
  },
});

export const subscribeToHashtag = mutation({
  args: {
    hashtag: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    if (!subscriber.hashtags.includes(args.hashtag)) {
      await ctx.db.patch(subscriber._id, {
        hashtags: [...subscriber.hashtags, args.hashtag],
      });
    }
  },
});

export const subscribeToMention = mutation({
  args: {
    mention: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    if (!subscriber.mentions.includes(args.mention)) {
      await ctx.db.patch(subscriber._id, {
        mentions: [...subscriber.mentions, args.mention],
      });
    }
  },
});

export const unsubscribeFromMention = mutation({
  args: {
    mention: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!subscriber) {
      throw new Error("Subscriber not found");
    }

    await ctx.db.patch(subscriber._id, {
      mentions: subscriber.mentions.filter((m) => m !== args.mention),
    });
  },
});

export const subscribeToNewsletter = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // For newsletter subscription, we don't require authentication
    // This allows non-authenticated users to subscribe

    // Check if email already exists
    const existing = await ctx.db
      .query("subscribers")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existing) {
      throw new Error("Email already subscribed");
    }

    // Create a new subscriber entry for newsletter
    return await ctx.db.insert("subscribers", {
      userId: undefined, // No user ID for newsletter-only subscribers
      email: args.email,
      topics: [],
      hashtags: [],
      mentions: [],
      isNewsletterOnly: true,
    });
  },
});
