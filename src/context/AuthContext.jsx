import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
  const [LoginState, setLoginState] = useState({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        //login state
        setLoginState({
          isLoggedIn: true,
          user: user,
        })
      }
      else {
        //logout state
        setLoginState({
          isLoggedIn: false,
          user: null,
        });
      }
    })
  }, []);

  return (
    <AuthContext.Provider value={LoginState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;