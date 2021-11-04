import { useState, useEffect } from "react";

const useFetch = (url, options, dependencies = []) => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

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
  }, dependencies);

  return { data, error, loading };
};

export default useFetch;
