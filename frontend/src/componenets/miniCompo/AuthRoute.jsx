import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthRoute = ({children , requiredRoles}) => {
    const {user}  = useAuth();

    if(requiredRoles.includes('user')){
        return children;
    }

    if(!user){
        return <Navigate to='/signup' replace/>
    }

    if(!requiredRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace/>
    }
}