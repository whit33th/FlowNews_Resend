"use client";

import { useQuery } from "convex-helpers/react/cache";
import { Authenticated, Unauthenticated } from "convex/react";
import { ArticleList } from "../components/Containers/ArticleList/ArticleList";
import { MainArticle } from "../components/Containers/MainArticle";
import { OnboardingFlow } from "../components/Containers/OnboardingFlow";
import { SideArticles } from "../components/Containers/SideArticles";
import { NewsletterSubscription } from "../components/UI/NewsletterSubscription";
import { api } from "../convex/_generated/api";

function AuthenticatedContent() {
  const newbee = useQuery(api.users.getNewbee);

  // if (newbee) {
  //   return <OnboardingFlow />;
  // }

  return <NewsContent />;
}

const NewsContent = () => {
  const subscriber = useQuery(api.subscribers.getSubscriber);
  const subscriberByEmail = useQuery(api.subscribers.getSubscriberByEmail);

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

  // Check if user is subscribed (either by userId or by email)
  const isSubscribed = !!(subscriber || subscriberByEmail);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      {/* Left Column - 2 Articles Only */}
      <div className="w-full lg:w-1/4 flex flex-col h-full min-w-0">
        <SideArticles articles={sideArticles} isSubscribed={isSubscribed} />

        {/* Link with black background - only for unsubscribed users */}
        {/* {!isSubscribed && <PremiumSignupLink />} */}
      </div>

      {/* Center Column - Main Article */}
      <div className="flex-1 min-w-0">
        <MainArticle
          article={mainArticle}
          isSubscribed={isSubscribed}
          hasNext={false}
          hasPrev={false}
          onNext={() => {}}
          onPrev={() => {}}
        />
      </div>

      {/* Right Column - List and Newsletter */}
      <div className="w-full lg:w-1/4 flex flex-col h-full min-w-0 px-2 sm:px-3 lg:px-3 xl:px-4 space-y-4">
        <div className="p-3 sm:p-4 bg-blue-200 flex flex-col sm:flex-row sm:justify-between sm:items-center  gap-2 sm:gap-0">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Unlock Premium Articles
            </h2>
            <p className="text-base sm:text-lg">
              Subscribe for full access to exclusive news and features.
            </p>
          </div>
        </div>
        <ArticleList articles={listArticles} isSubscribed={isSubscribed} />
        <NewsletterSubscription />
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <>
      <Unauthenticated>
        <NewsContent />
      </Unauthenticated>

      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
    </>
  );
}

NewsContent.displayName = "NewsContent";
