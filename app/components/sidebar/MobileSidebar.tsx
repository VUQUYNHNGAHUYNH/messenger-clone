"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileSidebar = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  return (
    <div className="fixed flex px-8 lg:hidden justify-between w-full bottom-0 z-40 items-center border-t">
      {routes.map((item) => (
        <MobileItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default MobileSidebar;
