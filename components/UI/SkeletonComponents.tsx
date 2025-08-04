import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const skeletonBaseClass = "animate-pulse";
const skeletonHighlightClass =
  "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";

export const CustomSkeleton = ({ className = "", ...props }: any) => (
  <Skeleton
    className={`${skeletonBaseClass} ${skeletonHighlightClass} ${className}`}
    baseColor="#f3f4f6"
    highlightColor="#e5e7eb"
    duration={1.5}
    {...props}
  />
);

export const MainArticleSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col h-full  border-x border-gray-200 ">
      <CustomSkeleton className="w-full h-auto aspect-video max-h-[300px] lg:max-h-[200px] 2xl:max-h-[500px] flex-shrink-0 mb-4" />

      <div className=" h-full w-full p-4 min-h-0 overflow-hidden flex flex-col gap-2">
        {Array.from({ length: 14 }).map((_, idx) => (
          <CustomSkeleton
            key={idx}
            height={20}
            width={`${90 + 8 * Math.sin(idx * 1.2)}%`}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between p-4 lg:items-center pt-4 border-t border-gray-200 mt-4 gap-3 lg:gap-0 flex-shrink-0">
        <div className="flex items-center gap-3">
          <CustomSkeleton circle width={40} height={40} />
          <div className="flex flex-col gap-1">
            <CustomSkeleton width={120} height={16} />
            <CustomSkeleton width={80} height={14} />
          </div>
        </div>
        <div className="flex gap-2">
          <CustomSkeleton width={40} height={40} />
          <CustomSkeleton width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export const SideArticleSkeleton = () => {
  return (
    <div className="flex-1 px-2 pb-4 sm:px-3 lg:px-3 xl:px-4 flex flex-col gap-3 sm:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      {[1, 2].map((idx) => (
        <div
          key={idx}
          className="flex-1 flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4 min-h-0 overflow-hidden"
        >
          <div
            className={`flex gap-2 sm:gap-3 lg:gap-3 xl:gap-4 flex-shrink-0 ${
              idx === 2 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-20 sm:w-24 md:w-28 lg:w-24 xl:w-28 h-full flex-shrink-0 relative hidden lg:block">
              <CustomSkeleton height="100%" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <CustomSkeleton key={idx} height={18} width="100%" />
              ))}
            </div>
          </div>

          <div className=" h-full min-h-0 overflow-hidden">
            <CustomSkeleton height="100%" width="100%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ArticleListSkeleton = () => {
  return (
    <div className="flex-1 px-2 sm:px-3 lg:px-3 xl:px-4 lg:overflow-y-auto">
      <ol className="flex flex-col gap-2 sm:gap-3 lg:gap-3 xl:gap-4">
        {Array.from({ length: 15 }).map((_, idx) => (
          <li key={idx} className="transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <CustomSkeleton width="100%" height={16} />
              <CustomSkeleton height={18} width={`${85 - (idx % 3) * 5}%`} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export const NewsletterSubscriptionSkeleton = () => {
  return (
    <div className="p-2 sm:p-3 lg:p-3 xl:p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CustomSkeleton width={20} height={20} />
          <CustomSkeleton width={180} height={24} />
        </div>
        <CustomSkeleton width={280} height={20} />
        <div className="flex flex-col gap-2">
          <CustomSkeleton height={40} />
          <CustomSkeleton height={40} />
        </div>
      </div>
    </div>
  );
};

export const NewsArticleSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <CustomSkeleton width={16} height={16} />
          <CustomSkeleton width={80} height={20} />
        </div>
      </div>

      <div className="mb-8">
        <div className="space-y-3 mb-6">
          <CustomSkeleton height={48} width="95%" />
          <CustomSkeleton height={48} width="88%" />
          <CustomSkeleton height={48} width="75%" />
        </div>

        <div className="flex items-center gap-6 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <CustomSkeleton width={16} height={16} />
            <CustomSkeleton width={120} height={16} />
          </div>
          <div className="flex items-center gap-2">
            <CustomSkeleton width={16} height={16} />
            <CustomSkeleton width={100} height={16} />
          </div>
          <div className="flex items-center gap-2">
            <CustomSkeleton width={16} height={16} />
            <CustomSkeleton width={80} height={16} />
          </div>
          <div className="flex items-center gap-2">
            <CustomSkeleton width={16} height={16} />
            <CustomSkeleton width={100} height={16} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <CustomSkeleton width={80} height={32} />
          <CustomSkeleton width={100} height={32} />
          <CustomSkeleton width={90} height={32} />
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full h-64 lg:h-96">
          <CustomSkeleton height="100%" />
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-4 mb-8">
          <div className="space-y-3">
            <CustomSkeleton height={24} width="100%" />
            <CustomSkeleton height={24} width="98%" />
            <CustomSkeleton height={24} width="95%" />
            <CustomSkeleton height={24} width="92%" />
          </div>
          <div className="space-y-3">
            <CustomSkeleton height={24} width="96%" />
            <CustomSkeleton height={24} width="94%" />
            <CustomSkeleton height={24} width="90%" />
            <CustomSkeleton height={24} width="87%" />
          </div>
          <div className="space-y-3">
            <CustomSkeleton height={24} width="93%" />
            <CustomSkeleton height={24} width="89%" />
            <CustomSkeleton height={24} width="85%" />
            <CustomSkeleton height={24} width="70%" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 mb-8">
          <CustomSkeleton width={100} height={28} className="mb-3" />
          <div className="space-y-2">
            <CustomSkeleton height={20} width="100%" />
            <CustomSkeleton height={20} width="95%" />
            <CustomSkeleton height={20} width="88%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="text-center flex flex-col items-center  p-6 border-b border-gray-200">
                <div className="relative inline-block mb-6">
                  <CustomSkeleton circle width={120} height={120} />
                </div>
                <CustomSkeleton width={200} height={36} className="mb-2" />
                <CustomSkeleton width={150} height={20} />
              </div>

              <div className="p-6 border-b border-gray-200">
                <CustomSkeleton width={80} height={24} className="mb-4" />
                <div className="space-y-2">
                  <CustomSkeleton height={16} width="100%" />
                  <CustomSkeleton height={16} width="95%" />
                  <CustomSkeleton height={16} width="88%" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-0 border-b border-gray-200">
                <div className="text-center p-4 border-r border-gray-200">
                  <CustomSkeleton
                    width={40}
                    height={32}
                    className="mx-auto mb-1"
                  />
                  <CustomSkeleton width={60} height={16} className="mx-auto" />
                </div>
                <div className="text-center p-4">
                  <CustomSkeleton
                    width={80}
                    height={20}
                    className="mx-auto mb-1"
                  />
                  <CustomSkeleton width={60} height={16} className="mx-auto" />
                </div>
              </div>

              <div className="p-6">
                <CustomSkeleton height={48} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <CustomSkeleton width={200} height={32} />
                <CustomSkeleton width={120} height={16} />
              </div>

              <div className="p-6 border-b border-gray-200">
                <CustomSkeleton width={180} height={24} className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <CustomSkeleton key={idx} height={48} />
                  ))}
                </div>
              </div>

              <div className="p-6">
                <CustomSkeleton width={160} height={24} className="mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CustomSkeleton width={16} height={16} />
                    <CustomSkeleton height={16} width="60%" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CustomSkeleton width={16} height={16} />
                    <CustomSkeleton height={16} width="70%" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200  overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <CustomSkeleton width={200} height={24} />
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100">
                        <CustomSkeleton height="100%" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CustomSkeleton
                            width={60}
                            height={24}
                            className="rounded-full"
                          />
                          <CustomSkeleton
                            width={80}
                            height={24}
                            className="rounded-full"
                          />
                        </div>
                        <div className="space-y-2 mb-2">
                          <CustomSkeleton height={16} width="100%" />
                          <CustomSkeleton height={16} width="90%" />
                        </div>
                        <div className="flex items-center justify-between">
                          <CustomSkeleton width={40} height={12} />
                          <CustomSkeleton width={60} height={12} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TopicNewsFeedSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <CustomSkeleton height="100%" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CustomSkeleton width={60} height={24} />
                  <CustomSkeleton width={80} height={24} />
                </div>
                <div className="space-y-2 mb-2">
                  <CustomSkeleton height={16} width="100%" />
                  <CustomSkeleton height={16} width="90%" />
                </div>
                <div className="flex items-center justify-between">
                  <CustomSkeleton width={40} height={12} />
                  <CustomSkeleton width={60} height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const UserNewsFeedSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <CustomSkeleton width={200} height={24} />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <CustomSkeleton height="100%" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CustomSkeleton width={60} height={24} />
                  <CustomSkeleton width={80} height={24} />
                </div>
                <div className="space-y-2 mb-2">
                  <CustomSkeleton height={16} width="100%" />
                  <CustomSkeleton height={16} width="90%" />
                </div>
                <div className="flex items-center justify-between">
                  <CustomSkeleton width={40} height={12} />
                  <CustomSkeleton width={60} height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const UserAchievementsSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CustomSkeleton width={120} height={24} />
          <CustomSkeleton width={100} height={16} />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <CustomSkeleton width={32} height={32} />
                <div className="flex-1">
                  <CustomSkeleton height={16} className="mb-2" />
                  <CustomSkeleton height={12} width="80%" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <CustomSkeleton width={150} height={20} className="mb-2" />
          <div className="space-y-2">
            <CustomSkeleton height={14} width="100%" />
            <CustomSkeleton height={14} width="95%" />
            <CustomSkeleton height={14} width="90%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReadingHistorySkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CustomSkeleton width={180} height={24} />
          <CustomSkeleton width={100} height={16} />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CustomSkeleton width="33%" height={16} className="mb-2" />
                  <div className="space-y-2 mb-2">
                    <CustomSkeleton height={20} width="100%" />
                    <CustomSkeleton height={20} width="90%" />
                  </div>
                  <CustomSkeleton width="50%" height={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <CustomSkeleton width={140} height={20} className="mb-2" />
          <div className="space-y-2">
            <CustomSkeleton height={14} width="100%" />
            <CustomSkeleton height={14} width="95%" />
            <CustomSkeleton height={14} width="90%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserStatsSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <CustomSkeleton width={160} height={24} />
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="text-center p-4 bg-gray-50 border border-gray-200"
            >
              <CustomSkeleton width={24} height={24} className="mx-auto mb-2" />
              <CustomSkeleton width={40} height={32} className="mx-auto mb-2" />
              <CustomSkeleton width={80} height={16} className="mx-auto" />
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <CustomSkeleton width={140} height={20} className="mb-2" />
          <div className="space-y-2">
            <CustomSkeleton height={14} width="100%" />
            <CustomSkeleton height={14} width="95%" />
            <CustomSkeleton height={14} width="90%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsSliderSkeleton = () => {
  return (
    <div className="border-y-2 border-gray-300 py-0.5">
      <div className="bg-pink-200 px-2 lg:px-0">
        <div className="flex gap-5 py-2.5 overflow-hidden">
          {Array.from({ length: 8 }).map((_, idx) => (
            <CustomSkeleton
              className="text-pink-300 bg-pink-300"
              key={idx}
              width={200}
              height={16}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100dvh-256px)] gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6 overflow-hidden">
      <div className="w-full lg:flex-1 flex flex-col h-full min-w-0">
        <SideArticleSkeleton />
      </div>

      <div className="flex-1 min-w-0">
        <MainArticleSkeleton />
      </div>

      <div className="w-full lg:flex-1 flex flex-col h-full min-w-0 px-2 sm:px-3 lg:px-3 xl:px-4 space-y-4">
        <div className="p-3 sm:p-4 bg-blue-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <div className="flex flex-col gap-2">
            <CustomSkeleton width={200} height={24} />
            <CustomSkeleton width={300} height={20} />
          </div>
        </div>
        <ArticleListSkeleton />
        <NewsletterSubscriptionSkeleton />
      </div>
    </div>
  );
};

export const NavigationMenuSkeleton = () => {
  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {Array.from({ length: 10 }).map((_, idx) => (
        <CustomSkeleton key={idx} width={80} height={20} />
      ))}
    </div>
  );
};

export const HeaderNavigationButtonsSkeleton = () => {
  return (
    <div className="flex items-center gap-4 lg:gap-6">
      {Array.from({ length: 8 }).map((_, idx) => (
        <CustomSkeleton key={idx} width={80} height={33.3} />
      ))}
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CustomSkeleton width={120} height={32} />
            <div className="hidden md:block">
              <CustomSkeleton width={200} height={16} />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <NavigationMenuSkeleton />
          </div>

          <div className="flex items-center gap-3">
            <CustomSkeleton circle width={32} height={32} />
            <CustomSkeleton width={80} height={32} />
            <CustomSkeleton width={80} height={32} />
          </div>
        </div>
      </div>
    </header>
  );
};

export const AuthFormSkeleton = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200">
      <div className="text-center mb-6">
        <CustomSkeleton width={200} height={32} className="mx-auto mb-2" />
        <CustomSkeleton width={150} height={16} className="mx-auto" />
      </div>

      <div className="space-y-4">
        <div>
          <CustomSkeleton width={80} height={16} className="mb-2" />
          <CustomSkeleton height={40} />
        </div>

        <div>
          <CustomSkeleton width={80} height={16} className="mb-2" />
          <CustomSkeleton height={40} />
        </div>

        <div>
          <CustomSkeleton width={80} height={16} className="mb-2" />
          <CustomSkeleton height={40} />
        </div>

        <CustomSkeleton height={48} />

        <div className="text-center">
          <CustomSkeleton width={200} height={16} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export const CommentsSkeleton = () => {
  return (
    <div className="space-y-4">
      <CustomSkeleton width={120} height={24} />

      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <CustomSkeleton circle width={40} height={40} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CustomSkeleton width={100} height={16} />
                <CustomSkeleton width={80} height={12} />
              </div>
              <div className="space-y-2">
                <CustomSkeleton height={16} width="100%" />
                <CustomSkeleton height={16} width="95%" />
                <CustomSkeleton height={16} width="80%" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <CustomSkeleton width={16} height={16} />
        <CustomSkeleton height={40} width="100%" />
        <CustomSkeleton width={80} height={40} />
      </div>
    </div>
  );
};

export const PaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <CustomSkeleton width={40} height={40} />
      <CustomSkeleton width={40} height={40} />
      <CustomSkeleton width={40} height={40} />
      <CustomSkeleton width={40} height={40} />
      <CustomSkeleton width={40} height={40} />
    </div>
  );
};

export const ModalSkeleton = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <CustomSkeleton width={150} height={24} />
          <CustomSkeleton width={24} height={24} />
        </div>

        <div className="space-y-4">
          <CustomSkeleton height={16} width="100%" />
          <CustomSkeleton height={16} width="95%" />
          <CustomSkeleton height={16} width="90%" />
        </div>

        <div className="flex gap-3 mt-6">
          <CustomSkeleton height={40} width="50%" />
          <CustomSkeleton height={40} width="50%" />
        </div>
      </div>
    </div>
  );
};

export const NotificationsSkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-3 border border-gray-200"
        >
          <CustomSkeleton circle width={32} height={32} />
          <div className="flex-1">
            <CustomSkeleton height={16} width="80%" />
            <CustomSkeleton height={12} width="60%" />
          </div>
          <CustomSkeleton width={60} height={12} />
        </div>
      ))}
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-6">
        <div className="text-center">
          <CustomSkeleton
            circle
            width={80}
            height={80}
            className="mx-auto mb-3"
          />
          <CustomSkeleton width={120} height={20} className="mx-auto mb-1" />
          <CustomSkeleton width={100} height={16} className="mx-auto" />
        </div>

        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2">
              <CustomSkeleton width={20} height={20} />
              <CustomSkeleton width={100} height={16} />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <CustomSkeleton width={80} height={20} className="mb-3" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex justify-between">
                <CustomSkeleton width={60} height={16} />
                <CustomSkeleton width={40} height={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ArticleCardSkeleton = () => {
  return (
    <div className="border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-100">
        <CustomSkeleton height="100%" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <CustomSkeleton width={60} height={24} />
          <CustomSkeleton width={80} height={24} />
        </div>
        <div className="space-y-2 mb-3">
          <CustomSkeleton height={20} width="100%" />
          <CustomSkeleton height={20} width="90%" />
          <CustomSkeleton height={20} width="75%" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CustomSkeleton circle width={24} height={24} />
            <CustomSkeleton width={60} height={16} />
          </div>
          <CustomSkeleton width={80} height={16} />
        </div>
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="border border-gray-200  overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <CustomSkeleton width={150} height={24} />
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <CustomSkeleton height={16} width="100%" />
              <CustomSkeleton height={16} width="90%" />
              <CustomSkeleton height={16} width="80%" />
              <CustomSkeleton height={16} width="70%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <div className="border border-gray-200   p-4">
      <CustomSkeleton width={150} height={24} className="mb-4" />
      <div className="h-64 bg-gray-50  flex items-end justify-between p-4">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <CustomSkeleton
              width={20}
              height={`${Math.random() * 100 + 50}%`}
              className="bg-blue-200"
            />
            <CustomSkeleton width={30} height={12} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImageUploadSkeleton = () => {
  return (
    <div className="border-2 border-dashed border-gray-300   p-6 text-center">
      <CustomSkeleton circle width={64} height={64} className="mx-auto mb-4" />
      <CustomSkeleton width={200} height={20} className="mx-auto mb-2" />
      <CustomSkeleton width={150} height={16} className="mx-auto" />
    </div>
  );
};

export const RatingSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <CustomSkeleton key={idx} width={20} height={20} />
      ))}
      <CustomSkeleton width={60} height={16} />
    </div>
  );
};

export const ProgressBarSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <CustomSkeleton width={80} height={16} />
        <CustomSkeleton width={40} height={16} />
      </div>
      <div className="w-full bg-gray-200 h-2">
        <CustomSkeleton height="100%" width="60%" />
      </div>
    </div>
  );
};
