"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { BookOpen, Eye, Calendar, TrendingUp } from "lucide-react";

interface UserStatsProps {
  userTopics: string[];
}

export const UserStats = ({ userTopics }: UserStatsProps) => {
  const user = useQuery(api.auth.loggedInUser);

  const stats = {
    articlesRead: Math.floor(Math.random() * 100) + 50,
    topicsFollowed: userTopics.length,
    readingStreak: Math.floor(Math.random() * 30) + 1,
    favoriteTopic: userTopics.length > 0 ? userTopics[0] : "None",
  };

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-black flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Reading Statistics
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-black">
              {stats.articlesRead}
            </div>
            <div className="text-sm text-neutral-600 font-semibold">
              Articles Read
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-black">
              {stats.topicsFollowed}
            </div>
            <div className="text-sm text-neutral-600 font-semibold">
              Topics Followed
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-black">
              {stats.readingStreak}
            </div>
            <div className="text-sm text-neutral-600 font-semibold">
              Day Streak
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <div className="text-lg font-bold text-black truncate">
              {stats.favoriteTopic}
            </div>
            <div className="text-sm text-neutral-600 font-semibold">
              Top Topic
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <h4 className="text-lg font-bold text-black mb-2">
            Reading Insights
          </h4>
          <div className="space-y-2 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Average reading time per day:</span>
              <span className="font-semibold">15 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Most active reading time:</span>
              <span className="font-semibold">Morning (8-10 AM)</span>
            </div>
            <div className="flex justify-between">
              <span>Preferred content type:</span>
              <span className="font-semibold">Breaking News</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
