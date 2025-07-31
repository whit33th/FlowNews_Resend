import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  isPremium?: boolean;
  isAuthenticated?: boolean;
  premiumLabel?: string;
}

export const ArticleImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  isPremium = false,
  isAuthenticated = true,
  premiumLabel = "PREMIUM",
}: ArticleImageProps) => {
  const shouldBlur = !isAuthenticated && isPremium;

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover w-full h-full grayscale ${className} ${
          shouldBlur ? "blur-sm" : ""
        }`}
      />
      {shouldBlur && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-xs font-bold">{premiumLabel}</span>
        </div>
      )}
    </div>
  );
};
