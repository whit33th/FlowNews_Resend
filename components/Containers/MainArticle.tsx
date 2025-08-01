import Image from "next/image";
import Link from "next/link";
import { AuthorInfo } from "../UI/AuthorInfo";
import { NavigationButtons } from "../UI/NavigationButtons";
import { Doc } from "../../convex/_generated/dataModel";
import { getContentForArticle } from "../../helpers/loremIpsum";
import { ArticleImage } from "../UI/ArticleImage";

interface MainArticleProps {
  article: Doc<"news">;
  isSubscribed: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const MainArticle = ({
  article,
  isSubscribed,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: MainArticleProps) => {
  const displayContent = getContentForArticle(
    article.text,
    isSubscribed,
    article.isPremium || false
  );

  const showBlur = !isSubscribed && article.isPremium;

  return (
    <Link
      href={`/news/${article._id}`}
      className="flex-1 flex flex-col h-full hover:opacity-90 transition-opacity duration-300"
    >
      {/* Full-width image */}
      <ArticleImage
        src="/image.png"
        alt="Main article"
        width={800}
        height={256}
        className={`h-48 sm:h-60 md:h-56 lg:h-40 xl:h-50 2xl:h-56 w-full`}
        isPremium={article.isPremium}
        isSubscribed={isSubscribed}
      />

      {/* Article text */}
      <div className="flex flex-col h-full p-3 lg:p-4 border-x border-gray-200">
        <div className="flex-1 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-black line-clamp-4 hover:text-neutral-700 transition-colors duration-300">
            {article.title}
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
          <AuthorInfo
            source={article.source}
            publishedAt={article._creationTime}
          />
          <NavigationButtons
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </div>
    </Link>
  );
};
