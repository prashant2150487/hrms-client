import { createBrowserRouter } from "react-router-dom";
import Signup from "@/components/signup";
// import Home from "@/page/home";
import Login from "@/components/signin";
import Home from "@/page/home/dashboard/home";
import Admin from "@/page/home/dashboard/admin";
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
  },
  {
    path: "/dashboard/admin",
    element: <Admin/>,
  },
  
]);

export default router;
