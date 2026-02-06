import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  // لو مفيش login → رجعه على login
  if (!user) return <Navigate to="/login" />;

  // لو مش admin وحاول يدخل admin route → رجعه على الصفحة الرئيسية
  if (role && user.role !== role) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
