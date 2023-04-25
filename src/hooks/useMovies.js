import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY, API_URL } from "../constants.js";
import useFetch from "./useFetch.js";

export default function useMovies(endpoint ,query = '', opts) {
  const [searchParams, setSearchParams] = useSearchParams();
  const endpointRef = useRef(endpoint);
  const queryRef = useRef(query);
  const [page, setPage] = useState( Number(searchParams.get('page')) || 1);
  const moviesSearchParams = new URLSearchParams({ page, 'api_key': API_KEY, ...opts });
  if (query) moviesSearchParams.set('query', query);
  const {data: movies, error, isLoading} = useFetch(`${API_URL}/${endpoint}?${moviesSearchParams.toString()}`);

  useEffect(() => {
    if (endpointRef.current !== endpoint) {
      setPage(1);
      endpointRef.current = endpoint;
    }
    if (queryRef.current !== query) {
      setPage(1);
      queryRef.current = query;
    }
  }, [query, endpoint])

  useEffect(() => {
    moviesSearchParams.delete('api_key');
    setSearchParams(moviesSearchParams.toString());
  },[page, query, opts])


  return { setPage, movies, isLoading, error }
}
