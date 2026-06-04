import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    toast.error("Access denied! Only admins can access this page.");

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
