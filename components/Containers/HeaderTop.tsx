import { Logo } from "../UI/Logo";
import { SiteTitle } from "../UI/SiteTitle";
import { ContactInfo } from "../UI/ContactInfo";

export const HeaderTop = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center py-2 gap-4">
      {/* Left section */}
      <div className="flex justify-center lg:justify-start">
        <Logo />
      </div>

      {/* Center section - always centered */}
      <SiteTitle />

      {/* Right section */}
      <ContactInfo />
    </div>
  );
};
