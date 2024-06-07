import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = localStorage.getItem("token") ?? false;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
