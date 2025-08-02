import { useMemo } from "react";

export const SiteTitle = () => {
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);
  return (
    <div className="flex flex-col justify-center border-y-2 py-3 lg:py-4 text-center space-y-1">
      <h1 className="text-2xl lg:text-4xl font-bold">NEWS FACTORY</h1>
      <div className="text-xs lg:text-sm font-semibold text-neutral-400 font-sans">
        {currentDate}
      </div>
    </div>
  );
};
