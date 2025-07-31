import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationButtons = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`p-2 border border-gray-300 transition-colors ${
          hasPrev
            ? "hover:bg-gray-50 cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 lg:w-5 h-5 lg:h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`p-2 border border-gray-300 transition-colors ${
          hasNext
            ? "hover:bg-gray-50 cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="w-5 lg:w-5 h-5 lg:h-5" />
      </button>
    </div>
  );
};
