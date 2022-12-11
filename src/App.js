import React, { useState } from "react";
import MovieList from "./component/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [load,setLoad] = useState()
  async function fetchMoviesHandler() {
    setLoad(false)
    const res = await fetch("https://swapi.dev/api/films/");
    const data = await res.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releseData: movieData.relese_date,
      };
    });
    setLoad(true)
    setMovies(transformedMovies);
  }
  return (
    <React.Fragment>
        <section onClick={fetchMoviesHandler}>
          <button>Fetch Movies</button>
        </section>
        <section>
          {load===false && <h2>Loading...please wait..</h2>}
          {load && <MovieList movies={movies} />}
        </section>

    </React.Fragment>
  );
}

export default App;
