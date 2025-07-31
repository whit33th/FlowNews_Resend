import { NavigationMenu } from "../UI/NavigationMenu";
import { HeaderActions } from "../UI/HeaderActions";

interface NavigationItem {
  label: string;
  href: string;
}

interface HeaderNavigationProps {
  navigationItems: NavigationItem[];
}

export const HeaderNavigation = ({ navigationItems }: HeaderNavigationProps) => {
  return (
    <div className="mt-3 lg:mt-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
        <div className="flex items-center justify-center lg:justify-start space-x-3 lg:space-x-6 text-sm lg:text-lg">
          <NavigationMenu navigationItems={navigationItems} />
        </div>
        <HeaderActions />
      </div>
    </div>
  );
}; 