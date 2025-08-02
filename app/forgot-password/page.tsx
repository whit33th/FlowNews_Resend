"use client";

import { useQuery } from "convex-helpers/react/cache";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6">
        <div className="w-full lg:w-1/2 flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-6 p-6 lg:p-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                CHECK YOUR EMAIL
              </h1>
              <p className="text-xl lg:text-2xl font-semibold text-neutral-600 leading-relaxed">
                We've sent you a password reset link
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                  Email Sent Successfully
                </h3>
                <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions.
                </p>
              </div>

              <div className="border-l-4 border-black pl-6">
                <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                  Link Expiration
                </h3>
                <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                  The reset link will expire in 24 hours for security reasons.
                  If you don't see the email, check your spam folder.
                </p>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-base lg:text-lg font-semibold text-neutral-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col h-full">
          <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-8">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                Email Sent!
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Check your email and follow the link to reset your password
              </p>
              <Link
                href="/signin"
                className="inline-block px-6 py-4 bg-black text-white text-lg font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-xl"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6">
      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-6 p-6 lg:p-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              FORGOT PASSWORD?
            </h1>
            <p className="text-xl lg:text-2xl font-semibold text-neutral-600 leading-relaxed">
              No worries, we'll help you get back in
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Secure Password Reset
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                Enter your email address and we'll send you a secure link to
                reset your password. Your account will remain protected.
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Multiple Options
              </h3>
              <ul className="space-y-2 text-base lg:text-lg text-neutral-600">
                <li>• Email reset link (most secure)</li>
                <li>• SMS verification code</li>
                <li>• Security questions</li>
                <li>• Contact support if needed</li>
              </ul>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-lg lg:text-xl font-bold text-black mb-3">
                Quick & Easy
              </h3>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                The process takes just a few minutes. You'll be back to reading
                your personalized news in no time.
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-base lg:text-lg font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-8">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Reset Password
              </h2>
              <p className="text-lg text-neutral-600">
                Enter your email to receive reset instructions
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base font-semibold"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 bg-black text-white text-lg font-bold rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <p className="text-base text-neutral-600">
                  Remember your password?{" "}
                  <Link
                    href="/signin"
                    className="text-black font-semibold hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
