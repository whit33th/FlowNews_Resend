"use client";

import { useQuery } from "convex-helpers/react/cache";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import { getContentForArticle } from "@/helpers/loremIpsum";
import { useEffect, useRef } from "react";
import { Id } from "@/convex/_generated/dataModel";
import StarRating from "@/components/UI/StarRating";
import { useParams } from "next/navigation";

export default function NewsArticlePage() {
  const params = useParams();
  const newsId = params.newsId as string;
  const hasIncrementedViews = useRef(false);
  const hasAddedToHistory = useRef(false);

  const article = useQuery(api.news.getNewsById, { id: newsId as Id<"news"> });
  const isSubscribed = useQuery(api.subscribers.getSubscriber);
  const incrementViews = useMutation(api.news.incrementViews);
  const addToReadingHistory = useMutation(api.profile.addToReadingHistory);

  useEffect(() => {
    if (newsId && !hasIncrementedViews.current) {
      hasIncrementedViews.current = true;
      incrementViews({ newsId: newsId as Id<"news"> });
    }
  }, [newsId, incrementViews]);

  useEffect(() => {
    if (newsId && !hasAddedToHistory.current && article) {
      hasAddedToHistory.current = true;

      const estimatedReadingTime = Math.max(
        5,
        Math.ceil(article.text.length / 1000)
      );

      addToReadingHistory({
        newsId: newsId as Id<"news">,
        readingTime: estimatedReadingTime,
      });
    }
  }, [newsId, article, addToReadingHistory]);

  if (article === undefined) {
    return (
      <div className="flex justify-center items-center  p-4 h-96 ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-full p-4 ">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist.
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

  const isPremiumArticle = article.isPremium;
  const showPremiumBlur = isPremiumArticle && !isSubscribed;

  const displayContent = getContentForArticle(
    article.text,
    isSubscribed,
    isPremiumArticle || false
  );

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-neutral-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article._creationTime).toLocaleDateString()}</span>
          </div>
          {article.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-semibold">{article.views}</span>
            <span>views</span>
          </div>
          {article.averageRating !== undefined && (
            <div className="flex items-center gap-2">
              <StarRating
                rating={article.averageRating}
                size="sm"
                showValue={true}
              />
              <span className="text-xs text-neutral-500">
                ({article.totalRatings || 0} ratings)
              </span>
            </div>
          )}
        </div>

        {article.topics && article.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-black text-sm font-semibold rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

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

      <div className="mb-8">
        {}
        {article.image && (
          <div className="w-full h-64 lg:h-96 relative">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className={`object-cover grayscale  ${
                showPremiumBlur ? "blur-sm" : ""
              }`}
            />
            {showPremiumBlur && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                <span className="text-white text-2xl font-bold">PREMIUM</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        <div
          className={`text-lg leading-relaxed text-neutral-800 mb-8 ${
            showPremiumBlur ? "blur-sm" : ""
          }`}
        >
          {displayContent}
        </div>

        {article.summary && (
          <div
            className={`bg-gray-50 p-6 rounded-lg mb-8 ${
              showPremiumBlur ? "blur-sm" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-black mb-3">Summary</h3>
            <p className="text-neutral-700 leading-relaxed">
              {article.summary}
            </p>
          </div>
        )}

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
      </div>
    </div>
  );
}
