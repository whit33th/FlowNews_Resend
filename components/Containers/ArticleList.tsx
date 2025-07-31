import Link from "next/link";
import { ArticleImage } from "../UI/ArticleImage";

interface Article {
  _id: string;
  title: string;
  isPremium?: boolean;
}

interface ArticleListProps {
  articles: Article[];
  isAuthenticated: boolean;
}

export const ArticleList = ({
  articles,
  isAuthenticated,
}: ArticleListProps) => {
  return (
    <div className="flex-1 px-3 lg:px-4">
      <ul className="flex flex-col gap-3 lg:gap-4">
        {articles.map((article, idx) => (
          <li key={idx} className="flex gap-3 lg:gap-3">
            {!isAuthenticated && article.isPremium ? (
              <div
                className="flex gap-3 lg:gap-3 w-full hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer"
                onClick={() => (window.location.href = "/signin")}
              >
                <div className="w-16 lg:w-16 h-16 lg:h-16 flex-shrink-0">
                  <ArticleImage
                    src="/image.png"
                    alt={article.title}
                    width={64}
                    height={64}
                    className="w-full h-full blur-sm"
                    isPremium={article.isPremium}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
                <h3 className="text-base lg:text-base font-bold text-black flex-1 blur-sm line-clamp-4">
                  {article.title}
                </h3>
              </div>
            ) : (
              <Link
                href={`/news/${article._id}`}
                className="flex gap-3 lg:gap-3 w-full hover:bg-gray-50 rounded transition-colors"
              >
                <div className="w-16 lg:w-16 h-16 lg:h-16 flex-shrink-0">
                  <ArticleImage
                    src="/image.png"
                    alt={article.title}
                    width={64}
                    height={64}
                    className="w-full h-full"
                    isPremium={article.isPremium}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
                <h3 className="text-base lg:text-base font-bold text-black flex-1 line-clamp-4">
                  {article.title}
                </h3>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
