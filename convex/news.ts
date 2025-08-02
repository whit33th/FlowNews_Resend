import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import schema, { topics } from "./schema";

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
    return await query.paginate(args.paginationOpts);
  },
});

export const getNewsById = query({
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
