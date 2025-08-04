"use client";
import { HeaderNavigationButtonsSkeleton } from "@/components/UI/SkeletonComponents";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import { NavigationMenu } from "../../UI/NavigationMenu";
import { HeaderActions } from "./HeaderActions";
export const HeaderNavigation = () => {
  const allTopics = useQuery(api.news.getAllTopics);

  if (!allTopics) {
    return <HeaderNavigationButtonsSkeleton />;
  }

  const navigationItems = [
    ...(allTopics?.slice(0, 10) || []).map((topic) => ({
      label: topic.toUpperCase(),
      href: `/topic/${topic.toLowerCase()}`,
    })),
  ];

  return (
    <div className="mt-3 lg:mt-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
        <div className="flex items-center justify-center lg:justify-start space-x-3 lg:space-x-6 text-sm lg:text-lg">
          <NavigationMenu navigationItems={navigationItems} />
        </div>
        <HeaderActions />
      </div>
    </div>
  );
};
