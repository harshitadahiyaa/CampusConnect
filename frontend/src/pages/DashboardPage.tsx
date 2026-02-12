import { Link } from "react-router-dom";
import {
  Megaphone,
  MessageCircleQuestion,
  FolderOpen,
  ClipboardList,
  User,
  TrendingUp,
  BookOpen,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const quickLinks = [
  { title: "Announcements", desc: "Latest updates & notices", icon: Megaphone, url: "/announcements", color: "bg-primary/10 text-primary" },
  { title: "Doubts Forum", desc: "Ask & answer questions", icon: MessageCircleQuestion, url: "/doubts", color: "bg-info/10 text-info" },
  { title: "Materials", desc: "Course files & resources", icon: FolderOpen, url: "/materials", color: "bg-warning/10 text-warning" },
  { title: "Attendance", desc: "Track your presence", icon: ClipboardList, url: "/attendance", color: "bg-success/10 text-success" },
];

const stats = [
  { label: "Courses", value: "5", icon: BookOpen },
  { label: "Attendance", value: "87%", icon: TrendingUp },
  { label: "Upcoming", value: "3", icon: Calendar },
  { label: "Unread", value: "7", icon: Megaphone },
];

const DashboardPage = () => {
  const { role, userName } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome back, {userName.split(" ")[0]} 👋
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Here's what's happening in your campus today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Access
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className="card-hover flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Recent Activity
        </h3>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {[
            { text: "New announcement in CS301", time: "2 hours ago" },
            { text: "Doubt resolved: Binary Search Trees", time: "5 hours ago" },
            { text: "Attendance marked for Math204", time: "1 day ago" },
            { text: "New material uploaded: Week 5 slides", time: "1 day ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <p className="text-sm text-foreground">{a.text}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
