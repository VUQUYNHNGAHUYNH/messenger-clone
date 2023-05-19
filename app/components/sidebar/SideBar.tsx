import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileSidebar />
      {children}
    </div>
  );
};

export default SideBar;
