"use client";

import { useQuery } from "convex-helpers/react/cache";
import {
  Authenticated,
  Unauthenticated,
  useConvexAuth,
  usePaginatedQuery,
} from "convex/react";
import { ArticleList } from "../components/Containers/ArticleList/ArticleList";
import { MainArticle } from "../components/Containers/MainArticle";
import { OnboardingFlow } from "../components/Containers/OnboardingFlow";
import { SideArticles } from "../components/Containers/SideArticles";
import { NewsletterSubscription } from "../components/UI/NewsletterSubscription";
import { api } from "../convex/_generated/api";
import Loader from "@/components/UI/Loader";

function AuthenticatedContent() {
  const onboarded = useQuery(api.users.isOnboarded);
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (onboarded) {
    return <OnboardingFlow />;
  }

  return <NewsContent />;
}

const NewsContent = () => {
  const isSubscribed = useQuery(api.subscribers.getSubscriber);
  console.log(!!isSubscribed);
  return (
    <div className="flex flex-col lg:flex-row h-full gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      <div className="w-full lg:w-1/4 flex flex-col h-full min-w-0">
        <SideArticles />
      </div>

      <div className="flex-1 min-w-0">
        <MainArticle />
      </div>

      {/* Right Column - List and Newsletter */}
      <div className="w-full lg:w-1/4 flex flex-col h-full min-w-0 px-2 sm:px-3 lg:px-3 xl:px-4 space-y-4">
        <div className="p-3 sm:p-4 bg-blue-200 flex flex-col sm:flex-row sm:justify-between sm:items-center  gap-2 sm:gap-0">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              {isSubscribed
                ? "All Premium Articles Unlocked!"
                : "Unlock Premium Articles"}
            </h2>
            <p className="text-base sm:text-lg">
              {isSubscribed
                ? "You have full access to exclusive news and features."
                : "Subscribe for full access to exclusive news and features."}
            </p>
          </div>
        </div>
        <ArticleList />
        {!isSubscribed && <NewsletterSubscription />}
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
