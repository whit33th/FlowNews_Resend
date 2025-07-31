import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  news: defineTable({
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
    tags: v.array(v.string()),
    mentions: v.array(v.string()),
    publishedAt: v.number(),
    source: v.optional(v.string()),
    url: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
  })
    .index("by_published", ["publishedAt"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["tags"],
    }),

  subscribers: defineTable({
    userId: v.optional(v.id("users")),
    email: v.string(),
    topics: v.array(v.string()),
    hashtags: v.array(v.string()),
    mentions: v.array(v.string()),
    lastSent: v.optional(v.number()),
    isActive: v.boolean(),
    isNewsletterOnly: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_last_sent", ["lastSent"]),

  emailDigests: defineTable({
    subscriberId: v.id("subscribers"),
    emailId: v.string(),
    status: v.union(
      v.literal("sent"),
      v.literal("delivered"),
      v.literal("opened"),
      v.literal("bounced"),
      v.literal("failed")
    ),
    sentAt: v.number(),
    newsCount: v.number(),
  })
    .index("by_subscriber", ["subscriberId"])
    .index("by_email", ["emailId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
