import Link from "next/link";
import { ArticleImage } from "../../UI/ArticleImage";
import { Doc } from "@/convex/_generated/dataModel";

interface ArticleListProps {
  articles: Doc<"news">[];
  isSubscribed: boolean;
}

export const ArticleList = ({ articles, isSubscribed }: ArticleListProps) => {
  return (
    <div className="flex-1 px-2 sm:px-3 lg:px-3 xl:px-4">
      <ol className="flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4 ">
        {articles.map((article, idx) => {
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
