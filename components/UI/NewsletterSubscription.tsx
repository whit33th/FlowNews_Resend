import { Mail } from "lucide-react";

export const NewsletterSubscription = () => {
  return (
    <div className="border-t border-gray-200 p-2 sm:p-3 lg:p-3 xl:p-4">
      <div className="flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 sm:w-5 lg:w-4 xl:w-5 h-4 sm:h-5 lg:h-4 xl:h-5 text-neutral-600" />
          <h3 className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-black">
            Subscribe to Newsletter
          </h3>
        </div>
        <p className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold text-neutral-600">
          Get the latest news delivered to your inbox
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded text-sm sm:text-base lg:text-sm xl:text-base font-semibold focus:outline-none focus:border-black"
          />
          <button className="w-full px-2 sm:px-3 py-2 bg-black text-white text-sm sm:text-base lg:text-sm xl:text-base font-semibold hover:bg-neutral-800 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
