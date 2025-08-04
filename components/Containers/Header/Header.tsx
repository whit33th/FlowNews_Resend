import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderTop } from "./HeaderTop";
import { NewsSlider } from "./NewsSlider";

export default function Header() {
  return (
    <div className="bg-white border-gray-200 text-neutral-600 relative  mx-auto w-full p-3  lg:p-4 space-y-3 lg:space-y-4 z-0 ">
      <HeaderTop />

      <NewsSlider />

      <HeaderNavigation />
    </div>
  );
}
