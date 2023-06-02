import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (
  url: string,
  options: { token: string | null; query?: any }
) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(options.query);

  const fetchData = async () => {
    const config = {
      headers: {
        "x-access-token": options.token,
      },
      params: {
        timeframe: options.query, // or any other value for timeframe
      },
    };

    try {
      setLoading(true);
      const res = await axios.get(url, config);
      setResponse(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, options.query]);

  return { response, error, loading, fetchData, setResponse };
};

export default useFetch;
