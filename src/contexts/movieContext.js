import { createContext, useState } from "react";

const movieContext = createContext(null);

function MovieProvider({children}) {
  const [movies, setMovies] = useState(null);
  return (
    <movieContext.Provider value={{movies, setMovies}}>
      {children}
    </movieContext.Provider>
  )
}

export {movieContext, MovieProvider}
