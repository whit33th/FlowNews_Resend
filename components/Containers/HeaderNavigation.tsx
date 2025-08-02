"use client";
import { NavigationMenu } from "../UI/NavigationMenu";
import { HeaderActions } from "../UI/HeaderActions";
import { useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const HeaderNavigation = () => {
  const allTopics = useQuery(api.news.getAllTopics);

  const navigationItems = useMemo(
    () => [
      { label: "LATEST", href: "#" },
      { label: "FEATURED", href: "#" },
      ...(allTopics?.slice(0, 10) || []).map((topic) => ({
        label: topic.toUpperCase(),
        href: `#${topic}`,
      })),
    ],
    [allTopics]
  );
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
