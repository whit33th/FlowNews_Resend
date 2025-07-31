import React from "react";
import Link from "next/link";

export const Logo = () => {
  const SVGLogo = (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Circle background */}
      <circle cx="28" cy="28" r="28" fill="#1f2937" />

      {/* Newspaper icon */}
      <g transform="translate(12, 12)">
        {/* Main newspaper body */}
        <rect
          x="4"
          y="4"
          width="24"
          height="32"
          rx="2"
          fill="#f3f4f6"
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Folded corner */}
        <path
          d="M 24 4 L 28 8 L 24 12 Z"
          fill="#d1d5db"
          stroke="#374151"
          strokeWidth="1"
        />

        {/* Headlines */}
        <rect x="8" y="8" width="12" height="2" fill="#374151" />
        <rect x="8" y="12" width="8" height="1" fill="#6b7280" />
        <rect x="8" y="14" width="10" height="1" fill="#6b7280" />

        {/* Article content */}
        <rect x="8" y="18" width="14" height="1" fill="#9ca3af" />
        <rect x="8" y="20" width="12" height="1" fill="#9ca3af" />
        <rect x="8" y="22" width="13" height="1" fill="#9ca3af" />
        <rect x="8" y="24" width="11" height="1" fill="#9ca3af" />

        {/* Second column */}
        <rect x="8" y="28" width="10" height="1" fill="#9ca3af" />
        <rect x="8" y="30" width="12" height="1" fill="#9ca3af" />
        <rect x="8" y="32" width="9" height="1" fill="#9ca3af" />
      </g>
    </svg>
  );

  return (
    <Link
      href="/"
      className="flex items-center space-x-3 select-none hover:opacity-80 transition-opacity"
    >
      <div className="lg:w-24 lg:h-24 w-12 h-12 flex-shrink-0">{SVGLogo}</div>

      <div className="flex flex-col">
        <span className="text-sm lg:text-base font-bold text-neutral-800">
          THE DAILY CHRONICLE
        </span>
        <span className="text-xs lg:text-sm font-semibold text-neutral-600">
          STORIES • INSIGHT • CONNECTION
        </span>
        <span className="text-xs text-neutral-500">
          Poznan • Wroclaw • Gdansk
        </span>
      </div>
    </Link>
  );
}; 