import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
import Login from "@/components/signin";
import Home from "@/page/home/dashboard/home";
import Admin from "@/page/home/dashboard/admin";
import HomePage from "@/page/homepage";
import { Protect } from "./protectedRoutes";
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
    path: "/dashboard/:page",
    element: (
      // <Protect>
        <Home />
    //  </Protect>
    ),
  },
  {
    path: "/dashboard/admin",
    element: <Admin />,
  },
]);

export default router;
