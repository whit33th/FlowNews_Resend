import { SingleTopic, Topics, topics } from "@/convex/schema";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";

export function OnboardingFlow() {
  const [selectedTopics, setSelectedTopics] = useState<Topics>([]);
  const patchUser = useMutation(api.users.patchUser);

  const handleTopicToggle = (topic: SingleTopic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleOnboarding = async (isSkip: boolean = false) => {
    if (!isSkip) {
      if (selectedTopics.length === 0) {
        toast.error("Please select at least one topic");
        return;
      }
    }

    try {
      await patchUser({ onboarded: true, topics: selectedTopics });

      toast.success("Welcome to FlowNews! Your personalized feed is ready.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create subscription");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full justify-center items-center gap-4 lg:gap-6 p-4">
      <div className="max-w-md mx-auto w-full text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
          Welcome to FlowNews!
        </h2>
        <p className="text-lg text-neutral-600">
          Choose your interests to get personalized news recommendations
        </p>
      </div>

      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-neutral-700">
            Select your interests:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicToggle(topic)}
                className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                  selectedTopics.includes(topic)
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-gray-400 text-neutral-700 hover:bg-gray-50"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleOnboarding(false)}
          disabled={selectedTopics.length === 0}
          className="w-full px-6 py-3 bg-black text-white text-lg font-bold rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>

        <button
          onClick={() => handleOnboarding(true)}
          className="w-full px-6 py-3 bg-white text-black text-lg font-bold rounded-lg border-2 border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
