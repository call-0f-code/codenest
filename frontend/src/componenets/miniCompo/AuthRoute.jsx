import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthRoute = ({ children, requiredRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  if (!requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AuthRoute;
