import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getNewsFeed = query({
  args: {
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
    search: v.optional(v.string()),
    filterTags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    let userId = null;
    try {
      userId = await getAuthUserId(ctx);
    } catch {
      // User is not authenticated, continue with null userId
    }
    const limit = args.limit ?? 20;

    // Get subscriber info if authenticated
    let subscriber = null;
    if (userId) {
      subscriber = await ctx.db
        .query("subscribers")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .unique();
    }

    let newsQuery = ctx.db.query("news").order("desc");

    if (args.search) {
      const searchResults = await ctx.db
        .query("news")
        .withSearchIndex("search_content", (q) =>
          q.search("content", args.search!)
        )
        .take(limit);
      return { news: searchResults, hasMore: false };
    }

    if (args.filterTags && args.filterTags.length > 0) {
      const allNews = await newsQuery.collect();
      const filtered = allNews.filter((news) =>
        args.filterTags!.some((tag) => news.tags.includes(tag))
      );
      return {
        news: filtered.slice(0, limit),
        hasMore: filtered.length > limit,
      };
    }

    const allNews = await newsQuery.take(limit * 2);

    // If not authenticated or no subscriber, return basic news feed
    if (!userId || !subscriber) {
      return { news: allNews.slice(0, limit), hasMore: allNews.length > limit };
    }

    // Score news based on user preferences for authenticated subscribers
    const scoredNews = allNews.map((news) => {
      let score = 0;

      // Topic matches (10 points each)
      news.tags.forEach((tag) => {
        if (subscriber!.topics.includes(tag)) {
          score += 10;
        }
      });

      // Hashtag matches (5 points each)
      news.tags.forEach((tag) => {
        if (subscriber!.hashtags.includes(tag)) {
          score += 5;
        }
      });

      // Mention matches (15 points each)
      news.mentions.forEach((mention) => {
        if (subscriber!.mentions.includes(mention)) {
          score += 15;
        }
      });

      // Date decay (newer is better)
      const daysSincePublished =
        (Date.now() - news.publishedAt) / (1000 * 60 * 60 * 24);
      const dateScore = Math.max(0, 10 - daysSincePublished);
      score += dateScore;

      return { ...news, score };
    });

    // Sort by score
    scoredNews.sort((a, b) => b.score - a.score);

    // Apply 75%/25% mix
    const relevantNews = scoredNews.filter((n) => n.score > 0);
    const randomNews = scoredNews.filter((n) => n.score === 0);

    const mixedNews = [];
    let relevantIndex = 0;
    let randomIndex = 0;

    for (let i = 0; i < limit; i++) {
      if (i % 4 === 3 && randomIndex < randomNews.length) {
        // Every 4th item is random (25%)
        mixedNews.push(randomNews[randomIndex++]);
      } else if (relevantIndex < relevantNews.length) {
        // 75% relevant
        mixedNews.push(relevantNews[relevantIndex++]);
      } else if (randomIndex < randomNews.length) {
        // Fill remaining with random
        mixedNews.push(randomNews[randomIndex++]);
      }
    }

    return {
      news: mixedNews.slice(0, limit),
      hasMore:
        relevantIndex < relevantNews.length || randomIndex < randomNews.length,
    };
  },
});

export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").collect();
    const tagSet = new Set<string>();
    news.forEach((item) => {
      item.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  },
});

// Seed some example news data
export const seedNews = mutation({
  args: {},
  handler: async (ctx) => {
    const sampleNews = [
      {
        title: "Revolutionary AI Breakthrough in Healthcare",
        content:
          "Scientists have developed a new AI system that can diagnose diseases with 99% accuracy. This breakthrough could transform medical diagnosis and treatment worldwide.",
        summary: "New AI system achieves 99% accuracy in disease diagnosis",
        tags: ["Tech", "Healthcare", "AI"],
        mentions: ["@TechNews", "@HealthcareTech"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        source: "TechDaily",
        url: "https://example.com/ai-healthcare",
        isPremium: false,
      },
      {
        title: "Climate Change Summit Reaches Historic Agreement",
        content:
          "World leaders have agreed on unprecedented climate action measures at the global summit. The agreement includes binding emissions targets and substantial funding for renewable energy.",
        summary:
          "Historic climate agreement reached with binding emissions targets",
        tags: ["Environment", "Politics", "Climate"],
        mentions: ["@ClimateNews", "@WorldLeaders"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
        source: "Global News",
        url: "https://example.com/climate-summit",
        isPremium: false,
      },
      {
        title: "Stock Market Hits Record High Amid Tech Rally",
        content:
          "Major stock indices reached all-time highs today as technology stocks surged. Investors are optimistic about AI and renewable energy sectors driving future growth.",
        summary: "Stock market reaches record high on tech rally",
        tags: ["Finance", "Tech", "Markets"],
        mentions: ["@MarketWatch", "@TechStocks"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
        source: "Financial Times",
        url: "https://example.com/market-high",
        isPremium: true,
      },
      {
        title: "New Music Festival Announces Star-Studded Lineup",
        content:
          "The annual SoundWave festival has revealed its biggest lineup yet, featuring top artists from around the world. Tickets are expected to sell out within hours.",
        summary: "SoundWave festival announces major artist lineup",
        tags: ["Music", "Events", "Entertainment"],
        mentions: ["@SoundWave", "@MusicNews"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 8, // 8 hours ago
        source: "Music Weekly",
        url: "https://example.com/music-festival",
        isPremium: false,
      },
      {
        title: "Rare Wildlife Species Discovered in Amazon Rainforest",
        content:
          "Researchers have discovered three new species of birds in the Amazon rainforest. This discovery highlights the importance of conservation efforts in protecting biodiversity.",
        summary: "Three new bird species discovered in Amazon",
        tags: ["Nature", "Science", "Conservation"],
        mentions: ["@NatureNews", "@AmazonWatch"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
        source: "Nature Today",
        url: "https://example.com/amazon-discovery",
        isPremium: true,
      },
      {
        title: "Exclusive: Inside the Secret Space Mission",
        content:
          "Our investigative team has uncovered details about a classified space mission that could revolutionize space travel. This exclusive report reveals the technology behind the mission.",
        summary: "Exclusive report on classified space mission technology",
        tags: ["Space", "Tech", "Exclusive"],
        mentions: ["@SpaceNews", "@TechExclusive"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 1, // 1 hour ago
        source: "Space Weekly",
        url: "https://example.com/space-mission",
        isPremium: true,
      },
      {
        title: "Breaking: Major Political Scandal Uncovered",
        content:
          "A major political scandal has been uncovered involving high-ranking officials. This developing story has significant implications for the upcoming elections.",
        summary: "Major political scandal involving high-ranking officials",
        tags: ["Politics", "Breaking", "Scandal"],
        mentions: ["@PoliticalNews", "@BreakingNews"],
        publishedAt: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
        source: "Political Daily",
        url: "https://example.com/political-scandal",
        isPremium: true,
      },
    ];

    for (const news of sampleNews) {
      await ctx.db.insert("news", news);
    }

    return "News seeded successfully";
  },
});
