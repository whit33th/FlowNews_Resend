import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Article - NewsFlow",
  description: "Read the full news article on NewsFlow",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 