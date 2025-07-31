import Link from "next/link";

export const PremiumSignupLink = () => {
  return (
    <div className="h-28 lg:h-32 p-3 lg:p-4">
      <Link
        href="/signup"
        className=" w-full h-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
      >
        <span className="text-lg lg:text-lg font-semibold text-center">
          Subscribe to Premium News
        </span>
      </Link>
    </div>
  );
};
