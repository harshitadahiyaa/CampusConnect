import { useState } from "react";
import { Check, X } from "lucide-react";

const courses = ["CS301", "CS201", "MATH204", "CS405", "CS302"];

const dates = ["Feb 3", "Feb 4", "Feb 5", "Feb 6", "Feb 7"];

const generateAttendance = () =>
  courses.map((course) => ({
    course,
    records: dates.map(() => (Math.random() > 0.2 ? "present" : "absent") as "present" | "absent"),
  }));

const AttendancePage = () => {
  const [data] = useState(generateAttendance);
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filtered = selectedCourse === "all" ? data : data.filter((d) => d.course === selectedCourse);

  const totalPresent = data.reduce((sum, d) => sum + d.records.filter((r) => r === "present").length, 0);
  const totalClasses = data.length * dates.length;
  const percentage = Math.round((totalPresent / totalClasses) * 100);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Summary */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-primary/20">
          <span className="text-lg font-bold text-primary">{percentage}%</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Overall Attendance</p>
          <p className="text-xs text-muted-foreground">{totalPresent}/{totalClasses} classes attended</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCourse("all")}
          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedCourse === "all" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
          }`}
        >
          All Courses
        </button>
        {courses.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCourse(c)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCourse === c ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Course</th>
              {dates.map((d) => (
                <th key={d} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((row) => (
              <tr key={row.course}>
                <td className="px-4 py-3 font-medium text-foreground">{row.course}</td>
                {row.records.map((r, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {r === "present" ? (
                      <Check className="mx-auto h-4 w-4 text-success" />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-destructive" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
