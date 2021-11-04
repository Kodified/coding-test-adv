import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const url = `http://localhost:3001/auth`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const value = { authToken: data, error, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
