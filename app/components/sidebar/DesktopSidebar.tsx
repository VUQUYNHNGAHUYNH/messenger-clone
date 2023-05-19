"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";

const DesktopSidebar = () => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-32 lg:overflow-y-hidden 
    lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between lg:mt-6
    "
    >
      <ul role="list" className="flex flex-col items-center space-y-2">
        {routes.map((item) => (
          <DesktopItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default DesktopSidebar;
