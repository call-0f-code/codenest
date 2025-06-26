import axios from "axios";
import { createContext , useContext , useState , useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/api/v1/me" , {
                    withCredentials : true,
                });
                setUser(res.data);

            }
            catch(err){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const value = {
        user ,
        setUser,
        loading,
        isAuthenticated : !!user,
    };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);