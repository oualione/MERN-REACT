import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";




export function AdminRoute({ children }) {



    const auth = isAuth();

    return auth && auth.user.role === 1 ? children : <Navigate to="/" />;
    

  

}