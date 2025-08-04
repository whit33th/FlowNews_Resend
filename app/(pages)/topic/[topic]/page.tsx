import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { SubscriptionBanner } from "@/components/UI/SubscriptionBanner";
import { TopicNewsFeed } from "@/components/Containers/TopicNewsFeed";

interface TopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  return (
    <div className="mb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-black" />
              <h1 className="text-4xl font-bold text-black">
                {topic.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>

        <SubscriptionBanner />

        <TopicNewsFeed topic={topic} />
      </div>
    </div>
  );
}
