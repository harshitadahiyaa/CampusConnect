import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import DoubtsPage from "./pages/DoubtsPage";
import MaterialsPage from "./pages/MaterialsPage";
import AttendancePage from "./pages/AttendancePage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { isLoggedIn, onboardingComplete } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <AppLayout />;
};

const OnboardingGuard = () => {
  const { isLoggedIn, onboardingComplete } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (onboardingComplete) return <Navigate to="/dashboard" replace />;
  return <OnboardingPage />;
};

const LoginGuard = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginGuard />} />
            <Route path="/onboarding" element={<OnboardingGuard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/doubts" element={<DoubtsPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
