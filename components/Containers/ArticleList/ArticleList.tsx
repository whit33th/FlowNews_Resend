import Link from "next/link";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex-helpers/react/cache";
import { ArticleListSkeleton } from "../Skeletons/SkeletonComponents";

export const ArticleList = () => {
  const premiumNews = useQuery(api.news.getPremiumNews, { limit: 15 });

  if (!premiumNews) {
    return <ArticleListSkeleton />;
  }

  return (
    <div className="flex-1 px-2 sm:px-3 lg:px-3 xl:px-4 lg:overflow-y-auto">
      <ol className="flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4 ">
        {premiumNews?.map((article, idx) => {
          return (
            <li
              key={idx}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <Link
                href={`/news/${article._id}`}
                className="text-sm sm:text-base md:text-base lg:text-sm xl:text-base font-bold flex  text-black line-clamp-2 hover:text-neutral-700 transition-colors duration-300"
              >
                {idx + 1}. {article.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
