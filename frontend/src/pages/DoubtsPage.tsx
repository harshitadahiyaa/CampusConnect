import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, Send } from "lucide-react";

interface Reply {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface Doubt {
  id: number;
  title: string;
  author: string;
  course: string;
  time: string;
  resolved: boolean;
  replies: Reply[];
}

const initialDoubts: Doubt[] = [
  {
    id: 1,
    title: "How does recursion work in dynamic programming?",
    author: "Harshita Dahiya",
    course: "CS301",
    time: "3 hours ago",
    resolved: false,
    replies: [
      { id: 1, author: "Dr. Arun ", text: "Great question! In DP, recursion breaks the problem into overlapping subproblems. We then memoize results to avoid recomputation.", time: "2 hours ago" },
      { id: 2, author: "Priya Sharma", text: "You can think of it as recursion + caching. Start with the recursive solution, then add a memo table.", time: "1 hour ago" },
    ],
  },
  {
    id: 2,
    title: "Difference between stack and heap memory?",
    author: "Priya Sharma",
    course: "CS201",
    time: "1 day ago",
    resolved: true,
    replies: [
      { id: 1, author: "Dr. Raj Patel", text: "Stack is for static allocation (local variables), heap is for dynamic allocation. Stack is LIFO, heap is managed by the OS.", time: "1 day ago" },
    ],
  },
  {
    id: 3,
    title: "Can someone explain normalization in databases?",
    author: "Ravi Kumar",
    course: "CS302",
    time: "2 days ago",
    resolved: false,
    replies: [],
  },
];

const DoubtsPage = () => {
  const [doubts, setDoubts] = useState(initialDoubts);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newDoubt, setNewDoubt] = useState("");
  const [showNew, setShowNew] = useState(false);

  const handleReply = (doubtId: number) => {
    if (!replyText.trim()) return;
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === doubtId
          ? { ...d, replies: [...d.replies, { id: Date.now(), author: "You", text: replyText, time: "Just now" }] }
          : d
      )
    );
    setReplyText("");
  };

  const handleNewDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubt.trim()) return;
    setDoubts([
      {
        id: Date.now(),
        title: newDoubt,
        author: "You",
        course: "General",
        time: "Just now",
        resolved: false,
        replies: [],
      },
      ...doubts,
    ]);
    setNewDoubt("");
    setShowNew(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Ask a Doubt
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleNewDoubt} className="flex gap-2">
          <input
            value={newDoubt}
            onChange={(e) => setNewDoubt(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Post
          </button>
        </form>
      )}

      <div className="space-y-3">
        {doubts.map((d) => (
          <div key={d.id} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{d.course}</span>
                  {d.resolved && (
                    <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">Resolved</span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground">{d.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{d.author} · {d.time} · {d.replies.length} replies</p>
              </div>
              {expandedId === d.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>

            {expandedId === d.id && (
              <div className="border-t border-border">
                {d.replies.length > 0 ? (
                  <div className="divide-y divide-border">
                    {d.replies.map((r) => (
                      <div key={r.id} className="px-4 py-3 pl-8">
                        <p className="text-sm text-foreground">{r.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{r.author} · {r.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-3 text-sm text-muted-foreground">No replies yet.</p>
                )}

                <div className="flex gap-2 border-t border-border p-3">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    onKeyDown={(e) => e.key === "Enter" && handleReply(d.id)}
                  />
                  <button
                    onClick={() => handleReply(d.id)}
                    className="rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoubtsPage;
