import { useCallback, useEffect, useState } from "react"
import Constants from "expo-constants"

const useFetch = (url, requestOptions = {}, transform = null, autofetch = true) => {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ message, setMessage ] = useState(null);

  const defaultOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow"
  };

  const fetchData = async (extraOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const mergedRequestOptions = {
        ...defaultOptions,
        ...requestOptions,
        ...extraOptions,
        headers: {
          ...defaultOptions.headers,
          ...(requestOptions.headers || {}),
          ...(extraOptions.headers || {})
        }
      };
      
      const response = await fetch(
        `http://${Constants.expoConfig?.hostUri?.split(":")[0]}:5000` + url,
        mergedRequestOptions
      );
      const result = await response.json();

      if(response.ok || result.success) {
        setData(transform ? transform(result.data) : result.data);
        setMessage(result.message);
      } else {
        setError(new Error(result.message));
      }

    } catch (error) {
      setError(error instanceof Error ? error : new Error("An Error Occured"));
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
    setMessage(null);
  }

  useEffect(() => {
    if(autofetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, message, refetch: fetchData, reset };
}

export default useFetch;