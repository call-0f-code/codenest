import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthBridge } from "@/utils/api/authBridge";

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const setAccessToken = (t) => {
    setAccessTokenState(t);
  };

  const SignOut = async() => {
    setAccessTokenState(null);
    window.location.replace("/signup");
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