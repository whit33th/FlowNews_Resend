import Image from "next/image";

interface AuthorInfoProps {
  source?: string;
  publishedAt: number;
  authorImage?: string;
}

export const AuthorInfo = ({
  source = "News Source",
  publishedAt,
  authorImage = "/image.png",
}: AuthorInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full overflow-hidden">
        <Image
          src={authorImage}
          alt="Author"
          width={48}
          height={48}
          className="object-cover w-full h-full grayscale"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg lg:text-lg font-semibold text-black">
          {source}
        </span>
        <span className="text-base lg:text-base font-semibold text-neutral-500">
          {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
