"use client";

import { useQuery } from "convex-helpers/react/cache";
import { Authenticated, Unauthenticated } from "convex/react";
import { OnboardingFlow } from "../components/Containers/OnboardingFlow";
import { SideArticles } from "../components/Containers/SideArticles";
import { MainArticle } from "../components/Containers/MainArticle";
import { ArticleList } from "../components/Containers/ArticleList";
import { NewsletterSubscription } from "../components/UI/NewsletterSubscription";
import { PremiumSignupLink } from "../components/UI/PremiumSignupLink";
import { api } from "../convex/_generated/api";
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
          <SideArticles
            articles={sideArticles}
            isAuthenticated={isAuthenticated}
          />

          {/* Link with black background - only for unauthenticated users */}
          {!isAuthenticated && <PremiumSignupLink />}
        </div>

        {/* Center Column - Main Article */}
        <MainArticle
          article={mainArticle}
          isAuthenticated={isAuthenticated}
          hasNext={false}
          hasPrev={false}
          onNext={() => {}}
          onPrev={() => {}}
        />

        {/* Right Column - List and Newsletter */}
        <div className="w-full lg:w-1/4 flex flex-col h-full">
          <ArticleList
            articles={listArticles}
            isAuthenticated={isAuthenticated}
          />
          <NewsletterSubscription />
        </div>
      </>
    );
  }
);

NewsContent.displayName = "NewsContent";
