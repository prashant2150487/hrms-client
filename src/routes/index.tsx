import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
// import Home from "@/page/home";
import Login from "@/components/signin";
import Dashboard from "@/components/sidebar";
import Home from "@/page/home/dashboard/home";
const router = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
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
  }
]);

export default router;
