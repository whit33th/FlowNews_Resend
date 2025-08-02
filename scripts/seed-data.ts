import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { posts } from "../helpers/posts";

const client = new ConvexHttpClient("https://your-convex-url.convex.cloud");

async function seedData() {
  console.log("Starting to seed data...");

  try {
    // Добавляем статьи
    console.log("Adding articles...");
    const result = await client.mutation(api.news.insertMultipleBlogPosts, {
      blogPosts: posts,
    });

    console.log(`Successfully added ${result.count} articles`);
    console.log("Article IDs:", result.insertedIds);

    console.log("Data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Запускаем скрипт
seedData();
