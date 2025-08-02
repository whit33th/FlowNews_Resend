
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import { ProfileButton } from "./ProfileButton";
import { Authenticated, Unauthenticated } from "convex/react";

export const HeaderActions = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end space-x-4">
      <Authenticated>
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
