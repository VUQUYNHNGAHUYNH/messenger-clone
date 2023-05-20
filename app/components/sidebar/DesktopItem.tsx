"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm font-semibold text-sky-600 hover:text-sky-700`,
          active && "bg-gray-200"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
