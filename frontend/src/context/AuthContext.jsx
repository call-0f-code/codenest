import axios from "axios";
import { createContext , useContext , useState , useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const [isAdmin , setIsAdmin] = useState(true);
    
    const value = {
        user ,
        setUser,
        loading,
        isAuthenticated,
        isAdmin,
    };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
