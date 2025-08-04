import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./helpers/shared";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

export const getUserReadingHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    if (!user) return [];

    const limit = args.limit || 10;

    const allHistory = await ctx.db
      .query("readingHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    const uniqueArticles = new Map<string, any>();
    for (const record of allHistory) {
      if (!uniqueArticles.has(record.newsId)) {
        uniqueArticles.set(record.newsId, record);
      }
    }

    const uniqueHistory = Array.from(uniqueArticles.values()).slice(0, limit);

    const historyWithNews = await Promise.all(
      uniqueHistory.map(async (record) => {
        const news = await ctx.db.get(record.newsId as Id<"news">);
        if (!news) return null;

        let imageUrl = null;
        if (news.image) {
          imageUrl = await ctx.storage.getUrl(news.image as Id<"_storage">);
        }

        return {
          ...record,
          news: {
            ...news,
            image: imageUrl ?? news.image ?? null,
          },
        };
      })
    );

    return historyWithNews.filter(Boolean);
  },
});

export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) return null;

    const totalArticlesRead = await ctx.db
      .query("readingHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentStats = await ctx.db
      .query("dailyStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) =>
        q.gte(
          q.field("date"),
          new Date(thirtyDaysAgo).toISOString().split("T")[0]
        )
      )
      .collect();

    const topicCounts: Record<string, number> = {};
    for (const record of totalArticlesRead) {
      const news = await ctx.db.get(record.newsId);
      if (news) {
        for (const topic of news.topics) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      }
    }

    const favoriteTopic =
      Object.entries(topicCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "None";

    const totalReadingTime = totalArticlesRead.reduce(
      (sum, record) => sum + (record.readingTime || 0),
      0
    );
    const averageReadingTime =
      totalArticlesRead.length > 0
        ? Math.round(totalReadingTime / totalArticlesRead.length)
        : 0;

    return {
      articlesRead: totalArticlesRead.length,
      dayStreak: user.dayStreak || 0,
      favoriteTopic,
      averageReadingTime,
      recentActivity: recentStats.length,
      totalReadingTime,
    };
  },
});

export const getUserAchievements = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) return [];

    const userAchievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const totalArticlesRead = await ctx.db
      .query("readingHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const allAchievements = [
      {
        id: "first-read",
        title: "First Reader",
        description: "Read your first article",
        unlocked: totalArticlesRead.length >= 1,
        progress: Math.min(totalArticlesRead.length, 1),
        maxProgress: 1,
      },
      {
        id: "topic-explorer",
        title: "Topic Explorer",
        description: "Follow 3 different topics",
        unlocked: (user.topics?.length || 0) >= 3,
        progress: user.topics?.length || 0,
        maxProgress: 3,
      },
      {
        id: "daily-reader",
        title: "Daily Reader",
        description: "Read articles for 7 consecutive days",
        unlocked: (user.dayStreak || 0) >= 7,
        progress: Math.min(user.dayStreak || 0, 7),
        maxProgress: 7,
      },
      {
        id: "news-junkie",
        title: "News Junkie",
        description: "Read 50 articles",
        unlocked: totalArticlesRead.length >= 50,
        progress: Math.min(totalArticlesRead.length, 50),
        maxProgress: 50,
      },
      {
        id: "speed-reader",
        title: "Speed Reader",
        description: "Read 5 articles in one day",
        unlocked: false,
        progress: 0,
        maxProgress: 5,
      },
      {
        id: "diverse-reader",
        title: "Diverse Reader",
        description: "Read articles from all major topics",
        unlocked: (user.topics?.length || 0) >= 5,
        progress: user.topics?.length || 0,
        maxProgress: 5,
      },
    ];

    return allAchievements;
  },
});

export const addToReadingHistory = mutation({
  args: {
    newsId: v.id("news"),
    readingTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const now = Date.now();
    const today = new Date().toISOString().split("T")[0];

    await ctx.db.insert("readingHistory", {
      userId: user._id,
      newsId: args.newsId,
      readAt: now,
      readingTime: args.readingTime || 5,
    });

    const newArticlesRead = (user.articlesRead || 0) + 1;

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const lastReadDate = user.lastReadDate
      ? new Date(user.lastReadDate).toISOString().split("T")[0]
      : null;

    let newDayStreak = user.dayStreak || 0;
    if (lastReadDate === yesterday) {
      newDayStreak += 1;
    } else if (lastReadDate !== today) {
      newDayStreak = 1;
    }

    await ctx.db.patch(user._id, {
      articlesRead: newArticlesRead,
      dayStreak: newDayStreak,
      lastReadDate: now,
    });

    const existingDailyStats = await ctx.db
      .query("dailyStats")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today)
      )
      .first();

    if (existingDailyStats) {
      await ctx.db.patch(existingDailyStats._id, {
        articlesRead: existingDailyStats.articlesRead + 1,
        readingTime: existingDailyStats.readingTime + (args.readingTime || 5),
      });
    } else {
      await ctx.db.insert("dailyStats", {
        userId: user._id,
        date: today,
        articlesRead: 1,
        readingTime: args.readingTime || 5,
      });
    }

    await checkAndUpdateAchievements(
      ctx,
      user._id,
      newArticlesRead,
      newDayStreak
    );

    return { success: true };
  },
});

async function checkAndUpdateAchievements(
  ctx: any,
  userId: Id<"users">,
  articlesRead: number,
  dayStreak: number
) {
  const user = await ctx.db.get(userId);
  if (!user || !user.email) return;

  const readingHistory = await ctx.db
    .query("readingHistory")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .collect();

  const today = new Date().toISOString().split("T")[0];
  const todayReads = readingHistory.filter((record: any) => {
    const readDate = new Date(record.readAt).toISOString().split("T")[0];
    return readDate === today;
  }).length;

  const achievements = [
    {
      id: "first-read",
      condition: articlesRead >= 1,
      title: "First Reader",
      description:
        "You've read your first article! Welcome to the world of informed reading.",
      icon: "📚",
    },
    {
      id: "topic-explorer",
      condition: (user.topics?.length || 0) >= 3,
      title: "Topic Explorer",
      description:
        "You're following 3 different topics! Your interests are expanding.",
      icon: "🎯",
    },
    {
      id: "daily-reader",
      condition: dayStreak >= 7,
      title: "Daily Reader",
      description:
        "Amazing consistency! You've read articles for 7 consecutive days.",
      icon: "🔥",
    },
    {
      id: "news-junkie",
      condition: articlesRead >= 50,
      title: "News Junkie",
      description:
        "Impressive! You've read 50 articles. You're becoming a true news enthusiast!",
      icon: "📰",
    },
    {
      id: "speed-reader",
      condition: todayReads >= 5,
      title: "Speed Reader",
      description: "Wow! You've read 5 articles in one day. You're on fire!",
      icon: "⚡",
    },
    {
      id: "diverse-reader",
      condition: (user.topics?.length || 0) >= 5,
      title: "Diverse Reader",
      description:
        "You're following articles from all major topics! True diversity in reading.",
      icon: "🌟",
    },
  ];

  for (const achievement of achievements) {
    if (achievement.condition) {
      const existingAchievement = await ctx.db
        .query("userAchievements")
        .withIndex("by_user_and_achievement", (q: any) =>
          q.eq("userId", userId).eq("achievementId", achievement.id)
        )
        .first();

      if (!existingAchievement) {
        await ctx.db.insert("userAchievements", {
          userId,
          achievementId: achievement.id,
          unlockedAt: Date.now(),
        });

        const readingHistory = await ctx.db
          .query("readingHistory")
          .withIndex("by_user", (q: any) => q.eq("userId", userId))
          .take(20); 

        const topicCounts: Record<string, number> = {};
        for (const record of readingHistory) {
          const news = await ctx.db.get(record.newsId);
          if (news) {
            for (const topic of news.topics) {
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
          }
        }

        const favoriteTopic =
          Object.entries(topicCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
          "technology";

        try {
          await ctx.scheduler.runAfter(
            0,
            internal.sendEmails.sendAchievementUnlock,
            {
              userEmail: user.email,
              userName: user.name || "Dear Reader",
              userId: userId,
              achievement: {
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon,
                progress: 100,
              },
              userStats: {
                articlesRead: articlesRead,
                dayStreak: dayStreak,
                favoriteTopic: favoriteTopic,
              },
            }
          );

          console.log(
            `Achievement email sent to ${user.email} for achievement: ${achievement.title}`
          );
        } catch (error) {
          console.error(
            `Failed to send achievement email for ${achievement.id}:`,
            error
          );
        }
      }
    }
  }
}

export const getUserTopTopics = query({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) return [];

    const readingHistory = await ctx.db
      .query("readingHistory")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const topicCounts: Record<string, number> = {};

    for (const record of readingHistory) {
      const news = await ctx.db.get(record.newsId);
      if (news) {
        for (const topic of news.topics) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      }
    }

    return Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));
  },
});
