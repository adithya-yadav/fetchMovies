import React, { useEffect, useState } from "react";
import MovieList from "./component/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [load,setLoad] = useState(true)
  const [error,setError] = useState(null)
  const [btn,setBtn] = useState(false)
  
  async function fetchMoviesHandler() {
    try{
      setLoad(false)
      const res = await fetch("https://swapi.dev/api/films/");
      if(!res.ok){
        setTimeout(()=>{
          setBtn(true)
        },5000)
        throw new Error("SomeThing went wrong... Retrying")
      }
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
    }catch(err){
      setError(err.message)
    }
    
  }
  useEffect(fetchMoviesHandler,[])
  function setErrorHandler(){
    setError(null)
    setLoad(true)
  }
  return (
    <React.Fragment>
        <section onClick={fetchMoviesHandler}>
          <button>Fetch Movies</button>
        </section>
        <section>
          {error && <> <h2>{error}</h2> {btn && <button onClick={setErrorHandler}>Cancel</button>}</>}
          {!load && !error&& <h2>Loading...please wait..</h2>}
          {load && <MovieList movies={movies} />}
        </section>

    </React.Fragment>
  );
}

export default App;
