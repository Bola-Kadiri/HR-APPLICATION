import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
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
import CareerPage from "./pages/career-page/CareerPage";
import JobPage from "./pages/job-page/JobPage";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordConfirm from "./pages/auth/ResetPasswordConfirm";
import Activate from "./pages/auth/Activate";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id/" element={<Joblist />} />
       
        <Route path="/career-page" element={<CareerPage />} />
       
        <Route path="/job-page" element={<JobPage />} />
      </Route>

      <Route>
        <Route>
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}/>
        <Route path="/activate/:uid/:token" element={<Activate/>}/>
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/" element={<Admin />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-application" element={<ViewApplication />} />
        <Route path="/view-job" element={<ViewJob />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/" element={<AdminDashboardLayout />}>
        <Route path="/admin/crud" element={<AdminDashboardCrud />} />
      </Route>
    </Route>
  )
);
