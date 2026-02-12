import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/announcements": "Announcements",
  "/doubts": "Doubts Forum",
  "/materials": "Materials",
  "/attendance": "Attendance",
  "/profile": "Profile",
};

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "CampusConnect";

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
