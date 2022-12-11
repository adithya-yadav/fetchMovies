
function newMovieForm (props){
    return (
        <form>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Title"/>
            <label htmlFor="opening">Opening Text</label>
            <textarea id="textarea"/>
            <label htmlFor="date">Relaese DAte</label>
            <input type="date" id="date" placeholder="date"/>
            <button type="submit">Add Movie</button>
        </form>
    )
}
export default newMovieForm;