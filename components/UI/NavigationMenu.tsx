import Link from "next/link";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationMenuProps {
  navigationItems: NavigationItem[];
}

export const NavigationMenu = ({ navigationItems }: NavigationMenuProps) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-6">
      {navigationItems.map((item, idx) => (
        <Link
          key={item.label + idx}
          href={item.href}
          className="text-sm lg:text-base font-semibold text-neutral-500 uppercase hover:text-neutral-700 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};
