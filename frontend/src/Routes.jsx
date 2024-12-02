import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import Joblist from "./pages/joblist/Joblist";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./component/Layout/Layout";
import Home from "./pages/home/Home";
import ViewApplication from "./pages/dashboard/view-application/ViewApplication";
import ViewJob from "./pages/dashboard/view-job/ViewJob";
import AdminDashboardLayout from "./pages/dashboard/admin-dashboard/admin-dashboard-layout/AdminDashboardLayout";
import AdminDashboardCrud from "./pages/dashboard/admin-dashboard/admin-dashboard-crud/AdminDashboardCrud";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgetPassword";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import CareerPage from "./pages/career-page/CareerPage";
import JobPage from "./pages/job-page/JobPage";
import ProtectedRoute from "./component/protected-route/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id/" element={<Joblist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/career-page" element={<CareerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email/:uid/:token" element={<VerifyEmailPage />} />
        <Route path="/job-page" element={<JobPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/" element={<Admin />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={true} requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-application"
          element={
            <ProtectedRoute isAllowed={true} requiredRole="admin">
              <ViewApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-job"
          element={
            <ProtectedRoute isAllowed={true} requiredRole="admin">
              <ViewJob />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/" element={<ProtectedRoute isAllowed={true} requiredRole="admin"><AdminDashboardLayout /></ProtectedRoute>}>
        <Route
          path="/admin/crud"
          element={
            <ProtectedRoute isAllowed={true} requiredRole="admin">
              <AdminDashboardCrud />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>
  )
);
