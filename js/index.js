(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    let addButton = document.querySelector(`#add-button`)
    let addTitle=document.querySelector(`#add-movie-name`)
    let addYear=document.querySelector(`#add-year`)
    let addDirector=document.querySelector(`#add-director`)
    let addRating=document.querySelector(`#add-rating`)
    let addRuntime=document.querySelector(`#add-runtime`)
    let addGenre=document.querySelector(`#add-genre`)
    let addActors=document.querySelector(`#add-actors`)

    let updateButton = document.querySelector(`#update-button`)
    let updateID=document.querySelector(`#update-ID`)
    let updateTitle=document.querySelector(`#update-movie-name`)
    let updateYear=document.querySelector(`#update-year`)
    let updateDirector=document.querySelector(`#update-director`)
    let updateRating=document.querySelector(`#update-rating`)
    let updateRuntime=document.querySelector(`#update-runtime`)
    let updateGenre=document.querySelector(`#update-genre`)
    let updateActors=document.querySelector(`#update-actors`)

    let deleteButton = document.querySelector(`#delete-button`)
    let deleteMovieName = document.querySelector(`#delete-movie-name`)


    const render = () =>{
        getMovies().then(
            (movies) => {
                let html = ``
                for(let i = 0; i < movies.length; i++){
                    console.log(movies[i])
                    let htmlContent = document.querySelector(`#contents`)
                    html += `

        <div>
        <ul>
        <li>${movies[i].title}</li>
        <li>${movies[i].year}</li>
        <li>${movies[i].director}</li>
        <li>${movies[i].rating}</li>
        <li>${movies[i].runtime}</li>
        <li>${movies[i].genre}</li>
        <li>${movies[i].actors}</li>
        </ul>
        </div>`
                    htmlContent.innerHTML = html
                }
            }
        );
    }

    addButton.addEventListener("click", (e) => {
        e.preventDefault()
        let add = {
            title: `${addTitle.value}`,
            year: `${addYear.value}`,
            director: `${addDirector.value}`,
            rating: `${addRating.value}`,
            runtime: `${addRuntime.value}`,
            genre: `${addGenre.value}`,
            actors: `${addActors.value}`,
        }

        console.log(add)
        addMovie(add).then(render)

    })


    deleteButton.addEventListener(`click`, (e) => {
        e.preventDefault()
        let movieObj = {
            id: deleteMovieName.value
        }
        deleteMovie(movieObj).then(render);

    });


    updateButton.addEventListener("click", (e) => {
        e.preventDefault()
        let update = {
            title: `${updateTitle.value}`,
            year: `${updateYear.value}`,
            director: `${updateDirector.value}`,
            rating: `${updateRating.value}`,
            runtime: `${updateRuntime.value}`,
            genre: `${updateGenre.value}`,
            actors: `${updateActors.value}`,
            id: `${updateID.value}`,
        }

        updateMovie(update).then(render)

    })

render()

})();