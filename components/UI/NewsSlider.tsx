"use client";

import { useQuery } from "convex-helpers/react/cache";
import { api } from "../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { memo } from "react";
import "swiper/css";

export const NewsSlider = memo(() => {
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