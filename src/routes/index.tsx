import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
import Login from "@/components/signin";
import Home from "@/page/home/dashboard/home";
import Admin from "@/page/home/dashboard/admin";
import HomePage from "@/page/homepage";
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
    element: <Home />,
  },
  {
    path: "/dashboard/admin",
    element: <Admin/>,
  },
  
]);

export default router;
