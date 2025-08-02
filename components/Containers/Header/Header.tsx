import { NewsSlider } from "../../UI/NewsSlider";
import { HeaderNavigation } from "../HeaderNavigation";
import { HeaderTop } from "../HeaderTop";

export default function Header() {
  return (
    <div className="bg-white border-gray-200 text-neutral-600">
      <div className="mx-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
        <HeaderTop />

        <div className="border-y-2 border-gray-300 py-0.5">
          <div className="bg-pink-200  px-2 lg:px-0">
            <NewsSlider />
          </div>
        </div>

        <HeaderNavigation />
      </div>
    </div>
  );
}
