import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./helpers/shared";
import schema from "./schema";
import { Id } from "./_generated/dataModel";

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

    // Получаем URL изображения
    const imageUrl = await ctx.storage.getUrl(storageId);

    // Обновляем пользователя с новым изображением
    await ctx.db.patch(user._id, {
      image: imageUrl || undefined,
    });

    return { success: true, imageUrl };
  },
});
