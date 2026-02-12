import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
const BRANCHES = ["CSE","CSE-AI","ECE","ECE-AI","IT","MAE"];
const ALL_SUBJECTS = [
  "CS301 — Data Structures",
  "CS201 — OOP",
  "CS405 — AI",
  "CS302 — DBMS",
  "MATH204 — Linear Algebra",
  "CS501 — Machine Learning",
  "CS401 — Networks",
  "EE201 — Circuits",
];

const OnboardingPage = () => {
  const { role, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const isValid =
    role === "professor"
      ? department && selectedSubjects.length > 0
      : department && branch && semester && selectedSubjects.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    completeOnboarding({ department, branch, semester, subjects: selectedSubjects });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Academic Setup</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Step 2 of 2 — Tell us about your academic details
          </p>
        </div>

        {/* Progress */}
        <Progress value={100} className="mb-6 h-1.5" />

        {/* Form Card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Department */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Department
              </label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Branch — students only */}
            {role === "student" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Branch
                </label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Semester */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Semester {role === "professor" && <span className="text-muted-foreground">(optional)</span>}
              </label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTERS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Multi-select Subjects */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {role === "professor" ? "Subjects Taught" : "Subjects / Courses"}
              </label>
              <div className="flex flex-wrap gap-2 rounded-lg border border-input bg-background p-3">
                {ALL_SUBJECTS.map((subject) => {
                  const active = selectedSubjects.includes(subject);
                  return (
                    <button
                      type="button"
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent text-accent-foreground hover:bg-accent/80"
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>
              {selectedSubjects.length === 0 && (
                <p className="mt-1 text-xs text-muted-foreground">Select at least one</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save & Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          You can update these later from your profile
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
