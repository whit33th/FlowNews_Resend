"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex-helpers/react/cache";

import { useState } from "react";
import { toast } from "sonner";

import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loggedInUser = useQuery(api.auth.loggedInUser);

  useEffect(() => {
    if (loggedInUser !== undefined && loggedInUser !== null) {
      router.push("/");
    }
  }, [loggedInUser, router]);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (loggedInUser !== null) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.set("email", formData.email);
      formDataObj.set("password", formData.password);
      formDataObj.set("flow", "signUp");

      await signIn("password", formDataObj);
      toast.success("Account created successfully!");
    } catch (error) {
      let toastTitle = "Failed to create account";
      if (error instanceof Error && error.message.includes("already exists")) {
        toastTitle = "Account already exists. Please sign in instead.";
      }
      toast.error(toastTitle);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6">
      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-6 p-6 lg:p-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              JOIN THE CHRONICLE
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-neutral-600 leading-relaxed">
              Become part of our community of informed readers
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Exclusive Benefits
              </h3>
              <ul className="space-y-2 text-base lg:text-lg text-neutral-600">
                <li>• Personalized news feed based on your interests</li>
                <li>• Daily digest delivered to your inbox</li>
                <li>• Access to premium articles and exclusive text</li>
                <li>• Join discussions with fellow readers</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Stay Informed
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                Get breaking news, in-depth analysis, and stories that matter to
                you. Our AI-powered system learns your preferences to deliver
                the most relevant text.
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base lg:text-lg font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-8">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Create Account
              </h2>
              <p className="text-lg text-neutral-600">
                Start your journey with personalized news
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 bg-black text-white text-lg font-bold rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                {submitting ? "Creating Account..." : "Create Account"}
              </button>

              <div className="text-center">
                <p className="text-base text-neutral-600">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="text-black font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>

            <div className="flex items-center justify-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-sm text-neutral-500 font-semibold">
                or
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <button
              onClick={() => signIn("anonymous")}
              className="w-full px-6 py-4 bg-white text-black text-lg font-bold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
