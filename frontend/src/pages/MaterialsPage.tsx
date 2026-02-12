import { useState } from "react";
import { Folder, FileText, ArrowLeft, Download } from "lucide-react";

interface FileItem {
  name: string;
  type: "folder" | "file";
  size?: string;
  date?: string;
  children?: FileItem[];
}

const fileTree: FileItem[] = [
  {
    name: "CS301 — Data Structures",
    type: "folder",
    children: [
      { name: "Week 1 — Introduction.pdf", type: "file", size: "2.4 MB", date: "Jan 10" },
      { name: "Week 2 — Arrays & Linked Lists.pdf", type: "file", size: "3.1 MB", date: "Jan 17" },
      { name: "Week 3 — Stacks & Queues.pdf", type: "file", size: "2.8 MB", date: "Jan 24" },
      { name: "Week 4 — Trees.pdf", type: "file", size: "4.2 MB", date: "Jan 31" },
      { name: "Week 5 — Graphs.pdf", type: "file", size: "3.7 MB", date: "Feb 7" },
    ],
  },
  {
    name: "CS201 — Computer Organization",
    type: "folder",
    children: [
      { name: "Lecture Notes — Unit 1.pdf", type: "file", size: "5.1 MB", date: "Jan 12" },
      { name: "Lab Manual.pdf", type: "file", size: "1.8 MB", date: "Jan 15" },
    ],
  },
  {
    name: "MATH204 — Linear Algebra",
    type: "folder",
    children: [
      { name: "Textbook Reference.pdf", type: "file", size: "12 MB", date: "Jan 8" },
      { name: "Practice Problems Set 1.pdf", type: "file", size: "980 KB", date: "Jan 20" },
      { name: "Practice Problems Set 2.pdf", type: "file", size: "1.1 MB", date: "Feb 3" },
    ],
  },
  {
    name: "CS405 — Artificial Intelligence",
    type: "folder",
    children: [
      { name: "Search Algorithms.pdf", type: "file", size: "3.4 MB", date: "Jan 14" },
      { name: "Neural Networks Intro.pdf", type: "file", size: "4.5 MB", date: "Jan 28" },
    ],
  },
];

const MaterialsPage = () => {
  const [currentFolder, setCurrentFolder] = useState<FileItem | null>(null);

  return (
    <div className="space-y-4 animate-fade-in">
      {currentFolder ? (
        <>
          <button
            onClick={() => setCurrentFolder(null)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to folders
          </button>
          <h3 className="text-lg font-semibold text-foreground">{currentFolder.name}</h3>
          <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {currentFolder.children?.map((file, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.date}</p>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {fileTree.map((folder, i) => (
            <button
              key={i}
              onClick={() => setCurrentFolder(folder)}
              className="card-hover flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Folder className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{folder.name}</p>
                <p className="text-xs text-muted-foreground">{folder.children?.length} files</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
