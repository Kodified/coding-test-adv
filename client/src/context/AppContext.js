import React, { useState, useContext, createContext } from "react";
import useFetch from "../hooks/useFetch.js";
import { useAuthContext } from "../context/AuthContext";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { authToken } = useAuthContext();

  const url = `http://localhost:3001/animals/categoryIds`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: authToken,
    },
    body: JSON.stringify({ data: selectedCategories }),
  };

  const { data: animals, loading } = useFetch(url, options, [
    selectedCategories,
  ]);

  const value = {
    loading,
    animals,
    selectedCategories,
    setSelectedCategories,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
