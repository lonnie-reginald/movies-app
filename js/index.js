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




// Search function
    const searchMovies = async (searchValue) => {
        let filteredMovies = [];
        let allMovies = await getMovies();
        for (let movie of allMovies) {
            if ((searchValue).toLowerCase().startsWith((movie.title).toLowerCase())) {
                filteredMovies.push(movie);
            }
        }
        return filteredMovies;
    };

// Filter function
    const filterMovies = async (filterValue) => {
        const movies = await getMovies();
        let filteredMovies = [];
        for (let i = 0; i < movies.length; i++) {
            if (filterValue.toLowerCase() === movies[i].genre.toLowerCase()) {
                filteredMovies.push(movies[i]);
            }
            if (filterValue === all.value){
                filteredMovies.push(movies[i]);
            }
        }
        return filteredMovies;
    };

// Render function
    const render = (movies) => {
        let html = "";
        for (let i = 0; i < movies.length; i++) {
            tmdbName(movies[i].title, (posterUrl) => {
                let htmlContent = document.querySelector(`#contents`);
                html += `
<div class="card">
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
   </div>`
                htmlContent.innerHTML = html;
            });
        }
    };

    // Get Name from ID
    async function nameToId(movieTitle) {
        const movies = await getMovies();
        for (let i = 0; i < movies.length; i++) {
            if (movieTitle === movies[i].title) {
                console.log(movies[i].id);
                return movies[i].id;
            }
        }
    }


    //Get Trailer
    async function getTrailerByTitle(input) {
        try {
            const response1 = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb}&query=${encodeURIComponent(input)}&page=1`);
            const data1 = await response1.json();
            const movieID = data1.results[0].id;

            const response2 = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${keys.tmdb}`);
            const data2 = await response2.json();

            const video = data2.results[0];
            const videoURL = `https://www.youtube.com/embed/${video.key}`;

            return `<iframe width="750" height="415" src="${videoURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture" allowfullscreen></iframe>`;
        } catch (error) {
            console.error("Error:", error);
        }
    }



    //Get Poster
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



    //ADD MOVIE
    addButton.addEventListener("click", async (e) => {
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
        await addMovie(add)
        let movies = await getMovies()
        render(movies)
    })


    //DELETE MOVIE
    deleteButton.addEventListener(`click`, async (e) => {
        e.preventDefault()

        let id = await nameToId(title.value)
        console.log(id)

        let movieObj = {
            id: id
        }

        await deleteMovie(movieObj)
        let movies = await getMovies()
        render(movies)

    });


    //UPDATE MOVIE
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

        await updateMovie(update)
        let movies = await getMovies()
        render(movies)

    })



    // Search BUTTON
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
                let trailer = await getTrailerByTitle(filteredMovies[i].title);
                    let htmlContent = document.querySelector(`#searched-movie`)
                    htmlContent.innerHTML = `
         <div id="search-card">
            <h3>${filteredMovies[i].title}</h3>
            ${trailer}
        <ul class="search-card-ul">
            <li>${filteredMovies[i].year}</li>
            <li>${filteredMovies[i].director}</li>
            <li>${filteredMovies[i].rating}</li>
            <li>${filteredMovies[i].runtime}</li>
            <li>${filteredMovies[i].genre}</li>
            <li>${filteredMovies[i].actors}</li>
        </ul>
         </div>`
            }
        }
    });


// Filter select event listener
    movieSelect.addEventListener('change', async function () {
        let filteredMovies = await filterMovies(movieSelect.value);
        render(filteredMovies);
    });

    //PAGE RENDER
    render(await getMovies());

})();