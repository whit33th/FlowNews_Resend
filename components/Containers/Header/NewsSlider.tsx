"use client";

import { usePaginatedQuery } from "convex-helpers/react/cache";
import { api } from "../../../convex/_generated/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import { NewsSliderSkeleton } from "../Skeletons/SkeletonComponents";

export const NewsSlider = () => {
  const latestNews = usePaginatedQuery(
    api.news.getAllNewsPaginated,
    {
      order: "desc",
    },
    {
      initialNumItems: 15,
    }
  );

  if (!latestNews || latestNews.results.length === 0) {
    return <NewsSliderSkeleton />;
  }

  return (
    <div className="border-y-2 border-gray-300  py-0.5">
      <div className="bg-pink-200  px-2 lg:px-0">
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
          {latestNews.results.map((news) => (
            <SwiperSlide key={news._id} className="!w-auto py-2">
              <Link
                href={`/news/${news._id}`}
                className="text-xs lg:text-sm font-semibold  text-black hover:text-neutral-600 transition-colors  whitespace-nowrap"
              >
                {news.title.length > 50
                  ? news.title.substring(0, 50) + "..."
                  : news.title}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

NewsSlider.displayName = "NewsSlider";
