import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Token nahi hai ya admin nahi hai
  if (!token || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin hai → andar jaao
  return children;
};

export default ProtectedRoute;