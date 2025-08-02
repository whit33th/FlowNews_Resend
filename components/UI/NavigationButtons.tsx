import { PaginationStatus } from "convex/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface NavigationButtonsProps {
  page: number;
  totalPages: number;
  status: PaginationStatus;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPrev: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NavigationButtons = ({
  status,
  onNext,
  onPrev,
  page,
  totalPages,
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className={`p-2 border border-gray-300 transition-colors ${
          page === 0 ? "opacity-50 " : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <ChevronLeft className="w-5 lg:w-5 h-5 lg:h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={page === totalPages - 1}
        className={`p-2 border border-gray-300 transition-colors ${
          page === totalPages - 1
            ? "opacity-50 "
            : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <ChevronRight className="w-5 lg:w-5 h-5 lg:h-5" />
      </button>
    </div>
  );
};
