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
    <div className="flex-1 px-3 lg:px-4">
      <div className="flex flex-col h-full gap-4 lg:gap-6">
        {articles.map((article, idx) => (
          <div key={idx} className="flex-1 flex gap-3 lg:gap-4">
            {idx === 0 ? (
              // First article: text left, image right (full height)
              <>
                <div className="flex-1 flex flex-col">
                  <h3
                    className={`text-xl lg:text-2xl font-bold text-black mb-3 line-clamp-4 ${
                      !isAuthenticated && article.isPremium ? "blur-sm" : ""
                    }`}
                  >
                    {article.title}
                  </h3>
                  <p
                    className={`text-base lg:text-lg text-neutral-600 mb-3 flex-1 line-clamp-4 ${
                      !isAuthenticated && article.isPremium ? "blur-sm" : ""
                    }`}
                  >
                    {article.content}
                  </p>
                  {!isAuthenticated && article.isPremium ? (
                    <Link
                      href="/signin"
                      className="text-base lg:text-lg font-semibold blur-sm "
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
                {/* <div className="w-24 lg:w-32 max-h-96 h-full flex-shrink-0 relative">
                  <ArticleImage
                    src="/image.png"
                    alt={article.title}
                    width={150}
                    height={500}
                    className="w-full h-full"
                    isPremium={article.isPremium}
                    isAuthenticated={isAuthenticated}
                  />
                </div> */}
              </>
            ) : (
              // Second article: image + title in row, text below both
              <div className="flex flex-col h-full">
                <div className="flex gap-3 lg:gap-4 mb-3">
                  <div className="w-20 lg:w-36 h-20 lg:h-36 flex-shrink-0">
                    <ArticleImage
                      src="/image.png"
                      alt={article.title}
                      width={150}
                      height={150}
                      className="w-full h-full"
                      isPremium={article.isPremium}
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl lg:text-2xl font-bold text-black line-clamp-4 ${
                        !isAuthenticated && article.isPremium ? "blur-sm" : ""
                      }`}
                    >
                      {article.title}
                    </h3>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <p
                    className={`text-base lg:text-lg text-neutral-600 mb-3 flex-1 line-clamp-4 ${
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
