import { Menu, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
}

export const Navbar = ({ onMenuClick, title }: NavbarProps) => {
  const { role, userName } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-1.5 text-muted-foreground hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {userName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-tight">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
