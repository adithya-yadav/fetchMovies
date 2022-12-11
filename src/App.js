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
      const res = await fetch("https://movie-ea7b0-default-rtdb.firebaseio.com/movies.json");
      if(!res.ok){
        setTimeout(()=>{
          setBtn(true)
        },5000)
        throw new Error("SomeThing went wrong... Retrying")
      }
      const data = await res.json();
      const loadedMovies = []
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          opening:data[key].opening,
          date:data[key].date,
        })
      }
      const transformedMovies = loadedMovies.map((movieData) => {
        return {
          id: movieData.id,
          title: movieData.title,
          openingText: movieData.opening,
          releaseDate: movieData.date,
        };
      });
      setLoad(true)
      setMovies(transformedMovies);
    }catch(err){
      setError(err.message)
    }
    
  }

  async function deleteHandler(id){
    try{
        const res =await fetch(`https://movie-ea7b0-default-rtdb.firebaseio.com/movies/${id}.json`, {
            method: 'DELETE',
            headers:{
                "content-type":"application/json"
              }
        })
        fetchMoviesHandler()
        return res;
    }catch(err){
        console.log(err)
    }
}

  async function onClickAddNote(){
    const title = titleRef.current.value
    const opening = openingRef.current.value
    const date = dateRef.current.value
    const newMovieObj = {
      title,
      date,
      opening
    }
    const res =await fetch("https://movie-ea7b0-default-rtdb.firebaseio.com/movies.json",{
      method:"POST",
      body:JSON.stringify(newMovieObj),
      headers:{
        "content-type":"application/json"
      }
    })
    const data = await res.json();
    fetchMoviesHandler(); 
    console.log(data)
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
          {load && <MovieList movies={movies} deleteHandler={deleteHandler}/>}
        </div>

    </React.Fragment>
  );
}

export default App;
