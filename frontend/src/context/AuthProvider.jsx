import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthBridge } from "@/utils/api/authBridge";
import { signout } from "@/utils/api/memberApi";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const setAccessToken = (t) => {
    setAccessTokenState(t);
  };

  const SignOut = async() => {
    await signout()
    setAccessTokenState(null);
  };

  // register context functions so axios can call them
  useEffect(() => {
    AuthBridge.register({
      setToken: setAccessToken,
      logout:SignOut,
      getToken: () => accessToken,
    });
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};