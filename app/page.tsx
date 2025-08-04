"use client";

import { PageSkeleton } from "@/components/Containers/Skeletons/SkeletonComponents";
import { useQuery } from "convex-helpers/react/cache";
import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import { ArticleList } from "../components/Containers/ArticleList/ArticleList";
import { MainArticle } from "../components/Containers/MainArticle";
import { OnboardingFlow } from "../components/Containers/OnboardingFlow";
import { SideArticles } from "../components/Containers/SideArticles";
import { NewsletterSubscription } from "../components/UI/NewsletterSubscription";
import { api } from "../convex/_generated/api";

function AuthenticatedContent() {
  const onboarded = useQuery(api.users.isOnboarded);
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return <PageSkeleton />;
  }
  if (onboarded) {
    return <OnboardingFlow />;
  }

  return <NewsContent />;
}

const NewsContent = () => {
  const isSubscribed = useQuery(api.subscribers.getSubscriber);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100dvh-256px)] gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      <SideArticles />
      <MainArticle />
      <div className="w-full lg:flex-1 flex flex-col h-full min-w-0 px-2 sm:px-3 lg:px-3 xl:px-4 space-y-4">
        <div className="p-3 sm:p-4 bg-blue-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            {isSubscribed
              ? "All Premium Articles Unlocked!"
              : "Unlock Premium Articles"}
          </h2>
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
