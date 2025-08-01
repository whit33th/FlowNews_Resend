import Link from "next/link";

export const PremiumSignupLink = () => {
  return (
    <div className="h-24 sm:h-28 md:h-28 lg:h-28 xl:h-32 p-2 sm:p-3 lg:p-3 xl:p-4">
      <Link
        href="/signup"
        className="w-full h-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
      >
        <span className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-semibold text-center">
          Subscribe to Premium News
        </span>
      </Link>
    </div>
  );
};
