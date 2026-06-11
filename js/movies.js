const moviesDiv = document.getElementById("movies")
const searchInput = document.getElementById("search")

let movies = []

async function getMovies() {

    try {

        const response = await fetch(
            "https://api.tvmaze.com/shows"
        )

        const data = await response.json()

        movies = data.slice(0, 30)

        showMovies(movies)

    } catch (error) {

        console.log(error)

    }

}

function showMovies(list) {

    moviesDiv.innerHTML = ""

    list.forEach(movie => {

        const rating =
            movie.rating.average || "Нет"

        moviesDiv.innerHTML += `
            <div class="movie-card">

                <img
                    src="${movie.image.medium}"
                    alt="${movie.name}"
                >

                <h3>${movie.name}</h3>

                <p>⭐ ${rating}</p>

                <button
                    onclick="openMovie(${movie.id})"
                >
                    Подробнее
                </button>

            </div>
        `
    })

}

function openMovie(id) {

    localStorage.setItem(
        "movieId",
        id
    )

    window.location.href =
        "movie.html"

}

searchInput.addEventListener(
    "input",
    function () {

        const text =
            this.value.toLowerCase()

        const filtered =
            movies.filter(movie =>
                movie.name
                    .toLowerCase()
                    .includes(text)
            )

        showMovies(filtered)

    }
)

getMovies()