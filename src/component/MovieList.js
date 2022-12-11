import Movie from "./Movie";
import "./MovieList.css"

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <ul  key={movie.id} className="moviesList">
            <Movie
              id={movie.id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              openingText={movie.openingText}
              deleteHandler={props.deleteHandler}
            />
          </ul>
        );
      })}
    </>
  );
};

export default MovieList;
