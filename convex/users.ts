import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { getUser } from "./helpers/shared";
import { userFields, topicsValidator } from "./schema";

export const getAllUsers = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const patchUser = mutation({
  args: userFields,
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
    topics: topicsValidator,
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

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getUser(ctx);
    if (!user) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const updateUserImage = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    const user = await getUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const imageUrl = await ctx.storage.getUrl(storageId);

    await ctx.db.patch(user._id, {
      image: imageUrl || undefined,
    });

    return { success: true, imageUrl };
  },
});
