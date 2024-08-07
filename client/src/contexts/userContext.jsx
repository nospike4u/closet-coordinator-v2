import { createContext, useContext, useState,useEffect } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))||{});
  const [clothes, setClothes] = useState([]);
  
  
  
  return (
    <UserContext.Provider
      value={{ user, setUser,clothes, setClothes, error, setError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};