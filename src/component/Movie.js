import "./Movie.css"
const Movie =(props)=>{
    return (
        <>
        <li>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p>
        </li>
        <button onClick={() => props.deleteHandler(props.id)}>Delete Movie</button>
        </>
    )
}

export default Movie;