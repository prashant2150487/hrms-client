import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface ProtectProps {
  children: React.ReactNode;
}
export const Protect = ({ children }: ProtectProps) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.userInfo.isLoggedIn
  );
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};
