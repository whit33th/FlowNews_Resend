import { Mail } from "lucide-react";

export const NewsletterSubscription = () => {
  return (
    <div className="border-t border-gray-200 p-3 lg:p-4">
      <div className="flex flex-col gap-3 lg:gap-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 lg:w-5 h-5 lg:h-5 text-neutral-600" />
          <h3 className="text-lg lg:text-lg font-bold text-black">
            Subscribe to Newsletter
          </h3>
        </div>
        <p className="text-base lg:text-base font-semibold text-neutral-600">
          Get the latest news delivered to your inbox
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded text-base lg:text-base font-semibold focus:outline-none focus:border-black"
          />
          <button className="w-full px-3 py-2 bg-black text-white text-base lg:text-base font-semibold hover:bg-neutral-800 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
