import { defineSchema, defineTable } from "convex/server";
import { v, Infer } from "convex/values";
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
] as const;

export const topicsValidator = v.array(
  v.union(...topics.map((topic) => v.literal(topic)))
);
export const singleTopicValidator = v.union(
  ...topics.map((topic) => v.literal(topic))
);
export const emailStatusValidator = v.union(
  v.literal("sent"),
  v.literal("delivered"),
  v.literal("opened"),
  v.literal("bounced"),
  v.literal("failed")
);
export const emailTypeValidator = v.union(
  v.literal("weekly_digest"),
  v.literal("achievement_unlock"),
  v.literal("new_article_favorite_topic"),
  v.literal("post_created"),
  v.literal("milestone_10_views")
);

export type Topics = Infer<typeof topicsValidator>;
export type SingleTopic = Infer<typeof singleTopicValidator>;
export type EmailStatus = Infer<typeof emailStatusValidator>;
export type EmailType = Infer<typeof emailTypeValidator>;

export const userFields = {
  name: v.optional(v.string()),
  email: v.optional(v.string()),
  image: v.optional(v.string()),
  bio: v.optional(v.string()),
  topics: v.optional(topicsValidator),
  onboarded: v.optional(v.boolean()),
  isAnonymous: v.optional(v.boolean()),
  articlesRead: v.optional(v.number()),
  dayStreak: v.optional(v.number()),
  lastReadDate: v.optional(v.number()),
  favoriteTopic: v.optional(v.string()),
};

export const newsFields = {
  title: v.string(),
  text: v.string(),
  image: v.optional(v.union(v.string(), v.id("_storageId"))),
  summary: v.optional(v.string()),
  topics: topicsValidator,
  mentions: v.optional(v.array(v.string())),
  isPremium: v.boolean(),
  views: v.number(),
  author: v.optional(v.union(v.id("users"), v.string())),
  authorImage: v.optional(v.union(v.id("_storageId"), v.string())),
  averageRating: v.optional(v.number()),
  totalRatings: v.optional(v.number()),
};

export const readingHistoryFields = {
  userId: v.id("users"),
  newsId: v.id("news"),
  readAt: v.number(),
  readingTime: v.optional(v.number()),
};

export const subscriberFields = {
  userId: v.optional(v.id("users")),
  email: v.string(),
  topics: v.optional(topicsValidator),
};

export const userValidator = v.object(userFields);
export const newsValidator = v.object(newsFields);
export const readingHistoryValidator = v.object(readingHistoryFields);
export const subscriberValidator = v.object(subscriberFields);

const applicationTables = {
  users: defineTable(userFields).index("by_onboarded", ["onboarded"]),

  news: defineTable(newsFields)
    .index("by_topics", ["topics"])
    .index("by_views", ["views"])
    .index("by_rating", ["averageRating"]),

  readingHistory: defineTable(readingHistoryFields)
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "readAt"]),

  userAchievements: defineTable({
    userId: v.id("users"),
    achievementId: v.string(),
    unlockedAt: v.number(),
    progress: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_achievement", ["userId", "achievementId"]),

  dailyStats: defineTable({
    userId: v.id("users"),
    date: v.string(),
    articlesRead: v.number(),
    readingTime: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"]),

  subscribers: defineTable(subscriberFields)
    .index("by_user", ["userId"])
    .index("by_email", ["email"]),

  emailDigests: defineTable({
    subscriberId: v.id("subscribers"),
    emailId: v.string(),
    status: emailStatusValidator,
    sentAt: v.number(),
    newsCount: v.number(),
  })
    .index("by_subscriber", ["subscriberId"])
    .index("by_email", ["emailId"]),

  newsRatings: defineTable({
    newsId: v.id("news"),
    userId: v.optional(v.id("users")),
    email: v.string(),
    rating: v.number(),
    ratedAt: v.number(),
  })
    .index("by_news", ["newsId"])
    .index("by_user_and_news", ["userId", "newsId"])
    .index("by_email_and_news", ["email", "newsId"]),

  emailNotifications: defineTable({
    userId: v.optional(v.id("users")),
    email: v.string(),
    type: emailTypeValidator,
    status: emailStatusValidator,
    sentAt: v.number(),
    metadata: v.optional(v.any()),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"])
    .index("by_type", ["type"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
