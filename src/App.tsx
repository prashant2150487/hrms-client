import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "./lib/axios";
import { setUser } from "./features/user";
import type { RootState } from "./store";
import Spinner from "./components/Spinner";
import { Toaster } from "./components/ui/sonner";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userInfo.user);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      try {
        const response = await axiosInstance.get("v1/auth/getme");
        dispatch(setUser(response.data.data));
      } catch (error) {
        console.error("Session expired or invalid token", error);
        localStorage.removeItem("token");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors/>
      <Spinner />
    </>
  );
}

export default App;
