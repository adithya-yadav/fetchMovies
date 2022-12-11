import React, { useEffect, useRef, useState } from "react";
import MovieList from "./component/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [load,setLoad] = useState(true)
  const [error,setError] = useState(null)
  const [btn,setBtn] = useState(false)
  const titleRef = useRef()
  const openingRef = useRef()
  const dateRef = useRef()
  
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
          releaseDate: movieData.release_date,
        };
      });
      setLoad(true)
      setMovies(transformedMovies);
    }catch(err){
      setError(err.message)
    }
    
  }
  function onClickAddNote(e){
    const title = titleRef.current.value
    const opening = openingRef.current.value
    const date = dateRef.current.value
    const newMovieObj = {
      title,
      date,
      opening
    }
    console.log(newMovieObj)
  }
  useEffect(fetchMoviesHandler,[])
  function setErrorHandler(){
    setError(null)
    setLoad(true)
  }
  return (
    <React.Fragment>
      <div className="input">
        <label>Title :</label>
        <input
          type="text"
          id="title"
          ref={titleRef}
        />
        <label>Opening text :</label>
        <textarea
          type="text"
          name="opening"
          ref={openingRef}
        />
        <label>Release Date :</label>
        <input
          type="text"
          name="date"
          ref={dateRef}
        />
        <button type="submit" onClick={onClickAddNote}>
          Add Movie
        </button>
      </div>
        <div className="input" onClick={fetchMoviesHandler}>
          <button>Fetch Movies</button>
        </div>
        <div className="input">
          {error && <> <h2>{error}</h2> {btn && <button onClick={setErrorHandler}>Cancel</button>}</>}
          {!load && !error&& <h2>Loading...please wait..</h2>}
          {load && <MovieList movies={movies} />}
        </div>

    </React.Fragment>
  );
}

export default App;
