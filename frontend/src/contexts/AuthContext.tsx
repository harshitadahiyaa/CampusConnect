import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "professor";

export interface AcademicDetails {
  department: string;
  branch: string;
  semester: string;
  subjects: string[];
}

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role;
  userName: string;
  onboardingComplete: boolean;
  academicDetails: AcademicDetails | null;
  login: (role: Role) => void;
  logout: () => void;
  completeOnboarding: (details: AcademicDetails) => void;
  updateAcademicDetails: (details: AcademicDetails) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  role: "student",
  userName: "",
  onboardingComplete: false,
  academicDetails: null,
  login: () => {},
  logout: () => {},
  completeOnboarding: () => {},
  updateAcademicDetails: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>("student");
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [academicDetails, setAcademicDetails] = useState<AcademicDetails | null>(null);

  const userName = role === "professor" ? "Dr. Sarah Mitchell" : "Alex Johnson";

  const login = (r: Role) => {
    setRole(r);
    setIsLoggedIn(true);
    setOnboardingComplete(false);
    setAcademicDetails(null);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setOnboardingComplete(false);
    setAcademicDetails(null);
  };

  const completeOnboarding = (details: AcademicDetails) => {
    setAcademicDetails(details);
    setOnboardingComplete(true);
  };

  const updateAcademicDetails = (details: AcademicDetails) => {
    setAcademicDetails(details);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userName, onboardingComplete, academicDetails, login, logout, completeOnboarding, updateAcademicDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
