import { IMG_BASE_URL } from "../../constants.js";
import './Card.css'
function Card({movie, isLoading}) {
  return (
    <div className="card" style={{opacity: isLoading ? 0.7 : 1}}>
      <img className="card-image" src={IMG_BASE_URL + movie?.['poster_path']} alt={`${movie.title}-poster`}/>
      <h3 className="card-title">{movie.title}</h3>
    </div>
  );
}

export default Card;
