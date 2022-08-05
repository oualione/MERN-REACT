import { Navigate } from "react-router-dom";
import { isAuth } from "./helpers";




export function UserRoute({ children }) {



    const auth = isAuth();

    return auth && auth.user.role === 0 ? children : <Navigate to="/" />;
    

  

}