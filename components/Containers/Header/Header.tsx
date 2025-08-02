"use client";

import { useQuery } from "convex-helpers/react/cache";
import { useMemo } from "react";
import { api } from "../../../convex/_generated/api";
import { NewsSlider } from "../../UI/NewsSlider";
import { HeaderNavigation } from "../HeaderNavigation";
import { HeaderTop } from "../HeaderTop";

export default function Header() {
  const allTopics = useQuery(api.news.getAllTopics);

  // Memoize navigation items to prevent unnecessary re-renders
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

  // Memoize the current date to prevent unnecessary re-renders

  return (
    <div className="bg-white border-gray-200 text-neutral-600">
      <div className="mx-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
        {/* Top header with logo and date */}
        <HeaderTop />

        {/* Latest News Slider */}
        <div className="border-y-2 border-gray-300 py-0.5">
          <div className="bg-pink-200  px-2 lg:px-0">
            <NewsSlider />
          </div>
        </div>

        {/* Main navigation */}
        <HeaderNavigation navigationItems={navigationItems} />
      </div>
    </div>
  );
}
