"use client";

import { ImageUpload } from "@/components/UI/ImageUpload";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SingleTopic, Topics, topics } from "@/convex/schema";
import { useQuery } from "convex-helpers/react/cache";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  FileText,
  Image as ImageIcon,
  Save,
  Star,
  Tag,
  Type,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateNewsPage() {
  const router = useRouter();
  const user = useQuery(api.auth.loggedInUser);
  const createNews = useMutation(api.news.createNews);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    summary: "",
    selectedTopics: [] as Topics[number][],
    mentions: [] as string[],
    isPremium: false,
    imageStorageId: null as string | null,
  });

  const [mentionInput, setMentionInput] = useState("");

  const handleTopicToggle = (topic: SingleTopic) => {
    setFormData((prev) => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter((t) => t !== topic)
        : [...prev.selectedTopics, topic],
    }));
  };

  const handleAddMention = () => {
    if (
      mentionInput.trim() &&
      !formData.mentions.includes(mentionInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        mentions: [...prev.mentions, mentionInput.trim()],
      }));
      setMentionInput("");
    }
  };

  const handleRemoveMention = (mention: string) => {
    setFormData((prev) => ({
      ...prev,
      mentions: prev.mentions.filter((m) => m !== mention),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create news");
      return;
    }

    if (!formData.title.trim() || !formData.text.trim()) {
      toast.error("Title and text are required");
      return;
    }

    if (formData.selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }

    setIsSubmitting(true);

    try {
      const newsId = await createNews({
        title: formData.title.trim(),
        text: formData.text.trim(),
        summary: formData.summary.trim() || undefined,
        topics: formData.selectedTopics,
        mentions: formData.mentions.length > 0 ? formData.mentions : undefined,
        isPremium: formData.isPremium,
        image: formData.imageStorageId as Id<"_storage"> | undefined,
        views: 0,
        author: user._id,
        authorImage: user.image as Id<"_storage"> | string | undefined,
        averageRating: 0,
        totalRatings: 0,
      });

      toast.success("News article created successfully!");
      router.push(`/news/${newsId}`);
    } catch (error) {
      console.error("Failed to create news:", error);
      toast.error("Failed to create news article");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className=" max-w-6xl mx-auto p-6 lg:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Access Denied</h1>
          <p className="text-neutral-600">
            You must be logged in to create news articles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-8">
      {}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="border-l-4 border-black pl-6">
          <h1 className="text-4xl font-bold text-black mb-2">
            Create News Article
          </h1>
          <p className="text-neutral-600 text-lg">
            Share your story with the world
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2 space-y-6">
            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Article Title
                </h3>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter a compelling title..."
                  className="w-full p-4 border border-gray-200 focus:outline-none focus:border-black transition-colors text-lg"
                  maxLength={200}
                />
                <div className="text-sm text-neutral-500 mt-2">
                  {formData.title.length}/200 characters
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Featured Image
                </h3>
                <ImageUpload
                  currentImage={undefined}
                  onImageUpdate={(storageId) => {
                    setFormData((prev) => ({
                      ...prev,
                      imageStorageId: storageId,
                    }));
                  }}
                  size="large"
                  isEditing={true}
                />
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Article Content
                </h3>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder="Write your article content here..."
                  className="w-full p-4 border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
                  rows={20}
                />
                <div className="text-sm text-neutral-500 mt-2">
                  {formData.text.length} characters
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Summary (Optional)
                </h3>
                <textarea
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Brief summary of your article..."
                  className="w-full p-4 border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
                  rows={4}
                  maxLength={500}
                />
                <div className="text-sm text-neutral-500 mt-2">
                  {formData.summary.length}/500 characters
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-6">
            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Author
                </h3>
                <div className="flex items-center gap-3">
                  {user.image && (
                    <Image
                      width={200}
                      height={200}
                      src={user.image}
                      alt={user.name || "Author"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-black">
                      {user.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-neutral-600">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Topics
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleTopicToggle(topic)}
                      className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                        formData.selectedTopics.includes(topic)
                          ? "bg-black text-white"
                          : "bg-gray-100 text-black hover:bg-gray-200"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                {formData.selectedTopics.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-neutral-600 mb-2">
                      Selected topics:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedTopics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-black text-white text-xs rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Mentions
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mentionInput}
                      onChange={(e) => setMentionInput(e.target.value)}
                      placeholder="@username or #hashtag"
                      className="flex-1 px-3 py-2 border border-gray-200 focus:outline-none focus:border-black transition-colors text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddMention();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddMention}
                      className="px-4 py-2 bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.mentions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.mentions.map((mention, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-black text-sm rounded"
                        >
                          {mention}
                          <button
                            type="button"
                            onClick={() => handleRemoveMention(mention)}
                            className="text-neutral-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {}
            <div className="bg-white border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Access Level
                </h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPremium}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isPremium: e.target.checked,
                      }))
                    }
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-semibold text-black">Premium Article</p>
                    <p className="text-sm text-neutral-600">
                      Restrict to premium subscribers
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-black text-white font-bold text-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Publish Article
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
