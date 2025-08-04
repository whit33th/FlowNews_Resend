import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProfileButton } from "./ProfileButton";
import { SignOutButton } from "./SignOutButton";

export const HeaderActions = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end space-x-4">
      <Authenticated>
        <Link
          href="/create-news"
          className="pr-3 pl-2 py-2 rounded text-nowrap bg-black text-white font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Article</span>
          <span className="sm:hidden">Create</span>
        </Link>
        <ProfileButton />
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
