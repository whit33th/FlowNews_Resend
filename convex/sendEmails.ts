"use node";

import { Resend } from "@convex-dev/resend";
import { render } from "@react-email/render";
import { v } from "convex/values";
import { components, internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { AchievementUnlockEmail } from "./emails/AchievementUnlock";
import { NewArticleNotificationEmail } from "./emails/NewArticleNotification";
import { WeeklyDigestEmail } from "./emails/WeeklyDigest";
import { PostCreatedEmail } from "./emails/PostCreatedEmail";
import { ViewsMilestoneEmail } from "./emails/ViewsMilestoneEmail";

export const resend: Resend = new Resend(components.resend, {
  testMode: false,
});

export const sendWeeklyDigest = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    newsItems: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const html = await render(
      WeeklyDigestEmail({
        userName: args.userName,
        userEmail: args.userEmail,
        newsItems: args.newsItems,
      })
    );

    const result = await resend.sendEmail(ctx, {
      from: "Newsletter <newsletter@resend.dev>",
      to: args.userEmail,
      subject: "📰 Your Weekly News Digest",
      html,
    });

    await ctx.runMutation(internal.emailMutations.logEmailNotification, {
      userId: args.userId,
      email: args.userEmail,
      type: "weekly_digest",
      emailId: result,
      metadata: {
        newsCount: args.newsItems.length,
      },
    });

    return result;
  },
});

export const sendAchievementUnlock = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    achievement: v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      icon: v.string(),
      progress: v.optional(v.number()),
    }),
    userStats: v.optional(
      v.object({
        articlesRead: v.number(),
        dayStreak: v.number(),
        favoriteTopic: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const html = await render(
      AchievementUnlockEmail({
        userName: args.userName,
        achievement: args.achievement,
        userStats: args.userStats,
        userEmail: args.userEmail,
      })
    );

    const result = await resend.sendEmail(ctx, {
      from: "Newsletter <newsletter@resend.dev>",
      to: args.userEmail,
      subject: `🎉 Achievement Unlocked: ${args.achievement.title}`,
      html,
    });

    await ctx.runMutation(internal.emailMutations.logEmailNotification, {
      userId: args.userId,
      email: args.userEmail,
      type: "achievement_unlock",
      emailId: result,
      metadata: {
        achievementId: args.achievement.id,
      },
    });

    return result;
  },
});

export const sendNewArticleNotification = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    favoriteTopic: v.string(),
    newsItem: v.any(),
  },
  handler: async (ctx, args) => {
    const html = await render(
      NewArticleNotificationEmail({
        userName: args.userName,
        userEmail: args.userEmail,
        favoriteTopic: args.favoriteTopic,
        newsItem: args.newsItem,
      })
    );

    const result = await resend.sendEmail(ctx, {
      from: "Newsletter <newsletter@resend.dev>",
      to: args.userEmail,
      subject: `📰 New ${args.favoriteTopic} Article: ${args.newsItem.title}`,
      html,
    });

    await ctx.runMutation(internal.emailMutations.logEmailNotification, {
      userId: args.userId,
      email: args.userEmail,
      type: "new_article_favorite_topic",
      emailId: result,
      metadata: {
        newsId: args.newsItem._id,
        topic: args.favoriteTopic,
      },
    });

    return result;
  },
});

export const sendPostCreatedEmail = internalAction({
  args: {
    authorEmail: v.string(),
    authorName: v.optional(v.string()),
    newsTitle: v.string(),
    newsId: v.id("news"),
  },
  handler: async (ctx, args) => {
    const html = await render(
      PostCreatedEmail({
        authorEmail: args.authorEmail,
        authorName: args.authorName,
        newsTitle: args.newsTitle,
        newsId: args.newsId,
      })
    );

    const result = await resend.sendEmail(ctx, {
      from: "Newsletter <newsletter@resend.dev>",
      to: args.authorEmail,
      subject: `🎉 Your article "${args.newsTitle}" has been published!`,
      html,
    });

    return result;
  },
});

export const sendViewsMilestoneEmail = internalAction({
  args: {
    authorEmail: v.string(),
    authorName: v.optional(v.string()),
    newsTitle: v.string(),
    newsId: v.id("news"),
    views: v.number(),
  },
  handler: async (ctx, args) => {
    const html = await render(
      ViewsMilestoneEmail({
        authorEmail: args.authorEmail,
        authorName: args.authorName,
        newsTitle: args.newsTitle,
        newsId: args.newsId,
        views: args.views,
      })
    );

    const result = await resend.sendEmail(ctx, {
      from: "Newsletter <newsletter@resend.dev>",
      to: args.authorEmail,
      subject: `🎉 Milestone reached: ${args.views} views on "${args.newsTitle}"!`,
      html,
    });

    return result;
  },
});
