import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Article - FlowNews",
  description: "Read the full news article on FlowNews",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
