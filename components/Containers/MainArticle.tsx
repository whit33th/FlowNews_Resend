"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useStablePaginatedQuery } from "../../convex/helpers/useStablePaginatedQuery";
import Link from "next/link";
import { useState } from "react";
import { getContentForArticle } from "../../helpers/loremIpsum";
import { ArticleImage } from "../UI/ArticleImage";
import { AuthorInfo } from "../UI/AuthorInfo";
import { NavigationButtons } from "../UI/NavigationButtons";

export const MainArticle = () => {
  const { results, loadMore, status, isLoading } = useStablePaginatedQuery(
    api.news.getAllNewsPaginated,
    { order: "desc" },
    {
      initialNumItems: 2,
    }
  );
  const isSubscribed = useQuery(api.subscribers.getSubscriber);

  console.log(results);
  const [page, setPage] = useState(0);

  function onNext(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setPage(page + 1);
    if (status === "CanLoadMore") {
      loadMore(2);
    }
  }
  function onPrev(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (page > 0) {
      setPage(page - 1);
    }
  }

  // Check if we have results and the current page is valid
  if (isLoading || !results || results.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full p-3 lg:p-4 border-x border-gray-200">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const currentPage = Math.min(page, results.length - 1);
  const currentArticle = results[currentPage];

  if (!currentArticle) {
    return (
      <div className="flex-1 flex flex-col h-full p-3 lg:p-4 border-x border-gray-200">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">No articles available</div>
        </div>
      </div>
    );
  }

  const displayContent = getContentForArticle(
    currentArticle.text,
    !isSubscribed,
    currentArticle.isPremium || false
  );

  const showBlur = !isSubscribed && currentArticle.isPremium;

  return (
    <Link
      href={`/news/${currentArticle._id}`}
      className="flex-1 flex flex-col h-full hover:opacity-90 transition-opacity duration-300"
    >
      {/* Full-width image */}
      <ArticleImage
        src="/image.png"
        alt="Main article"
        width={800}
        height={256}
        className={`h-48 sm:h-60 md:h-56 lg:h-40 xl:h-50 2xl:h-56 w-full`}
        isPremium={currentArticle.isPremium}
        isSubscribed={!isSubscribed}
      />

      {/* Article text */}
      <div className="flex flex-col h-full p-3 lg:p-4 border-x border-gray-200">
        <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-black line-clamp-4 hover:text-neutral-700 transition-colors duration-300">
            {currentArticle.title}
          </h1>
          <p
            className={`text-base sm:text-lg md:text-lg lg:text-base xl:text-lg font-semibold text-neutral-600 leading-relaxed line-clamp-[8] lg:line-clamp-[10] 2xl:line-clamp-[17] ${
              showBlur ? "blur-sm" : ""
            }`}
          >
            {displayContent}
          </p>
        </div>

        {/* Author info and navigation - at the bottom */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-4 border-t border-gray-200 mt-4 gap-3 lg:gap-0">
          <AuthorInfo publishedAt={currentArticle._creationTime} />
          <NavigationButtons
            status={status}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            totalPages={results.length}
          />
        </div>
      </div>
    </Link>
  );
};
