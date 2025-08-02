import { getAuthUserId } from "@convex-dev/auth/server";

export async function getUser(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) return null;
  return await ctx.db.get(userId);
}
