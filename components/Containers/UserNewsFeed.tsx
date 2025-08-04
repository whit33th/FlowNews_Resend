"use client";

import { useQuery } from "convex-helpers/react/cache";
import { BookOpen, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { api } from "../../convex/_generated/api";
import { ArticleImage } from "../UI/ArticleImage";
import { UserNewsFeedSkeleton } from "../UI/SkeletonComponents";

interface UserNewsFeedProps {
  userTopics: string[];
}

export const UserNewsFeed = memo(({ userTopics }: UserNewsFeedProps) => {
  const personalizedNews = useQuery(api.news.getPersonalizedNews, {
    userTopics: userTopics.length > 0 ? userTopics : undefined,
  });
  const isSubscribed = useQuery(api.subscribers.getSubscriber);

  if (!personalizedNews) {
    return <UserNewsFeedSkeleton />;
  }

  if (personalizedNews.length === 0) {
    return (
      <div className="bg-white border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-black flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Personalized News
          </h3>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-neutral-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="mb-2">No personalized news available yet.</p>
            <p className="text-sm">
              Select topics in your profile to get personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-black flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Your Personalized News
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalizedNews.slice(0, 6).map((news) => (
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

        {personalizedNews.length >= 6 && (
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold hover:bg-neutral-800 transition-colors"
            >
              View All News
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

UserNewsFeed.displayName = "UserNewsFeed";
