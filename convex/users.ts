import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./helpers/shared";
import schema from "./schema";

export const patchUser = mutation({
  args: schema.tables.users.validator,
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    if (!user) return false;
    await ctx.db.patch(user._id, args);
  },
});

export const isOnboarded = query({
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) return false;
    return !user.onboarded;
  },
});

export const patchUserTopics = mutation({
  args: {
    topics: v.array(v.string()),
  },
  handler: async (ctx, { topics }) => {
    const user = await getUser(ctx);
    if (!user) return false;
    await ctx.db.patch(user._id, {
      topics: topics,
      onboarded: true,
    });
  },
});
