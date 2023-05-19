import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

const SideBar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full lg:pl-20">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileSidebar />
      {children}
    </div>
  );
};

export default SideBar;
