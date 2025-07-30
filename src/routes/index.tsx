import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
import Login from "@/components/signin";
import Home from "@/page/home/dashboard/home";
import HomePage from "@/page/homepage";
import Onboard from "@/page/home/dashboard/admin/onBoard";
import Attendance from "@/page/me/attendence";
import Dashboard from "@/components/sidebar";
import Leave from "@/page/me/leave";
import ResetPassword from "@/page/resetPassword";
import CreateNewPassword from "@/page/createPassword";
import Holiday from "@/page/home/dashboard/admin/holiday";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/create-password/:resetToken",
    element: <CreateNewPassword />,
  },
  {
    path: "/home/dashboard",
    element: (
      // <Protect>
      <Home />
      //  </Protect>
    ),
  },
  {
    path: "/admin/onboard",
    element: <Onboard />,
  },
  {
    path: "/admin/holiday",
    element: <Holiday />,
  },
  {
    path: "/me/attendance",
    element: (
      <Dashboard>
        <Attendance />
      </Dashboard>
    ),
  },
  {
    path: "/me/leave",
    element: (
      <Dashboard>
        <Leave />
      </Dashboard>
    ),
  },
]);

export default router;
