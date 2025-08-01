"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { getContentForArticle } from "../../../helpers/loremIpsum";

export default function NewsArticlePage() {
  const params = useParams();
  const newsId = params.newsId as string;

  const article = useQuery(api.news.getNewsById, { id: newsId as any });
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const subscriber = useQuery(api.subscribers.getSubscriber);
  const subscriberByEmail = useQuery(
    api.subscribers.getSubscriberByEmail,
    loggedInUser?.email ? { email: loggedInUser.email } : "skip"
  );

  if (article === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Check if article is premium and user is not subscribed
  const isPremiumArticle = article.isPremium;
  const isSubscribed = !!(subscriber || subscriberByEmail);
  const showPremiumBlur = isPremiumArticle && !isSubscribed;

  const displayContent = getContentForArticle(
    article.text,
    isSubscribed,
    isPremiumArticle || false
  );

  const displaySummary = article.summary
    ? getContentForArticle(
        article.summary,
        isSubscribed,
        isPremiumArticle || false
      )
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-neutral-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          {article.source && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.source}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-black text-sm font-semibold rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Premium notice */}
        {showPremiumBlur && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600 font-bold">PREMIUM CONTENT</span>
            </div>
            <p className="text-red-700 mb-3">
              This is premium text. Please sign in to read the full article.
            </p>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
            >
              Sign In to Read
            </Link>
          </div>
        )}
      </div>

      {/* Article Image */}
      <div className="mb-8">
        <div className="w-full h-64 lg:h-96 relative">
          <Image
            src="/image.png"
            alt={article.title}
            fill
            className={`object-cover grayscale ${
              showPremiumBlur ? "blur-sm" : ""
            }`}
          />
          {showPremiumBlur && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-2xl font-bold">PREMIUM</span>
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className={`text-lg leading-relaxed text-neutral-800 mb-8 ${
            showPremiumBlur ? "blur-sm" : ""
          }`}
        >
          {displayContent}
        </div>

        {displaySummary && (
          <div
            className={`bg-gray-50 p-6 rounded-lg mb-8 ${
              showPremiumBlur ? "blur-sm" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-black mb-3">Summary</h3>
            <p className="text-neutral-700 leading-relaxed">{displaySummary}</p>
          </div>
        )}

        {/* Mentions */}
        {article.mentions && article.mentions.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-black mb-3">
              Related Mentions
            </h3>
            <div className="flex flex-wrap gap-2">
              {article.mentions.map((mention, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full"
                >
                  {mention}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source Link */}
        {article.url && (
          <div className="border-t border-gray-200 pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Read full article at source
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
