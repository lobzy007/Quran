import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ContextUI = createContext(0);
