import { Navigate } from "react-router-dom";
import { getItem } from "../localstorage/storage";

const ProtectedRoute = ({ children }: any) => {
  let user = getItem("token");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
