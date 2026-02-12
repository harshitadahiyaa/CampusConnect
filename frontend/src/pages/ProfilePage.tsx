import { useState } from "react";
import { Mail, BookOpen, GraduationCap, Calendar, Settings } from "lucide-react";
import { useAuth, AcademicDetails } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEPARTMENTS = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Mathematics"];
const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const BRANCHES = ["CSE", "ECE", "ME", "CE", "IT"];
const ALL_SUBJECTS = [
  "CS301 — Data Structures", "CS201 — OOP", "CS405 — AI", "CS302 — DBMS",
  "MATH204 — Linear Algebra", "CS501 — Machine Learning", "CS401 — Networks", "EE201 — Circuits",
];

const AcademicDetailsForm = ({ initial, onSave, onCancel }: {
  initial: AcademicDetails | null;
  onSave: (d: AcademicDetails) => void;
  onCancel: () => void;
}) => {
  const { role } = useAuth();
  const [department, setDepartment] = useState(initial?.department || "");
  const [branch, setBranch] = useState(initial?.branch || "");
  const [semester, setSemester] = useState(initial?.semester || "");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(initial?.subjects || []);

  const toggleSubject = (s: string) =>
    setSelectedSubjects((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const isValid = role === "professor"
    ? department && selectedSubjects.length > 0
    : department && branch && semester && selectedSubjects.length > 0;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <h3 className="text-base font-semibold text-foreground">Update Academic Details</h3>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Department</label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
          <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      {role === "student" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Branch</label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger><SelectValue placeholder="Select branch" /></SelectTrigger>
            <SelectContent>{BRANCHES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Semester {role === "professor" && <span className="text-muted-foreground">(optional)</span>}
        </label>
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
          <SelectContent>{SEMESTERS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {role === "professor" ? "Subjects Taught" : "Subjects / Courses"}
        </label>
        <div className="flex flex-wrap gap-2 rounded-lg border border-input bg-background p-3">
          {ALL_SUBJECTS.map((subject) => (
            <button
              type="button"
              key={subject}
              onClick={() => toggleSubject(subject)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedSubjects.includes(subject)
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => isValid && onSave({ department, branch, semester, subjects: selectedSubjects })}
          disabled={!isValid}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg border border-input px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { role, userName, academicDetails, updateAcademicDetails } = useAuth();
  const [editing, setEditing] = useState(false);

  const details = role === "professor"
    ? {
        email: "arun@campus.edu",
        department: academicDetails?.department || "Computer Science",
        branch: "CSE",
        batch: "Faculty",
        courses: academicDetails?.subjects || ["CS301 — Data Structures", "CS405 — AI"],
      }
    : {
        email: "harshita043btit.igdtuw.ac.in",
        department: academicDetails?.department || "Computer Science",
        branch: academicDetails?.branch || "CSE",
        batch: "2026",
        courses: academicDetails?.subjects || ["CS301", "CS201", "MATH204", "CS405", "CS302"],
      };

  return (
    <div className="max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
          {userName.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{userName}</h2>
          <p className="text-sm text-muted-foreground">
            {details.department} · {details.branch}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Batch {details.batch}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {[
          { icon: Mail, label: "Email", value: details.email },
          { icon: GraduationCap, label: "Department", value: details.department },
          { icon: Calendar, label: details.batch === "Faculty" ? "Role" : "Batch (Graduation Year)", value: details.batch === "Faculty" ? "Professor" : details.batch },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <item.icon className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {role === "professor" ? "Teaching" : "Enrolled Courses"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {details.courses.map((c) => (
            <span key={c} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
              <BookOpen className="mr-1.5 inline h-3 w-3" />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Academic Details Section */}
      {editing ? (
        <AcademicDetailsForm
          initial={academicDetails}
          onSave={(d) => { updateAcademicDetails(d); setEditing(false); }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Settings className="h-4 w-4" />
          Update Academic Details
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
