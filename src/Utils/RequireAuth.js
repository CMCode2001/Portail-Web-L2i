import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { authData } = useAuth();
  const location = useLocation();

  //   return authData?.user?.role.find((role) => allowedRoles?.includes(role)) ? (
  //     <Outlet />
  //   ) : authData?.user ? (
  //     <Navigate to="/" state={{ from: location }} replace />
  //   ) : (
  //     <Navigate to="/connexion" state={{ from: location }} replace />
  //   );
  return allowedRoles.includes(authData?.user?.role) ? (
    <Outlet />
  ) : authData?.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  );
};

export default RequireAuth;
