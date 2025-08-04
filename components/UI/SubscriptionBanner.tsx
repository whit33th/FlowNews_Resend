"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import { NewsletterSubscription } from "./NewsletterSubscription";

export const SubscriptionBanner = () => {
  const isSubscribed = useQuery(api.subscribers.getSubscriber);

  if (isSubscribed === undefined) {
    return null;
  }

  return (
    <div className="p-3 sm:p-4 bg-blue-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
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
      {!isSubscribed && <NewsletterSubscription />}
    </div>
  );
};
