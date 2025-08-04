"use client";

import { useQuery } from "convex-helpers/react/cache";
import { BookOpen, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { api } from "../../convex/_generated/api";
import { ArticleImage } from "../UI/ArticleImage";
import { TopicNewsFeedSkeleton } from "../UI/SkeletonComponents";

interface TopicNewsFeedProps {
  topic: string;
}

export const TopicNewsFeed = memo(({ topic }: TopicNewsFeedProps) => {
  const topicNews = useQuery(api.news.getNewsByTopic, {
    topic: topic,
    limit: 20,
  });
  const isSubscribed = useQuery(api.subscribers.getSubscriber);

  if (!topicNews) {
    return <TopicNewsFeedSkeleton />;
  }

  if (topicNews.length === 0) {
    return (
      <div className="bg-white border border-gray-200">
        <div className="p-6">
          <div className="text-center py-8 text-neutral-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="mb-2">No news available for this topic yet.</p>
            <p className="text-sm">
              Check back later for new articles in this category.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicNews.map((news) => (
            <Link
              key={news._id}
              href={`/news/${news._id}`}
              className="group block"
            >
              <div className="border border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <ArticleImage
                    src={news.image ?? "/image.png"}
                    alt={news.title}
                    width={400}
                    height={225}
                    className="w-full h-full"
                    isPremium={news.isPremium}
                    isSubscribed={isSubscribed}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {news.topics.slice(0, 2).map((topic: string) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 text-black text-xs font-semibold"
                      >
                        {topic}
                      </span>
                    ))}
                    {news.topics.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{news.topics.length - 2} more
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-black text-sm mb-2 line-clamp-2 group-hover:text-neutral-600 transition-colors">
                    {news.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{news.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(news._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

TopicNewsFeed.displayName = "TopicNewsFeed";
