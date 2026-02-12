import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  FolderOpen,
  ClipboardList,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Doubts Forum", url: "/doubts", icon: MessageCircleQuestion },
  { title: "Materials", url: "/materials", icon: FolderOpen },
  { title: "Attendance", url: "/attendance", icon: ClipboardList },
  { title: "Profile", url: "/profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-60 flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-5">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">CampusConnect</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = location.pathname === item.url;
            return (
              <Link
                key={item.url}
                to={item.url}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <button
            onClick={() => { logout(); onClose(); }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
