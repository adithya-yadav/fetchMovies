import Movie from "./Movie";
import "./MovieList.css"

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <ul  key={movie.id} className="moviesList">
            <Movie
              title={movie.title}
              releaseDate={movie.releaseDate}
              openingText={movie.openingText}
            />
          </ul>
        );
      })}
    </>
  );
};

export default MovieList;
