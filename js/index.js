(async () => {
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
    let movieSelect = document.querySelector(`#movie-selection`)
    let all = document.querySelector(`#all`)
    let htmlContent = document.querySelector(`#contents`)

movieSelect.addEventListener('change', async function GenreToId() {
        const movies = await getMovies();
        let moviesFiltered = []
        for (let i = 0; i < movies.length; i++) {
            if (movieSelect.value.toLowerCase() === movies[i].genre.toLowerCase()) {
               moviesFiltered.push(movies[i]);
            }
            if (movieSelect.value === all.value){
                moviesFiltered.push(movies[i]);
            }
        }
    let html=''
    for(let i=0; i<moviesFiltered.length; i++){
        tmdbName(moviesFiltered[i].title, (posterUrl) => {
            let htmlContent = document.querySelector(`#contents`);
            html += `
<div class="card">
    <div class="card-inner">
        <div class="card-front">
            <h3 class="title-button">${moviesFiltered[i].title}</h3>
            <img src="${posterUrl}" alt="almost here" class="posters">
            <ul>
         <li>${moviesFiltered[i].year}</li>
         <li>${moviesFiltered[i].director}</li>
         <li>${moviesFiltered[i].rating}</li>
         <li>${moviesFiltered[i].runtime}</li>
         <li>${moviesFiltered[i].genre}</li>
         <li>${moviesFiltered[i].actors}</li>
       </ul>
        </div>
       <div class="card-back">
        </div>
    </div>
   </div>`;
            htmlContent.innerHTML = html;
        })
    }
    });


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
          <div class="card-inner">
          <div class="card-front">
        <h3>${filteredMovies[i].title}</h3>
        <img src="${posterUrl}" alt="yp" class="search-posters" >
        <ul class="search-card-ul">
        <li>${filteredMovies[i].year}</li>
        <li>${filteredMovies[i].director}</li>
        <li>${filteredMovies[i].rating}</li>
        <li>${filteredMovies[i].runtime}</li>
        <li>${filteredMovies[i].genre}</li>
        <li>${filteredMovies[i].actors}</li>
        </ul>
        </div>
        <div class="card-back">
        </div>
        </div>
        
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

    const
        render =  () => {
        getMovies().then((movies) => {
            let html = "";
            for (let i = 0; i < movies.length; i++) {
                tmdbName(movies[i].title, (posterUrl) => {
                    let htmlContent = document.querySelector(`#contents`);
                    html += `
<div class="card">
    <div class="card-inner">
        <div class="card-front">
            <h3 class="title-button">${movies[i].title}</h3>
            <img src="${posterUrl}" alt="almost here" class="posters">
            <ul>
         <li>${movies[i].year}</li>
         <li>${movies[i].director}</li>
         <li>${movies[i].rating}</li>
         <li>${movies[i].runtime}</li>
         <li>${movies[i].genre}</li>
         <li>${movies[i].actors}</li>
       </ul>
        </div>
       <div class="card-back">
        </div>
    </div>
   </div>`
                    htmlContent.innerHTML = html;
                });
            }
        });
    };


    async function getTrailerByTitle(input) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb}&query=${encodeURIComponent(input)}&page=1`)
            .then(response => response.json())
            .then(data => {
                const movieID = data.results[0].id;
                return fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${keys.tmdb}`);
            })
            .then(response => response.json())
            .then(data => {
                const video = data.results[0];
                const videoURL = `https://www.youtube.com/embed/${video.key}`;
                return `<iframe width="500" height="315" src="${videoURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }


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