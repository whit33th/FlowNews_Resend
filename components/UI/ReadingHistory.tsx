"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Clock, Eye, Calendar, BookOpen } from "lucide-react";
import { ReadingHistorySkeleton } from "../Containers/Skeletons/SkeletonComponents";

export const ReadingHistory = () => {
  const readingHistory = useQuery(api.profile.getUserReadingHistory, {
    limit: 10,
  });
  const userStats = useQuery(api.profile.getUserStats);
  const topTopics = useQuery(api.profile.getUserTopTopics);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  if (!readingHistory || !userStats || !topTopics) {
    return <ReadingHistorySkeleton />;
  }

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Reading History
          </h3>
          <div className="text-sm text-neutral-600">Last 10 articles</div>
        </div>
      </div>

      <div className="p-6">
        {readingHistory.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No reading history yet.</p>
            <p className="text-sm">
              Start reading articles to see your history here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {readingHistory
              .slice(0, 10)
              .filter((record) => record !== null)
              .map((record) => (
                <Link
                  key={record._id}
                  href={`/news/${record.newsId}`}
                  className="block group"
                >
                  <div className="p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-black text-xs font-semibold">
                            {record.news.topics[0]}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {record.news.views}
                          </span>
                        </div>

                        <h4 className="font-bold text-black text-sm mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2">
                          {record.news.title}
                        </h4>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimeAgo(record.readAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{record.readingTime || 5} min read</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-gray-400 group-hover:text-black transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <h4 className="text-lg font-bold text-black mb-2">
            Reading Insights
          </h4>
          <div className="space-y-2 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Most read topic:</span>
              <span className="font-semibold text-black">
                {topTopics.length > 0 ? topTopics[0].topic : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Average reading time:</span>
              <span className="font-semibold">
                {userStats.averageReadingTime} minutes
              </span>
            </div>
            <div className="flex justify-between">
              <span>Articles read this month:</span>
              <span className="font-semibold text-black">
                {userStats.recentActivity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
