import { api } from "@/convex/_generated/api";
import { getContentForArticle } from "@/helpers/loremIpsum";
import { useQuery } from "convex/react";
import Link from "next/link";
import { ArticleImage } from "../UI/ArticleImage";
import { SideArticleSkeleton } from "../UI/SkeletonComponents";

interface SideArticlesProps {
  excludeArticleId?: string;
}

export const SideArticles = ({ excludeArticleId }: SideArticlesProps) => {
  const isSubscribed = useQuery(api.subscribers.getSubscriber);
  const user = useQuery(api.auth.loggedInUser);

  const personalizedNews = useQuery(
    api.news.getPersonalizedNews,
    user?.topics
      ? { userTopics: user.topics, limit: 4 }
      : { userTopics: [], limit: 4 }
  );

  if (!personalizedNews) {
    return <SideArticleSkeleton />;
  }

  const filteredNews = personalizedNews
    .filter((article) => article._id !== excludeArticleId)
    .slice(0, 2);

  if (filteredNews.length === 0) {
    return (
      <div className="flex-1 px-2 pb-4 sm:px-3 lg:px-3 xl:px-4 flex flex-col gap-3 text-center text-gray-500">
        <p>No suitable articles to display</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-2 pb-4 sm:px-3 lg:px-3 xl:px-4 flex flex-col gap-3 sm:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      {filteredNews.map((article, idx) => {
        const displayContent = getContentForArticle(
          article.text,
          isSubscribed,
          article.isPremium || false
        );

        const showBlur = !isSubscribed && article.isPremium;

        return (
          <Link
            key={article._id}
            href={`/news/${article._id}`}
            className="flex-1 flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4 hover:opacity-90 transition-opacity duration-300 min-h-0 overflow-hidden"
          >
            <div
              className={`flex gap-2 sm:gap-3 lg:gap-3 xl:gap-4 flex-shrink-0 ${
                idx === 1 ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="w-20 sm:w-24 md:w-28 lg:w-24 xl:w-28 h-full flex-shrink-0 relative">
                <ArticleImage
                  src={article.image ?? "/image.png"}
                  alt={article.title}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover absolute inset-0"
                  isPremium={article.isPremium}
                  isSubscribed={isSubscribed}
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl md:text-xl lg:text-lg xl:text-xl font-bold text-black line-clamp-4 hover:text-neutral-700 transition-colors duration-300">
                  {article.title}
                </h3>
                {user?.topics && user.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {article.topics
                      .filter((topic) => user.topics?.includes(topic))
                      .slice(0, 3)
                      .map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-black text-white px-2 py-0.5"
                        >
                          {topic}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between min-h-0 overflow-hidden relative">
              <p
                className={`text-base sm:text-base md:text-base lg:text-sm xl:text-[17px] xl:leading-[24px] text-neutral-600 mb-2 sm:mb-3 line-clamp-4 md:line-clamp-6 lg:line-clamp-none ${
                  showBlur ? "blur-sm" : ""
                }`}
              >
                {displayContent}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
