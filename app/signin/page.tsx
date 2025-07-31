"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex-helpers/react/cache";
import { Authenticated, Unauthenticated } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loggedInUser = useQuery(api.auth.loggedInUser);

  // Redirect if already authenticated
  useEffect(() => {
    if (loggedInUser !== undefined && loggedInUser !== null) {
      router.push("/");
    }
  }, [loggedInUser, router]);

  // Show loading while checking authentication
  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Don't render if already authenticated
  if (loggedInUser !== null) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.set("email", formData.email);
      formDataObj.set("password", formData.password);
      formDataObj.set("flow", "signIn");

      await signIn("password", formDataObj);
      toast.success("Welcome back!");
    } catch (error: any) {
      let toastTitle = "Failed to sign in";
      if (error.message.includes("Invalid password")) {
        toastTitle = "Invalid email or password. Please try again.";
      } else if (error.message.includes("not found")) {
        toastTitle = "Account not found. Please sign up instead.";
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
      {/* Left Column - Welcome Back Content */}
      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-6 p-6 lg:p-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              WELCOME BACK
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-neutral-600 leading-relaxed">
              Continue your journey with personalized news
            </p>
          </div>

          {/* Features */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Your Personalized Feed
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                Pick up right where you left off with your curated news feed,
                tailored to your interests and reading preferences.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Reading Analytics
              </h3>
              <ul className="space-y-2 text-base lg:text-lg text-neutral-600">
                <li>• Track your reading history and preferences</li>
                <li>• Discover new topics based on your interests</li>
                <li>• Save articles for later reading</li>
                <li>• Get recommendations from our AI</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Stay Updated
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                Never miss important news with our smart notifications and daily
                digest emails.
              </p>
            </div>
          </div>

          {/* Back to home */}
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

      {/* Right Column - Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-8">
          {/* Form Container */}
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Sign In
              </h2>
              <p className="text-lg text-neutral-600">
                Access your personalized news dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
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

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-neutral-600 hover:text-black font-semibold"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 bg-black text-white text-lg font-bold rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                {submitting ? "Signing In..." : "Sign In"}
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-base text-neutral-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-black font-semibold hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-sm text-neutral-500 font-semibold">
                or
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Anonymous Sign In */}
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
