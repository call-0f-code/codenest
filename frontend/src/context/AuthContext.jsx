import axios from "axios";
import { createContext , useContext , useState , useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const [isAdmin , setIsAdmin] = useState(false);

    useEffect(()=>{
        const fetchUser = async ()=>{
            
            try{
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me` , {
                    withCredentials : true,
                });
                setUser(res.data);
                console.log(res);
                
                if(res.data.role === 'admin'){
                    setIsAdmin(true);
                }

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
        isAdmin,
    };



    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);