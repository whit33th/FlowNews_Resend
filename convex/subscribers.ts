import { ConvexError } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { getUser } from "./helpers/shared";
import { subscriberFields } from "./schema";

export const createSubscriber = mutation({
  args: subscriberFields,
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (subscriber) throw new ConvexError("Subscriber already exists");
    return ctx.db.insert("subscribers", {
      ...args,
      userId: user?._id,
    });
  },
});

export const getSubscriber = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) return null;
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
    return !!subscriber;
  },
});

export const getAllSubscribers = internalQuery({
  handler: async (ctx) => {
    const subscribers = await ctx.db.query("subscribers").collect();

    const subscribersWithUserData = await Promise.all(
      subscribers.map(async (subscriber) => {
        let userName = "Dear Reader";
        if (subscriber.userId) {
          const user = await ctx.db.get(subscriber.userId);
          userName = user?.name || "Dear Reader";
        }
        return {
          ...subscriber,
          userName,
        };
      })
    );

    return subscribersWithUserData;
  },
});
