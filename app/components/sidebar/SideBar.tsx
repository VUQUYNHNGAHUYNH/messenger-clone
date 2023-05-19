import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const currentUser = getCurrentUser();

  return (
    <div className="h-full lg:pl-20">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileSidebar />
      {children}
    </div>
  );
};

export default SideBar;
