"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Mail, Share2, X } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  newsId: string;
  newsTitle: string;
  isPremium?: boolean;
  canViewPremium?: boolean;
}

export default function ShareButton({
  newsId,
  newsTitle,
  isPremium = false,
  canViewPremium = false,
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const shareNews = useMutation(api.news.shareNewsViaEmail);

  if (isPremium && !canViewPremium) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await shareNews({
        newsId: newsId as Id<"news">,
        recipientEmail: email,
      });

      setMessage("Article shared successfully!");
      setEmail("");
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage("");
      }, 2000);
    } catch {
      setMessage("Failed to share article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 uppercase tracking-wide"
      >
        <Share2 className="w-4 h-4" />
        Share Article
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black max-w-md w-full shadow-2xl">
            <div className="bg-black text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Share Article
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-black mb-4 font-medium">
                Share &quot;<strong>{newsTitle}</strong>&quot; via email
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-black mb-2 uppercase tracking-wide"
                  >
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-gray-600 bg-white text-black font-medium"
                    required
                  />
                </div>

                {message && (
                  <div
                    className={`mb-4 p-3 border-2 text-sm font-medium ${
                      message.includes("successfully")
                        ? "bg-green-50 border-green-600 text-green-800"
                        : "bg-red-50 border-red-600 text-red-800"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-black text-white font-bold border-2 border-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase tracking-wide"
                  >
                    {isLoading ? "Sending..." : "Share"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
