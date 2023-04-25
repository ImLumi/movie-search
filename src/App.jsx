import './App.css'
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useMovies from "./hooks/useMovies.js";
import { SEARCH_ENDPOINT, TRENDING_WEEK_ENDPOINT } from "./constants.js";
import MoviesList from "./components/MovieList/MoviesList.jsx";
import useDelayedValue from "./hooks/useDelayedValue.js";
import Pagination from "./components/Pagination/Pagination.jsx";

function App() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const delayedQuery = useDelayedValue(query, 1000);
  const endpoint = useMemo(() => delayedQuery ? SEARCH_ENDPOINT : TRENDING_WEEK_ENDPOINT, [delayedQuery])
  const { movies, isLoading, error, setPage } = useMovies(endpoint, delayedQuery);

  return (
    <div className="container">
      <label>
        search:
        <input name="search" value={query} onChange={({ target }) => setQuery(target.value)}/>
      </label>
      <MoviesList loading={isLoading} movies={movies}/>
      <Pagination setPage={setPage} actualPage={movies?.page} maxPage={movies?.['total_pages']}/>
    </div>
  )
}

export default App
