"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import { BookOpen, Calendar, TrendingUp } from "lucide-react";
import { UserStatsSkeleton } from "../Containers/Skeletons/SkeletonComponents";

interface UserStatsProps {
  userTopics: string[];
}

export const UserStats = ({}: UserStatsProps) => {
  const userStats = useQuery(api.profile.getUserStats);

  if (!userStats) {
    return <UserStatsSkeleton />;
  }

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-black flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Reading Statistics
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-black">
              {userStats.articlesRead}
            </div>
            <div className="text-sm text-neutral-600 font-semibold">
              Articles Read
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-black" />
            </div>
            <div className="text-2xl font-bold text-black">
              {userStats.dayStreak}
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
              {userStats.favoriteTopic}
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
              <span>Average reading time per article:</span>
              <span className="font-semibold">
                {userStats.averageReadingTime} minutes
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total reading time:</span>
              <span className="font-semibold">
                {Math.round(userStats.totalReadingTime / 60)} hours
              </span>
            </div>
            <div className="flex justify-between">
              <span>Active days this month:</span>
              <span className="font-semibold">
                {userStats.recentActivity} days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
