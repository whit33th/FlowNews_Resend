import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const getNewbee = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    return user?.newbee === false ? false : true;
  },
});
