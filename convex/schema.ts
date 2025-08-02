import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export const topics = [
  "Tech",
  "Finance",
  "Healthcare",
  "Environment",
  "Politics",
  "Science",
  "Sports",
  "Entertainment",
  "Music",
  "Events",
  "Nature",
  "Business",
  "Education",
  "Travel",
  "Food",
];
const applicationTables = {
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    topics: v.optional(v.array(v.string())),
    onboarded: v.optional(v.boolean()),
    isAnonymous: v.optional(v.boolean()),
  }).index("by_onboarded", ["onboarded"]),

  news: defineTable({
    title: v.string(),
    text: v.string(),
    image: v.optional(v.union(v.string(), v.id("_storageId"))),
    summary: v.optional(v.string()),
    topics: v.array(v.union(...topics.map((topic) => v.literal(topic)))),
    mentions: v.optional(v.array(v.string())),
    isPremium: v.boolean(),
    views: v.number(),
    author: v.optional(v.union(v.id("users"), v.string())),
  })
    .index("by_topics", ["topics"])
    .index("by_views", ["views"]),

  subscribers: defineTable({
    userId: v.optional(v.id("users")),
    email: v.string(),
    topics: v.optional(
      v.array(v.union(...topics.map((topic) => v.literal(topic))))
    ),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"]),

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
