// Блок с информацией о фильме
const movieInfo =
    document.getElementById("movie-info");

// ID фильма
const movieId =
    localStorage.getItem("movieId");


// Получение данных о фильме
async function getMovie() {

    try {

        const response = await fetch(
            `https://api.tvmaze.com/shows/${movieId}`
        );

        const movie =
            await response.json();

        showMovie(movie);

    } catch (error) {

        console.log(error);

    }

}


// Вывод информации на страницу
function showMovie(movie) {

    movieInfo.innerHTML = `

        <div class="movie-page">

            <img
                src="${movie.image.original}"
                alt="${movie.name}"
            >

            <div>

                <h2>${movie.name}</h2>

                <p>
                    ⭐ Рейтинг:
                    ${movie.rating.average || "Нет"}
                </p>

                <p>
                    🎭 Жанры:
                    ${movie.genres.join(", ")}
                </p>

                <p>
                    📅 Премьера:
                    ${movie.premiered}
                </p>

                <div class="movie-summary">
                    ${movie.summary}
                </div>

                <button onclick="goBooking()">
                    🎟 Забронировать билет
                </button>

            </div>

        </div>

    `;
}


// Переход на страницу бронирования
function goBooking() {

    window.location.href =
        "booking.html";

}


// Загрузка фильма
getMovie();