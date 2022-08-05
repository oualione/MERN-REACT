import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";

export function PrivateRoute({ children }) {

  const auth = isAuth();

  return auth ? children : <Navigate to="/login" />;
}