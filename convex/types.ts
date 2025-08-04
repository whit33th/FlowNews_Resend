/**
 * Exported types for use in frontend code
 * Following Convex best practices for types and validators
 */

import { Infer } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import type { WithoutSystemFields } from "convex/server";
import {
  topicsValidator,
  singleTopicValidator,
  emailStatusValidator,
  emailTypeValidator,
  userValidator,
  newsValidator,
  readingHistoryValidator,
  subscriberValidator,
} from "./schema";

export type Topics = Infer<typeof topicsValidator>;
export type SingleTopic = Infer<typeof singleTopicValidator>;
export type EmailStatus = Infer<typeof emailStatusValidator>;
export type EmailType = Infer<typeof emailTypeValidator>;

export type User = Doc<"users">;
export type News = Doc<"news">;
export type ReadingHistory = Doc<"readingHistory">;
export type Subscriber = Doc<"subscribers">;
export type UserAchievement = Doc<"userAchievements">;
export type DailyStat = Doc<"dailyStats">;
export type EmailDigest = Doc<"emailDigests">;
export type NewsRating = Doc<"newsRatings">;
export type EmailNotification = Doc<"emailNotifications">;

export type CreateUser = WithoutSystemFields<User>;
export type CreateNews = WithoutSystemFields<News>;
export type CreateReadingHistory = WithoutSystemFields<ReadingHistory>;
export type CreateSubscriber = WithoutSystemFields<Subscriber>;

export type UserFields = Infer<typeof userValidator>;
export type NewsFields = Infer<typeof newsValidator>;
export type ReadingHistoryFields = Infer<typeof readingHistoryValidator>;
export type SubscriberFields = Infer<typeof subscriberValidator>;

export type UserId = Id<"users">;
export type NewsId = Id<"news">;
export type SubscriberId = Id<"subscribers">;
export type StorageId = Id<"_storage">;

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
};

export type UserStats = {
  articlesRead: number;
  dayStreak: number;
  favoriteTopic: string;
  averageReadingTime: number;
  recentActivity: number;
  totalReadingTime: number;
};

export type NewsWithImages = News & {
  image: string | null;
  authorImage: string | null;
};

export type ReadingHistoryWithNews = ReadingHistory & {
  news: NewsWithImages;
};
