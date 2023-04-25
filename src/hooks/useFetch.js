import { useEffect, useState } from "react";

export default function useFetch(url, opts) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('')
  useEffect(() => {
    setIsLoading(true);
    setError('');
    const controller = new AbortController()
    fetch(url, { ...opts, signal: controller.signal }).then(response => {
      return Promise.all([response, response.json()]);
    }).then(([response, fetchData]) => {
      if (!response.ok) throw new Error(fetchData.message || 'Fetching failed')
      setData(fetchData);
    }).catch((e) => setError(e.message))
      .finally(() => setIsLoading(false))
    return () => {
      setIsLoading(false);
      controller.abort();
    };
  }, [url, opts]);

  return { data, isLoading, error };
}
