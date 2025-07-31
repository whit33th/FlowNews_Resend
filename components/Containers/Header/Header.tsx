"use client";

import { SignOutButton } from "@/components/UI/SignOutButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { ReactNode, useEffect, useState, useMemo, memo } from "react";
import Logo from "./Logo";
import { LucidePhoneCall, Mailbox, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Memoized news slider component
const NewsSlider = memo(() => {
  const latestNews = useQuery(api.news.getNewsFeed, { limit: 15 });

  if (!latestNews || latestNews.news.length === 0) {
    return (
      <div className="flex justify-center">
        <span className="text-xs lg:text-sm font-semibold text-black">
          Loading latest news...
        </span>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView="auto"
      spaceBetween={20}
      className="latest-news-swiper"
    >
      {latestNews.news.map((news) => (
        <SwiperSlide key={news._id} className="!w-auto">
          <Link
            href={`/news/${news._id}`}
            className="text-xs lg:text-sm font-semibold text-black hover:text-neutral-600 transition-colors whitespace-nowrap"
          >
            {news.title.length > 50
              ? news.title.substring(0, 50) + "..."
              : news.title}
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

NewsSlider.displayName = "NewsSlider";

export default function Header() {
  const allTags = useQuery(api.news.getAllTags);

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(
    () => [
      { label: "LATEST", href: "#" },
      { label: "FEATURED", href: "#" },
      ...(allTags || []).map((tag) => ({
        label: tag.toUpperCase(),
        href: `#${tag}`,
      })),
    ],
    [allTags]
  );

  // Memoize the current date to prevent unnecessary re-renders
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <div className="bg-white border-gray-200 text-neutral-600">
      <div className="mx-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
        {/* Top header with logo and date */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center py-2 gap-4">
          {/* Left section */}
          <div className="flex justify-center lg:justify-start">
            <Logo />
          </div>

          {/* Center section - always centered */}
          <div className="flex justify-center border-y-2 py-3 lg:py-4">
            <div className="text-center space-y-1">
              <h1 className="text-2xl lg:text-4xl font-bold">NEWS FACTORY</h1>
              <div className="text-xs lg:text-sm font-semibold text-neutral-400 font-sans">
                {currentDate}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col text-sm lg:text-base items-center lg:items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mailbox className="w-4 lg:w-5 h-4 lg:h-5" />
                <p className="font-semibold">mail@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <LucidePhoneCall className="w-4 lg:w-5 h-4 lg:h-5" />
                <p className="font-semibold">+48 123 456 789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest News Slider */}
        <div className="border-y-2 border-gray-300 py-0.5">
          <div className="bg-pink-200 py-2 px-2 lg:px-0">
            <NewsSlider />
          </div>
        </div>

        {/* Main navigation */}
        <div className="mt-3 lg:mt-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
            <div className="flex items-center justify-center lg:justify-start space-x-3 lg:space-x-6 text-sm lg:text-lg">
              {/* <button className="p-1">
                  <Menu className="w-4 lg:w-5 h-4 lg:h-5" />
                </button> */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-6">
                {navigationItems.map((item, idx) => (
                  <Link
                    key={item.label + idx}
                    href={item.href}
                    className="text-sm lg:text-base font-semibold text-neutral-500 hover:text-neutral-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end space-x-4">
              <button className="p-1">
                <Search className="w-4 lg:w-5 h-4 lg:h-5" />
              </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
