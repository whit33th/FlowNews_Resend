import { BackToNewsButton } from "@/components/UI/BackToNewsButton";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <BackToNewsButton />
          </div>
        </div>
      </div>

      {}
      <div className="flex-1">{children}</div>
    </div>
  );
}
