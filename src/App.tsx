import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "./components/shared/Layout";

// Auth pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import BinManagement from "./pages/admin/BinManagement";
import RouteOptimization from "./pages/admin/RouteOptimization";
import AdminReports from "./pages/admin/Reports";
import CitizenIssues from "./pages/admin/CitizenIssues";
import WorkerManagement from "./pages/admin/WorkerManagement";

// Citizen pages
import CitizenDashboard from "./pages/citizen/Dashboard";
import CitizenReports from "./pages/citizen/Reports";
import Leaderboard from "./pages/citizen/Leaderboard";
import CitizenProfile from "./pages/citizen/Profile";

// Worker pages
import WorkerDashboard from "./pages/worker/Dashboard";
import WorkerBins from "./pages/worker/Bins";
import WorkerTasks from "./pages/worker/Tasks";
import WorkerComplaints from "./pages/worker/Complaints";
import WorkerProfile from "./pages/worker/Profile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Redirect authenticated users to their role-specific dashboard
  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'citizen':
        return '/citizen/dashboard';
      case 'worker':
        return '/worker/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={user ? <Navigate to={getDefaultRoute()} replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to={getDefaultRoute()} replace /> : <SignUp />} />
      
      {/* Default route */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      
      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/bins" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <BinManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/routes" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <RouteOptimization />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminReports />
        </ProtectedRoute>
      } />
      <Route path="/admin/citizens" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <CitizenIssues />
        </ProtectedRoute>
      } />
      <Route path="/admin/workers" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <WorkerManagement />
        </ProtectedRoute>
      } />

      {/* Citizen routes */}
      <Route path="/citizen/dashboard" element={
        <ProtectedRoute allowedRoles={['citizen']}>
          <CitizenDashboard />
        </ProtectedRoute>
      } />
      <Route path="/citizen/reports" element={
        <ProtectedRoute allowedRoles={['citizen']}>
          <CitizenReports />
        </ProtectedRoute>
      } />
      <Route path="/citizen/leaderboard" element={
        <ProtectedRoute allowedRoles={['citizen']}>
          <Leaderboard />
        </ProtectedRoute>
      } />
      <Route path="/citizen/profile" element={
        <ProtectedRoute allowedRoles={['citizen']}>
          <CitizenProfile />
        </ProtectedRoute>
      } />

      {/* Worker routes */}
      <Route path="/worker/dashboard" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <WorkerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/worker/bins" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <WorkerBins />
        </ProtectedRoute>
      } />
      <Route path="/worker/tasks" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <WorkerTasks />
        </ProtectedRoute>
      } />
      <Route path="/worker/complaints" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <WorkerComplaints />
        </ProtectedRoute>
      } />
      <Route path="/worker/profile" element={
        <ProtectedRoute allowedRoles={['worker']}>
          <WorkerProfile />
        </ProtectedRoute>
      } />

      {/* Fallback routes */}
      <Route path="/unauthorized" element={<div className="min-h-screen flex items-center justify-center"><h1>Unauthorized Access</h1></div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
