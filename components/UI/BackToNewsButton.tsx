"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BackToNewsButtonProps {
  className?: string;
}

export function BackToNewsButton({ className = "" }: BackToNewsButtonProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-neutral-600 hover:text-black transition-colors ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-lg font-semibold">Back to News</span>
    </Link>
  );
}
