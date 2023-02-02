(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    let addButton = document.querySelector(`#add-button`)
    let addTitle=document.querySelector(`#add-movie-name`)
    let addYear=document.querySelector(`#add-year`)
    // let addDirector=document.querySelector(`#add-director`)
    let addRating=document.querySelector(`#add-rating`)
    let addRuntime=document.querySelector(`#add-runtime`)
    let addDirector=document.querySelector(`#add-director`)
    let deleteButton = document.querySelector(`#delete-button`)
    let deleteMovieQ = document.querySelector(`#delete-movie-name`)

    deleteButton.addEventListener(`click`, (e) => {
        e.preventDefault()
        let movi = {
            id: deleteMovieQ.value
        }
        deleteMovie(movi);

        getMovies().then((movies) => {
            let html = ``
            for (let movie of movies) {
                console.log(movie)
                let htmlContent = document.querySelector(`#contents`)
                html += `

        <div>
        <ul>
        <li>${movie.title}</li>
        <li>${movie.year}</li>
        <li>${movie.director}</li>
        <li>${movie.rating}</li>
        <li>${movie.runtime}</li>
        <li>${movie.genre}</li>
        <li>${movie.actors}</li>
        </ul>
        </div>`
            htmlContent.innerHTML = html
            }

         });


    });


    getMovies().then((movies) => {
        let html = ``
        for (let movie of movies) {
            console.log(movie)
            let htmlContent = document.querySelector(`#contents`)
            html += `
    <div>
    <ul>
    <li>${movie.title}</li>
    <li>${movie.year}</li>
    <li>${movie.director}</li>
    <li>${movie.rating}</li>
    <li>${movie.runtime}</li>
    <li>${movie.genre}</li>
    <li>${movie.actors}</li>
    </ul>
    </div>`
            htmlContent.innerHTML = html
        }

    });
})();