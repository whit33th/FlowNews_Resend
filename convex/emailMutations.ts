import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { emailTypeValidator } from "./schema";

export const logEmailNotification = internalMutation({
  args: {
    userId: v.optional(v.id("users")),
    email: v.string(),
    type: emailTypeValidator,
    emailId: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("emailNotifications", {
      userId: args.userId,
      email: args.email,
      type: args.type,
      status: "sent",
      sentAt: Date.now(),
      metadata: args.metadata,
    });
  },
});
