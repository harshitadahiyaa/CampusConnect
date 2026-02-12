import { useState } from "react";
import { Plus, Pin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  course: string;
  date: string;
  pinned: boolean;
}

const initialAnnouncements: Announcement[] = [
  { id: 1, title: "Mid-semester exam schedule released", content: "The mid-semester exams will begin from March 15. Please check the portal for your individual timetable.", author: "Dr. Arun ", course: "CS301", date: "Feb 5, 2026", pinned: true },
  { id: 2, title: "Guest lecture on AI Ethics", content: "We will host a guest lecture on AI Ethics this Friday at 3 PM in the main auditorium. Attendance is optional but recommended.", author: "Dr. Raj Patel", course: "CS405", date: "Feb 4, 2026", pinned: false },
  { id: 3, title: "Assignment 3 deadline extended", content: "Due to popular request, the deadline for Assignment 3 has been extended to February 12.", author: "Arun", course: "CS301", date: "Feb 3, 2026", pinned: false },
];

const AnnouncementsPage = () => {
  const { role } = useAuth();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAnnouncements([
      {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        author: "Arun",
        course: "CS301",
        date: "Just now",
        pinned: false,
      },
      ...announcements,
    ]);
    setNewTitle("");
    setNewContent("");
    setShowForm(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {role === "professor" && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Announcement
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-xl border border-border bg-card p-4 space-y-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your announcement..."
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Post
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {announcements.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {a.pinned && <Pin className="h-3 w-3 text-primary" />}
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.course}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.content}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{a.author}</span>
              <span>·</span>
              <span>{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
