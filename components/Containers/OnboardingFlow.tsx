import { useState } from "react";
import { useMutation } from "convex/react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export const AVAILABLE_TOPICS = [
  "Tech",
  "Finance",
  "Healthcare",
  "Environment",
  "Politics",
  "Science",
  "Sports",
  "Entertainment",
  "Music",
  "Events",
  "Nature",
  "Business",
  "Education",
  "Travel",
  "Food",
];

export function OnboardingFlow() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const createSubscriber = useMutation(api.subscribers.createSubscriber);
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await createSubscriber({ email, topics: selectedTopics });
      toast.success("Welcome to NewsFlow! Your personalized feed is ready.");
    } catch {
      toast.error("Failed to create subscription");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to NewsFlow!
        </h1>
        <p className="text-lg text-gray-600">
          Choose your interests to get personalized news recommendations
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email for daily digest
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={loggedInUser?.email || "Enter your email"}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select your interests:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {AVAILABLE_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicToggle(topic)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTopics.includes(topic)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="font-medium">{topic}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={selectedTopics.length === 0 || !email}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Get Started ({selectedTopics.length} topics selected)
        </button>
      </div>
    </div>
  );
}
