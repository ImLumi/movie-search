import Card from "../Card/Card.jsx";
import './MovieList.css';
function MoviesList({movies, loading}) {

  return (
    <div className="movies-container">
      {
        movies?.results?.map((movie) => (
        <Card movie={movie} key={movie.id} isLoading={loading} />
        ))
      }
    </div>
  );
}

export default MoviesList;
