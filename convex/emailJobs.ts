import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const sendWeeklyDigests = internalAction({
  args: {},
  handler: async (ctx) => {
    try {
      console.log("Starting weekly digest job...");

      const recentNews = await ctx.runQuery(
        internal.news.getRecentNewsInternal,
        {
          limit: 20,
        }
      );

      if (!recentNews || recentNews.length === 0) {
        console.log("No recent news found");
        return { success: 0, errors: 0 };
      }

      const topNews = recentNews.slice(0, 5);

      const allSubscribers = await ctx.runQuery(
        internal.subscribers.getAllSubscribers
      );
      const subscribersWithEmails = allSubscribers.filter(
        (subscriber) => subscriber.email
      );

      if (subscribersWithEmails.length === 0) {
        console.log("No subscribers with email addresses found");
        return { success: 0, errors: 0 };
      }

      let successCount = 0;
      let errorCount = 0;

      for (const subscriber of subscribersWithEmails) {
        try {
          await ctx.runAction(internal.sendEmails.sendWeeklyDigest, {
            userEmail: subscriber.email!,
            userName: subscriber.userName,
            userId: subscriber.userId,
            newsItems: topNews,
          });

          successCount++;
          console.log(`Weekly digest sent to ${subscriber.email}`);
        } catch (error) {
          errorCount++;
          console.error(
            `Failed to send weekly digest to ${subscriber.email}:`,
            error
          );
        }
      }

      console.log(
        `Weekly digest job completed. Success: ${successCount}, Errors: ${errorCount}`
      );
      return { success: successCount, errors: errorCount };
    } catch (error) {
      console.error("Weekly digest job failed:", error);
      throw error;
    }
  },
});

export const checkAndSendNewArticleNotifications = internalAction({
  args: {},
  handler: async (ctx) => {
    try {
      console.log("Starting new article notification check...");

      const recentNews = await ctx.runQuery(
        internal.news.getRecentNewsInternal,
        {
          limit: 20,
        }
      );

      if (!recentNews || recentNews.length === 0) {
        console.log("No recent articles found");
        return { success: 0, errors: 0 };
      }

      const popularArticles = recentNews.filter(
        (article: any) => article.views && article.views > 10
      );

      if (popularArticles.length === 0) {
        console.log("No popular articles found");
        return { success: 0, errors: 0 };
      }

      const allSubscribers = await ctx.runQuery(
        internal.subscribers.getAllSubscribers
      );
      const subscribersWithTopics = allSubscribers.filter(
        (subscriber) =>
          subscriber.email && subscriber.topics && subscriber.topics.length > 0
      );

      let successCount = 0;
      let errorCount = 0;

      for (const article of popularArticles) {
        for (const subscriber of subscribersWithTopics) {
          try {
            if (
              article.topics &&
              subscriber.topics &&
              subscriber.topics.some((topic) => article.topics.includes(topic))
            ) {
              await ctx.runAction(
                internal.sendEmails.sendNewArticleNotification,
                {
                  userEmail: subscriber.email,
                  userName: subscriber.userName,
                  favoriteTopic: subscriber.topics[0],
                  newsItem: article,
                }
              );

              successCount++;
              console.log(
                `New article notification sent to ${subscriber.email} for ${article.title}`
              );
            }
          } catch (error) {
            errorCount++;
            console.error(
              `Failed to send article notification to ${subscriber.email}:`,
              error
            );
          }
        }
      }

      console.log(
        `New article notification job completed. Success: ${successCount}, Errors: ${errorCount}`
      );
      return { success: successCount, errors: errorCount };
    } catch (error) {
      console.error("New article notification job failed:", error);
      throw error;
    }
  },
});

export const sendNewPostCreatedEmail = internalAction({
  args: {
    newsId: v.id("news"),
    authorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    try {
      const news = await ctx.runQuery(internal.news.getNewsByIdInternal, {
        id: args.newsId,
      });

      const author = await ctx.runQuery(internal.users.getUserById, {
        userId: args.authorId,
      });

      if (!news || !author || !author.email) {
        console.log("News, author, or author email not found");
        return { success: false };
      }

      await ctx.runAction(internal.sendEmails.sendPostCreatedEmail, {
        authorEmail: author.email,
        authorName: author.name || "Author",
        newsTitle: news.title,
        newsId: args.newsId,
      });

      console.log(`Post creation email sent to ${author.email}`);
      return { success: true };
    } catch (error) {
      console.error("Failed to send post creation email:", error);
      return { success: false };
    }
  },
});

export const checkViewsMilestone = internalAction({
  args: {
    newsId: v.id("news"),
  },
  handler: async (ctx, args) => {
    try {
      const news = await ctx.runQuery(internal.news.getNewsByIdInternal, {
        id: args.newsId,
      });

      if (!news) {
        return { success: false, reason: "News not found" };
      }

      if (news.views < 10) {
        return { success: false, reason: "Views threshold not reached" };
      }

      const authorId = news.author as Id<"users">;
      if (!authorId) {
        return { success: false, reason: "Author not found" };
      }

      const author = await ctx.runQuery(internal.users.getUserById, {
        userId: authorId,
      });

      if (!author || !author.email) {
        return { success: false, reason: "Author email not found" };
      }

      try {
        await ctx.runAction(internal.sendEmails.sendViewsMilestoneEmail, {
          authorEmail: author.email,
          authorName: author.name || "Author",
          newsTitle: news.title,
          newsId: args.newsId,
          views: news.views,
        });

        return { success: true };
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return { success: false, reason: "Email sending failed" };
      }
    } catch (error) {
      console.error("Milestone check failed:", error);
      return { success: false, reason: "Error occurred" };
    }
  },
});
