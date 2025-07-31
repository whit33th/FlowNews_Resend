import { Search } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import { Authenticated, Unauthenticated } from "convex/react";

export const HeaderActions = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end space-x-4">
      {/* <button className="p-1">
        <Search className="w-4 lg:w-5 h-4 lg:h-5" />
      </button> */}
      <Authenticated>
        <SignOutButton />
      </Authenticated>
      <Unauthenticated>
        <Link
          href="/signin"
          className="px-4 py-2 rounded text-nowrap bg-black text-white font-semibold hover:bg-neutral-800 transition-colors"
        >
          Sign in
        </Link>
      </Unauthenticated>
    </div>
  );
};
