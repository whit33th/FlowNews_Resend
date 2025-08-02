import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  isPremium?: boolean;
  isSubscribed?: boolean;
  premiumLabel?: string;
}

export const ArticleImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  isPremium,
  isSubscribed,
  premiumLabel = "PREMIUM",
}: ArticleImageProps) => {
  const shouldBlur = !isSubscribed && isPremium;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover w-full h-full grayscale shadow-md  `}
      />
      {shouldBlur && (
        <div className="absolute inset-0 flex items-center backdrop-blur-sm justify-center bg-black bg-opacity-50">
          <span className="text-white text-xs sm:text-sm font-bold">
            {premiumLabel}
          </span>
        </div>
      )}
    </div>
  );
};
