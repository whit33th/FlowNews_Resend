import { Newspaper } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-neutral-200 select-none">
            404
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 max-w-md mx-auto leading-relaxed">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            <Newspaper className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
