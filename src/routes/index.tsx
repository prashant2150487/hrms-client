import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
import Login from "@/components/signin";
import Home from "@/page/home/dashboard/home";
import Admin from "@/page/home/dashboard/admin/onBoard";
import HomePage from "@/page/homepage";
import { Protect } from "./protectedRoutes";
import Onboard from "@/page/home/dashboard/admin/onBoard";
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
]);

export default router;
