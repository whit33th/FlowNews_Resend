import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          i <= rating ? "fill-black text-black" : "text-gray-300"
        }`}
      />
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {showValue && (
        <span className="ml-2 text-sm font-semibold text-black">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
