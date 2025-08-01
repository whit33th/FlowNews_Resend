import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    topics: v.optional(v.array(v.string())),
    mentions: v.optional(v.array(v.string())),
    newbee: v.optional(v.boolean()),
    isAnonymous: v.optional(v.boolean()),
  }).index("by_newbee", ["newbee"]),

  news: defineTable({
    title: v.string(),
    text: v.string(),
    summary: v.optional(v.string()),
    tags: v.array(
      v.union(
        v.literal("Tech"),
        v.literal("Finance"),
        v.literal("Healthcare"),
        v.literal("Environment"),
        v.literal("Politics"),
        v.literal("Science"),
        v.literal("Sports"),
        v.literal("Entertainment"),
        v.literal("Music"),
        v.literal("Events"),
        v.literal("Nature"),
        v.literal("Business"),
        v.literal("Education"),
        v.literal("Travel"),
        v.literal("Food")
      )
    ),
    mentions: v.array(v.string()),
    source: v.optional(v.string()),
    url: v.optional(v.string()),
    isPremium: v.boolean(),
    views: v.number(),
  }).searchIndex("search_text", {
    searchField: "text",
    filterFields: ["tags"],
  }),

  subscribers: defineTable({
    userId: v.optional(v.id("users")),
    email: v.string(),
    topics: v.array(v.string()),
    hashtags: v.array(v.string()),
    mentions: v.array(v.string()),
    lastSent: v.optional(v.number()),
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
