"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { Clock, Eye, Calendar, BookOpen } from "lucide-react";

interface ReadingHistoryProps {
  userTopics: string[];
}

export const ReadingHistory = ({ userTopics }: ReadingHistoryProps) => {
  const user = useQuery(api.auth.loggedInUser);

  const readingHistory = [
    {
      id: "1",
      title: "Breaking: Major Tech Breakthrough in AI Development",
      topic: "Tech",
      readAt: "2 hours ago",
      readingTime: "5 min read",
      views: 1250,
    },
    {
      id: "2",
      title: "Global Economic Trends: What to Expect in 2024",
      topic: "Finance",
      readAt: "1 day ago",
      readingTime: "8 min read",
      views: 890,
    },
    {
      id: "3",
      title: "Climate Change: New Research Findings",
      topic: "Environment",
      readAt: "3 days ago",
      readingTime: "6 min read",
      views: 2100,
    },
    {
      id: "4",
      title: "Sports: Championship Finals Analysis",
      topic: "Sports",
      readAt: "1 week ago",
      readingTime: "4 min read",
      views: 1560,
    },
  ];

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Reading History
          </h3>
          <div className="text-sm text-neutral-600">Last 30 days</div>
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
            {readingHistory.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="block group"
              >
                <div className="p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-black text-xs font-semibold">
                          {article.topic}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </span>
                      </div>

                      <h4 className="font-bold text-black text-sm mb-2 group-hover:text-neutral-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.readAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readingTime}</span>
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
              <span className="font-semibold text-black">Tech</span>
            </div>
            <div className="flex justify-between">
              <span>Average reading time:</span>
              <span className="font-semibold">6 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Articles read this month:</span>
              <span className="font-semibold text-black">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
