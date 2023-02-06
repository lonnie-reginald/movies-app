(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    let addButton = document.querySelector(`#add-button`)
    let updateButton = document.querySelector(`#update-button`)
    let deleteButton = document.querySelector(`#delete-button`)
    let searchButton = document.querySelector(`#search-button`)


    let title = document.querySelector(`#movie-name`)
    let year = document.querySelector(`#movie-year`)
    let director = document.querySelector(`#movie-director`)
    let rating = document.querySelector(`#movie-rating`)
    let runtime = document.querySelector(`#movie-runtime`)
    let genre = document.querySelector(`#movie-genre`)
    let actors = document.querySelector(`#movie-actors`)
    let search = document.querySelector(`#search-bar`)


searchButton.addEventListener(`click`,async ()=>{

    let filteredMovies=[];
    let allMovies=await getMovies()
    for(let movie of allMovies) {
        if ((search.value).toLowerCase().startsWith((movie.title).toLowerCase())) {
            filteredMovies.push(movie);
            console.log(filteredMovies[0])
        }
        for (let i = 0; i < filteredMovies.length; i++) {
            console.log(filteredMovies[i].title)
            tmdbName(filteredMovies[i].title, (posterUrl) => {

            let htmlContent = document.querySelector(`#searchedMovie`)
            htmlContent.innerHTML = `
         <div id="searchCard">
        <h3>${filteredMovies[i].title}</h3>
        <img src="${posterUrl}" alt="yp" class="search-posters" >
        <ul>
        <li>${filteredMovies[i].year}</li>
        <li>${filteredMovies[i].director}</li>
        <li>${filteredMovies[i].rating}</li>
        <li>${filteredMovies[i].runtime}</li>
        <li>${filteredMovies[i].genre}</li>
        <li>${filteredMovies[i].actors}</li>
        </ul>
         </div>`
        })
    }
    }
});

    async function nameToId(movieTitle) {
        const movies = await getMovies();
        for (let i = 0; i < movies.length; i++) {
            if (movieTitle === movies[i].title) {
                console.log(movies[i].id);
                return movies[i].id;
            }
        }
    }


    // const render = () =>{
    //     getMovies().then(
    //         (movies) => {
    //             let html = ``
    //             for(let i = 0; i < movies.length; i++){
    //                 console.log(movies[i].title)
    //                 let htmlContent = document.querySelector(`#contents`)
    //                 html += `
    //     <div class="card">
    //
    //     <h3>${movies[i].title}</h3>
    //     <img src="" alt="almost here">
    //     <ul>
    //     <li>${movies[i].year}</li>
    //     <li>${movies[i].director}</li>
    //     <li>${movies[i].rating}</li>
    //     <li>${movies[i].runtime}</li>
    //     <li>${movies[i].genre}</li>
    //     <li>${movies[i].actors}</li>
    //
    //     </ul>
    //     </div>`
    //
    //
    //
    //                 // htmlContent.style.backgroundImage = `url(${})`
    //                 htmlContent.innerHTML = html
    //             }
    //         }
    //     );
    // }

    const
        render = () => {
        getMovies().then((movies) => {
            let html = "";
            for (let i = 0; i < movies.length; i++) {
                tmdbName(movies[i].title, (posterUrl) => {
                    let htmlContent = document.querySelector(`#contents`);
                    html += `
        <div class="card">
          <h3>${movies[i].title}</h3>
          <img src="${posterUrl}" alt="almost here" class="posters">
          <ul>
            <li>${movies[i].year}</li>
            <li>${movies[i].director}</li>
            <li>${movies[i].rating}</li>
            <li>${movies[i].runtime}</li>
            <li>${movies[i].genre}</li>
            <li>${movies[i].actors}</li>
          </ul>
        </div>`;
                    htmlContent.innerHTML = html;
                });
            }
        });
    };
    function tmdbName(input, callback) {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb}&query=${encodeURIComponent(input)}&page=1`)
            .then((response) => response.json())
            .then((data) => {
                let posterPath = data.results[0].poster_path;
                let posterUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`;
                callback(posterUrl);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    addButton.addEventListener("click", (e) => {
        e.preventDefault()
        let add = {
            title: `${title.value}`,
            year: `${year.value}`,
            director: `${director.value}`,
            rating: `${rating.value}`,
            runtime: `${runtime.value}`,
            genre: `${genre.value}`,
            actors: `${actors.value}`,
        }

        console.log(add)
        addMovie(add).then(render)

    })


    deleteButton.addEventListener(`click`, async (e) => {
        e.preventDefault()

        let id = await nameToId(title.value)
        console.log(id)

        let movieObj = {
            id: id
        }

        deleteMovie(movieObj).then(render);

    });


    updateButton.addEventListener("click", async (e) => {
        e.preventDefault()
        let id = await nameToId(title.value)
        console.log(id)

        let update = {
            title: `${title.value}`,
            year: `${year.value}`,
            director: `${director.value}`,
            rating: `${rating.value}`,
            runtime: `${runtime.value}`,
            genre: `${genre.value}`,
            actors: `${actors.value}`,
            id: `${id}`
        }

        updateMovie(update).then(render)

    })

render()

})();