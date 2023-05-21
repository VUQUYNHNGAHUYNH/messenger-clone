"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  href: string;
  icon: any;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <div>
      <Link
        onClick={handleClick}
        href={href}
        className={clsx(
          `group flex gap-x-3 text-sm text-sky-600 hover:text-sky-700 p-4 font-semibold w-full 
          justify-center items-center`,
          active && "bg-gray-200"
        )}
      >
        <Icon className="h-8 w-8" />
      </Link>
    </div>
  );
};

export default MobileItem;
