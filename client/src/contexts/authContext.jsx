import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const url =
  import.meta.env.VITE_REACT_NODE_ENV === "production"
    ? import.meta.env.VITE_REACT_URL
    : "http://localhost:8000";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ url, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
