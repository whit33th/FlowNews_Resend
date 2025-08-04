"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import { Trophy, Star, Award, Target, Zap, BookOpen } from "lucide-react";
import { UserAchievementsSkeleton } from "../Containers/Skeletons/SkeletonComponents";

export const UserAchievements = () => {
  const achievements = useQuery(api.profile.getUserAchievements);

  if (!achievements) {
    return <UserAchievementsSkeleton />;
  }

  const getAchievementIcon = (id: string) => {
    switch (id) {
      case "first-read":
        return <BookOpen className="w-5 h-5" />;
      case "topic-explorer":
        return <Target className="w-5 h-5" />;
      case "daily-reader":
        return <Star className="w-5 h-5" />;
      case "news-junkie":
        return <Trophy className="w-5 h-5" />;
      case "speed-reader":
        return <Zap className="w-5 h-5" />;
      case "diverse-reader":
        return <Award className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-black flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </h3>
          <div className="text-sm text-neutral-600">
            {unlockedCount} of {achievements.length} unlocked
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 border border-gray-200 transition-all ${
                achievement.unlocked ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 ${
                    achievement.unlocked
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {getAchievementIcon(achievement.id)}
                </div>

                <div className="flex-1">
                  <h4
                    className={`font-bold text-sm ${
                      achievement.unlocked ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {achievement.title}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${
                      achievement.unlocked
                        ? "text-neutral-600"
                        : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {achievement.progress !== undefined &&
                    achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-2">
                          <div
                            className={`h-2 transition-all ${
                              achievement.unlocked ? "bg-black" : "bg-gray-400"
                            }`}
                            style={{
                              width: `${Math.min(
                                (achievement.progress /
                                  achievement.maxProgress) *
                                  100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                </div>

                {achievement.unlocked && (
                  <div className="text-black">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <h4 className="text-lg font-bold text-black mb-2">
            Achievement Progress
          </h4>
          <div className="space-y-2 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Total achievements unlocked:</span>
              <span className="font-semibold text-black">{unlockedCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Completion rate:</span>
              <span className="font-semibold text-black">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Next achievement:</span>
              <span className="font-semibold text-neutral-600">
                {achievements.find((a) => !a.unlocked)?.title ||
                  "All unlocked!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
