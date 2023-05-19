"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import Avatar from "../Avatar";
import DesktopItem from "./DesktopItem";

type DesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-32 lg:overflow-y-hidden 
    lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between lg:mt-6
    "
    >
      {/* // menu items */}
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
      {/* avatar */}
      <div
        className="mx-auto cursor-pointer hover:opacity-80 transition"
        onClick={() => setIsOpen(true)}
      >
        <Avatar user={currentUser} />
      </div>
    </div>
  );
};

export default DesktopSidebar;
