import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./helpers/shared";
import schema from "./schema";

export const createSubscriber = mutation({
  args: schema.tables.subscribers.validator,
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

export const putchSubscriber = mutation({
  args: schema.tables.subscribers.validator,
  handler: async (ctx, args) => {
    const { topics } = args;
    const user = await getUser(ctx);
    if (!user) return null;

    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
    if (!subscriber) return null;
    return ctx.db.patch(subscriber._id, {
      topics,
    });
  },
});
