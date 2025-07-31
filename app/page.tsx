"use client";

import { useQuery } from "convex-helpers/react/cache";
import { Authenticated, Unauthenticated } from "convex/react";
import { OnboardingFlow } from "../components/Containers/OnboardingFlow";
import { api } from "../convex/_generated/api";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6 ">
      <Unauthenticated>
        <NewsContent isAuthenticated={false} />
      </Unauthenticated>

      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
    </div>
  );
}

function AuthenticatedContent() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const subscriber = useQuery(api.subscribers.getSubscriber);

  if (loggedInUser === undefined || subscriber === undefined) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!subscriber) {
    return <OnboardingFlow />;
  }

  return <NewsContent isAuthenticated={true} />;
}

// Memoized news content component to prevent unnecessary re-renders
const NewsContent = memo(
  ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const newsFeed = useQuery(api.news.getNewsFeed, { limit: 30 });

    if (newsFeed === undefined) {
      return (
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      );
    }

    const mainArticle = newsFeed.news[0];

    const sideArticles = newsFeed.news.slice(1, 3);
    const listArticles = newsFeed.news.slice(3, 8);

    return (
      <>
        {/* Left Column - 2 Articles Only */}
        <div className="w-full lg:w-1/4 flex flex-col h-full">
          {/* Side articles - take full height */}
          <div className="flex-1 p-3 lg:p-4">
            <div className="flex flex-col h-full gap-4 lg:gap-6">
              {sideArticles.map((article, idx) => (
                <div key={idx} className="flex-1 flex gap-3 lg:gap-4">
                  {idx === 0 ? (
                    // First article: text left, image right (full height)
                    <>
                      <div className="flex-1 flex flex-col">
                        <h3
                          className={`text-xl lg:text-2xl font-bold text-black mb-3 ${
                            !isAuthenticated && article.isPremium
                              ? "blur-sm"
                              : ""
                          }`}
                        >
                          {article.title}
                        </h3>
                        <p
                          className={`text-base lg:text-lg text-neutral-600 mb-3 flex-1 ${
                            !isAuthenticated && article.isPremium
                              ? "blur-sm"
                              : ""
                          }`}
                        >
                          {article.content.length > 120
                            ? article.content.substring(0, 120) + "..."
                            : article.content}
                        </p>
                        {!isAuthenticated && article.isPremium ? (
                          <Link
                            href="/signin"
                            className="text-base lg:text-lg font-semibold text-red-600 hover:text-red-800"
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
                      <div className="w-24 lg:w-32 h-full flex-shrink-0 relative">
                        <Image
                          src="/image.png"
                          alt={article.title}
                          width={150}
                          height={500}
                          className={`object-cover w-full h-full grayscale ${
                            !isAuthenticated && article.isPremium
                              ? "blur-sm"
                              : ""
                          }`}
                        />
                        {!isAuthenticated && article.isPremium && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <span className="text-white text-xs font-bold">
                              PREMIUM
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Second article: image + title in row, text below both
                    <div className="flex flex-col h-full">
                      <div className="flex gap-3 lg:gap-4 mb-3">
                        <div className="w-20 lg:w-36 h-20 lg:h-36  flex-shrink-0 relative">
                          <Image
                            src="/image.png"
                            alt={article.title}
                            width={150}
                            height={150}
                            className={`object-cover w-full h-full grayscale ${
                              !isAuthenticated && article.isPremium
                                ? "blur-sm"
                                : ""
                            }`}
                          />
                          {!isAuthenticated && article.isPremium && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                              <span className="text-white text-xs font-bold">
                                PREMIUM
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-xl lg:text-2xl font-bold text-black ${
                              !isAuthenticated && article.isPremium
                                ? "blur-sm"
                                : ""
                            }`}
                          >
                            {article.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p
                          className={`text-base lg:text-lg text-neutral-600 mb-3 flex-1 ${
                            !isAuthenticated && article.isPremium
                              ? "blur-sm"
                              : ""
                          }`}
                        >
                          {article.content.length > 120
                            ? article.content.substring(0, 120) + "..."
                            : article.content}
                        </p>
                        {!isAuthenticated && article.isPremium ? (
                          <Link
                            href="/signin"
                            className="text-base lg:text-lg font-semibold text-red-600 hover:text-red-800"
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

          {/* Link with black background - only for unauthenticated users */}
          {!isAuthenticated && (
            <div className="h-28 lg:h-32 p-3 lg:p-4">
              <Link
                href="/signup"
                className=" w-full h-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
              >
                <span className="text-lg lg:text-lg font-semibold text-center">
                  Subscribe to Premium News
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Center Column - Main Article */}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex flex-col h-full">
            {/* Full-width image */}
            <div className="w-full h-56 lg:h-64 relative">
              <Image
                src="/image.png"
                alt="Main article"
                width={800}
                height={256}
                className={`object-cover w-full h-full grayscale ${
                  !isAuthenticated && mainArticle.isPremium ? "blur-sm" : ""
                }`}
              />
              {!isAuthenticated && mainArticle.isPremium && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-2xl font-bold">
                    PREMIUM CONTENT
                  </span>
                </div>
              )}
            </div>

            {/* Article content */}
            <div className="flex flex-col h-full p-3 lg:p-4 ">
              <div className="flex-1 flex flex-col gap-3 lg:gap-4">
                <h1
                  className={`text-3xl lg:text-4xl font-bold text-black ${
                    !isAuthenticated && mainArticle.isPremium ? "blur-sm" : ""
                  }`}
                >
                  {mainArticle.title}
                </h1>
                <p
                  className={`text-lg lg:text-lg font-semibold text-neutral-600 leading-relaxed flex-1 ${
                    !isAuthenticated && mainArticle.isPremium ? "blur-sm" : ""
                  }`}
                >
                  {mainArticle.content}
                </p>
              </div>

              {/* Author info and navigation - at the bottom */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center pt-4 border-t border-gray-200 mt-4 gap-3 lg:gap-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full overflow-hidden">
                    <Image
                      src="/image.png"
                      alt="Author"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full grayscale"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-lg font-semibold text-black">
                      {mainArticle.source || "News Source"}
                    </span>
                    <span className="text-base lg:text-base font-semibold text-neutral-500">
                      {new Date(mainArticle.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 lg:w-5 h-5 lg:h-5" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                    <ChevronRight className="w-5 lg:w-5 h-5 lg:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - List and Newsletter */}
        <div className="w-full lg:w-1/4 flex flex-col h-full">
          {/* Article list */}
          <div className="flex-1 p-3 lg:p-4">
            <ul className="flex flex-col gap-3 lg:gap-4">
              {listArticles.map((article, idx) => (
                <li key={idx} className="flex gap-3 lg:gap-3">
                  {!isAuthenticated && article.isPremium ? (
                    <div
                      className="flex gap-3 lg:gap-3 w-full hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer"
                      onClick={() => (window.location.href = "/signin")}
                    >
                      <div className="w-16 lg:w-16 h-16 lg:h-16 flex-shrink-0 relative">
                        <Image
                          src="/image.png"
                          alt={article.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full grayscale blur-sm"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <span className="text-white text-xs font-bold">
                            PREMIUM
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base lg:text-base font-bold text-black flex-1 blur-sm">
                        {article.title}
                      </h3>
                    </div>
                  ) : (
                    <Link
                      href={`/news/${article._id}`}
                      className="flex gap-3 lg:gap-3 w-full hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <div className="w-16 lg:w-16 h-16 lg:h-16 flex-shrink-0">
                        <Image
                          src="/image.png"
                          alt={article.title}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full grayscale"
                        />
                      </div>
                      <h3 className="text-base lg:text-base font-bold text-black flex-1">
                        {article.title}
                      </h3>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription - at the bottom */}
          <div className="border-t border-gray-200 p-3 lg:p-4">
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 lg:w-5 h-5 lg:h-5 text-neutral-600" />
                <h3 className="text-lg lg:text-lg font-bold text-black">
                  Subscribe to Newsletter
                </h3>
              </div>
              <p className="text-base lg:text-base font-semibold text-neutral-600">
                Get the latest news delivered to your inbox
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-base lg:text-base font-semibold focus:outline-none focus:border-black"
                />
                <button className="w-full px-3 py-2 bg-black text-white text-base lg:text-base font-semibold hover:bg-neutral-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

NewsContent.displayName = "NewsContent";
