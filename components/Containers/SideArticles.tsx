import Link from "next/link";
import { ArticleImage } from "../UI/ArticleImage";

interface Article {
  _id: string;
  title: string;
  content: string;
  isPremium?: boolean;
}

interface SideArticlesProps {
  articles: Article[];
  isAuthenticated: boolean;
}

export const SideArticles = ({
  articles,
  isAuthenticated,
}: SideArticlesProps) => {
  return (
    <div className="flex-1 px-3 lg:px-4 flex flex-col gap-4 lg:gap-6">
      {articles.map((article, idx) => (
        <div key={idx} className="flex-1 flex flex-col gap-3 lg:gap-4">
          {/* Top flex div with image and title */}
          <div
            className={`flex gap-3 lg:gap-4 ${
              idx === 1 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-24 lg:w-32 h-full flex-shrink-0 relative">
              <ArticleImage
                src="/image.png"
                alt={article.title}
                width={150}
                height={150}
                className="w-full h-full object-cover absolute inset-0"
                isPremium={article.isPremium}
                isAuthenticated={isAuthenticated}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className={`text-xl lg:text-2xl font-bold text-black line-clamp-4 ${
                  !isAuthenticated && article.isPremium ? "blur-sm" : ""
                }`}
              >
                {article.title}
              </h3>
            </div>
          </div>

          {/* Bottom div with content and link */}
          <div className="flex-1 flex flex-col justify-between">
            <p
              className={`text-base lg:text-lg text-neutral-600 mb-3 line-clamp-4 md:line-clamp-6 lg:line-clamp-[8] 2xl:line-clamp-[10] ${
                !isAuthenticated && article.isPremium ? "blur-sm" : ""
              }`}
            >
              {article.content}
            </p>
            {!isAuthenticated && article.isPremium ? (
              <Link
                href="/signin"
                className="text-base lg:text-lg font-semibold blur-sm"
              >
                Sign in to read
              </Link>
            ) : (
              <Link
                href={`/news/${article._id}`}
                className="text-base lg:text-lg font-semibold text-black hover:underline"
              >
                Read more
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
