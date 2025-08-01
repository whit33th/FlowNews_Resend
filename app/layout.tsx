import type { Metadata } from "next";
import { Yrsa } from "next/font/google";
import "./globals.css";
import { Convex } from "../components/layouts/ContextProvider/ConvexPovider";
import Header from "@/components/Containers/Header/Header";

const yrsa = Yrsa({
  variable: "--font-yrsa",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "NewsFlow - Personalized News Feed",
  description: "Get personalized news feeds based on your interests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${yrsa.variable} antialiased  bg-[#FFFFFF] h-dvh flex flex-col `}
      >
        <Convex>
          <Header />
          <main className="flex-1  ">{children}</main>
        </Convex>
      </body>
    </html>
  );
}
