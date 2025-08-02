"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { User } from "lucide-react";

export const ProfileButton = () => {
  const user = useQuery(api.auth.loggedInUser);

  if (!user) return null;

  return (
    <Link
      href="/profile"
      className="rounded flex items-center bg-white text-secondary border border-gray-200 font-semibold hover:bg-gray-50 hover:text-secondary-hover transition-colors shadow-sm hover:shadow overflow-hidden"
    >
      {user.image ? (
        <img
          src={user.image}
          alt={user.name || "Profile"}
          className="w-8 h-8 object-cover"
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-100">
          <User className="w-5 h-5 text-neutral-600" />
        </div>
      )}
      <span className="px-4 py-2 font-semibold text-neutral-800">Profile</span>
    </Link>
  );
};
