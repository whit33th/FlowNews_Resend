"use client";

import { UserNewsFeed } from "@/components/Containers/UserNewsFeed";
import { ImageUpload } from "@/components/UI/ImageUpload";
import { ReadingHistory } from "@/components/UI/ReadingHistory";
import { ProfileSkeleton } from "@/components/UI/SkeletonComponents";
import { UserAchievements } from "@/components/UI/UserAchievements";
import { UserStats } from "@/components/UI/UserStats";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { topics } from "@/convex/schema";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex-helpers/react/cache";
import { useMutation } from "convex/react";
import {
  BookOpen,
  Calendar,
  Edit3,
  Mail,
  Plus,
  Save,
  Settings,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTopics, setEditingTopics] = useState<string[]>([]);
  const [editingBio, setEditingBio] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingImageStorageId, setEditingImageStorageId] = useState<
    string | null
  >(null);
  const [resetImageTrigger, setResetImageTrigger] = useState(0);

  const user = useQuery(api.auth.loggedInUser);
  const patchUser = useMutation(api.users.patchUser);
  const updateUserImage = useMutation(api.users.updateUserImage);

  useEffect(() => {
    if (user) {
      setEditingTopics(user.topics || []);
      setEditingBio(user.bio || "");
      setEditingName(user.name || "");
    }
  }, [user]);

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
  }, [user, router]);

  if (user === undefined) {
    return <ProfileSkeleton />;
  }

  if (user === null) {
    return null;
  }

  const handleSaveProfile = async () => {
    try {
      if (editingImageStorageId) {
        await updateUserImage({
          storageId: editingImageStorageId as Id<"_storage">,
        });
      }

      await patchUser({
        name: editingName,
        bio: editingBio,
        topics: editingTopics,
      });

      setIsEditing(false);
      setEditingImageStorageId(null);
      setResetImageTrigger((prev) => prev + 1);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleAddTopic = (topic: string) => {
    if (!editingTopics.includes(topic)) {
      setEditingTopics([...editingTopics, topic]);
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setEditingTopics(editingTopics.filter((t) => t !== topic));
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200">
            {}
            <div className="text-center p-6 border-b border-gray-200">
              <div className="relative inline-block mb-6">
                <ImageUpload
                  currentImage={user.image}
                  onImageUpdate={(storageId) => {
                    setEditingImageStorageId(storageId);
                  }}
                  size="large"
                  isEditing={isEditing}
                  resetTrigger={resetImageTrigger}
                />
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="text-3xl font-bold text-black text-center bg-transparent border-b-2 border-black focus:outline-none mb-2"
                  placeholder="Enter your name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-black mb-2">
                  {user.name || "User"}
                </h1>
              )}

              <p className="text-neutral-600 font-semibold">
                {user.email || "No email provided"}
              </p>
            </div>

            {}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                About
              </h3>
              {isEditing ? (
                <textarea
                  value={editingBio}
                  onChange={(e) => setEditingBio(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none resize-none"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-neutral-600 leading-relaxed">
                  {user.bio || "No bio provided. Click edit to add your story."}
                </p>
              )}
            </div>

            {}
            <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
              <div className="text-center p-4 border-r border-gray-200">
                <div className="text-3xl font-bold text-black">
                  {user.topics?.length || 0}
                </div>
                <div className="text-sm text-neutral-600">Topics</div>
              </div>
              <div className="text-center p-4">
                <div className="text-lg font-bold text-black">
                  {user.isAnonymous ? "Guest" : "Member"}
                </div>
                <div className="text-sm text-neutral-600">Status</div>
              </div>
            </div>

            {}
            <div className="p-6">
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveProfile}
                    type="submit"
                    className="flex-1 px-6 py-3 bg-black text-white font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingTopics(user.topics || []);
                      setEditingBio(user.bio || "");
                      setEditingName(user.name || "");
                      setEditingImageStorageId(null);
                      setResetImageTrigger((prev) => prev + 1);
                    }}
                    className="px-6 py-3 bg-black text-white font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-6 py-3 bg-black text-white font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                <Settings className="w-6 h-6" />
                My News Topics
              </h2>
              <div className="text-sm text-neutral-600">
                {editingTopics.length} of {topics.length} topics selected
              </div>
            </div>

            {}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">
                Your Selected Topics
              </h3>
              {editingTopics.length === 0 ? (
                <div className="text-center py-8 text-neutral-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>
                    No topics selected yet. Choose topics below to personalize
                    your news feed.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {editingTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200"
                    >
                      <span className="text-sm font-semibold text-black">
                        {topic}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveTopic(topic)}
                          className="text-gray-600 hover:text-black transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {}
            {isEditing && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4">
                  Available Topics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {topics
                    .filter((topic) => !editingTopics.includes(topic))
                    .map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleAddTopic(topic)}
                        className="flex items-center justify-center p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
                      >
                        <Plus className="w-4 h-4 mr-2 text-gray-400 group-hover:text-black" />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-black">
                          {topic}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {}
            <div className="p-6">
              <h3 className="text-xl font-bold text-black mb-4">
                Reading Preferences
              </h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Daily digest emails:{" "}
                    {user.topics?.length ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>
                    Email notifications: {user.email ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {}
          <UserNewsFeed userTopics={user.topics || []} />

          {}
          <UserStats userTopics={user.topics || []} />

          {}
          <UserAchievements />

          {}
          <ReadingHistory />
        </div>
      </div>
    </div>
  );
}
