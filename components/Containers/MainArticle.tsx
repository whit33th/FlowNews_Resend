import Image from "next/image";
import { AuthorInfo } from "../UI/AuthorInfo";
import { NavigationButtons } from "../UI/NavigationButtons";

interface MainArticleProps {
  article: {
    _id: string;
    title: string;
    content: string;
    publishedAt: number;
    source?: string;
    isPremium?: boolean;
  };
  isAuthenticated: boolean;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const MainArticle = ({
  article,
  isAuthenticated,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: MainArticleProps) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Full-width image */}
      <div className="w-full h-56 lg:h-64 relative">
        <Image
          src="/image.png"
          alt="Main article"
          width={800}
          height={256}
          className={`object-cover w-full h-full grayscale ${
            !isAuthenticated && article.isPremium ? "blur-sm" : ""
          }`}
        />
        {!isAuthenticated && article.isPremium && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-2xl font-bold">
              PREMIUM CONTENT
            </span>
          </div>
        )}
      </div>

      {/* Article content */}
      <div className="flex flex-col h-full p-3 lg:p-4 border-x border-gray-200">
        <div className="flex-1 flex flex-col gap-3 lg:gap-4">
          <h1
            className={`text-3xl lg:text-4xl font-bold text-black line-clamp-4 ${
              !isAuthenticated && article.isPremium ? "blur-sm" : ""
            }`}
          >
            {article.title}
          </h1>
          <p
            className={`text-lg lg:text-lg font-semibold text-neutral-600 leading-relaxed line-clamp-[8] md:line-clamp-[14]   2xl:line-clamp-[17] ${
              !isAuthenticated && article.isPremium ? "blur-sm" : ""
            }`}
          >
            {article.content}
          </p>
        </div>

        {/* Author info and navigation - at the bottom */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-4 border-t border-gray-200 mt-4 gap-3 lg:gap-0">
          <AuthorInfo
            source={article.source}
            publishedAt={article.publishedAt}
          />
          <NavigationButtons
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={onPrev}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
};
