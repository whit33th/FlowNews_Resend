import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { AVAILABLE_TOPICS } from "./OnboardingFlow";

export function ProfileSettings() {
  const subscriber = useQuery(api.subscribers.getSubscriber);
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const updateTopics = useMutation(api.subscribers.updateTopics);

  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    subscriber?.topics || []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  if (!subscriber || !loggedInUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSaveChanges = async () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    setIsUpdating(true);
    try {
      await updateTopics({ topics: selectedTopics });
      toast.success("Preferences updated successfully!");
    } catch {
      toast.error("Failed to update preferences");
    } finally {
      setIsUpdating(false);
    }
  };

  const hasChanges =
    JSON.stringify(selectedTopics.sort()) !==
    JSON.stringify(subscriber.topics.sort());

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Profile Settings
        </h1>

        {/* User Info */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="text-gray-900">
                {loggedInUser.name || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="text-gray-900">{subscriber.email}</p>
            </div>
          </div>
        </div>

        {/* Topic Preferences */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            News Interests
          </h2>
          <p className="text-gray-600 mb-6">
            Select topics you&apos;re interested in to personalize your news
            feed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
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

          {hasChanges && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                You have unsaved changes to your topic preferences.
              </p>
              <button
                onClick={handleSaveChanges}
                disabled={isUpdating || selectedTopics.length === 0}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Current Subscriptions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Subscriptions
          </h2>

          {/* Topics */}
          {subscriber.topics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {subscriber.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hashtags */}
          {subscriber.hashtags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Hashtags
              </h3>
              <div className="flex flex-wrap gap-2">
                {subscriber.hashtags.map((hashtag) => (
                  <span
                    key={hashtag}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                  >
                    #{hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mentions */}
          {subscriber.mentions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Mentions
              </h3>
              <div className="flex flex-wrap gap-2">
                {subscriber.mentions.map((mention) => (
                  <span
                    key={mention}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full"
                  >
                    {mention}
                  </span>
                ))}
              </div>
            </div>
          )}

          {subscriber.topics.length === 0 &&
            subscriber.hashtags.length === 0 &&
            subscriber.mentions.length === 0 && (
              <p className="text-gray-500">No active subscriptions</p>
            )}
        </div>

        {/* Account Status */}
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Account Status
          </h2>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                subscriber.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-700">
              {subscriber.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
