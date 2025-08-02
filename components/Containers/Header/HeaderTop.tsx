
import { SiteTitle } from "../../UI/SiteTitle";
import { ContactInfo } from "../../UI/ContactInfo";


export const HeaderTop = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center  gap-4">
      <div className="flex justify-center lg:justify-start gap-3">
        <div className="flex flex-col justify-center ">
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
      </div>

      <SiteTitle />

      <ContactInfo />
    </div>
  );
};
