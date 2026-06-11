const hall = document.getElementById("hall");
const count = document.getElementById("count");
const price = document.getElementById("price");
const seatsText = document.getElementById("selected-seats");
const bookBtn = document.getElementById("book-btn");

const ticketType = document.getElementById("ticket-type");
const movieTime = document.getElementById("movie-time");

const movieId =
    localStorage.getItem("currentMovie") || "default";

let selectedSeats = [];

const prices = {
    regular: 1500,
    student: 1000,
    pensioner: 800
};

function storageKey() {
    return `tickets_${movieId}_${movieTime.value}`;
}

function renderHall() {

    hall.innerHTML = "";

    for(let i = 1; i <= 96; i++) {

        const seat = document.createElement("div");

        seat.classList.add("seat");

        seat.dataset.id = i;

        hall.appendChild(seat);
    }

    loadOccupiedSeats();
}

function loadOccupiedSeats() {

    const tickets =
        JSON.parse(
            localStorage.getItem(storageKey())
        ) || [];

    document
        .querySelectorAll(".seat")
        .forEach(seat => {

            const id = seat.dataset.id;

            const occupied =
                tickets.some(ticket =>
                    ticket.seats.includes(id)
                );

            seat.classList.remove("occupied");

            if(occupied) {
                seat.classList.add("occupied");
            }
        });
}

function updateInfo() {

    count.textContent =
        selectedSeats.length;

    price.textContent =
        selectedSeats.length *
        prices[ticketType.value];

    seatsText.textContent =
        selectedSeats.length
            ? selectedSeats.join(", ")
            : "Нет";
}

hall.addEventListener("click", e => {

    if(
        !e.target.classList.contains("seat") ||
        e.target.classList.contains("occupied")
    ) return;

    const seatId = e.target.dataset.id;

    e.target.classList.toggle("selected");

    if(selectedSeats.includes(seatId)) {

        selectedSeats =
            selectedSeats.filter(
                id => id !== seatId
            );

    } else {

        selectedSeats.push(seatId);
    }

    updateInfo();
});

ticketType.addEventListener(
    "change",
    updateInfo
);

movieTime.addEventListener(
    "change",
    () => {

        selectedSeats = [];

        document
            .querySelectorAll(".seat")
            .forEach(seat =>
                seat.classList.remove("selected")
            );

        updateInfo();
        loadOccupiedSeats();
    }
);

bookBtn.addEventListener("click", () => {

    if(!selectedSeats.length) {

        alert("Выберите места");

        return;
    }

    const tickets =
        JSON.parse(
            localStorage.getItem(storageKey())
        ) || [];

    tickets.push({
        seats: [...selectedSeats],
        type: ticketType.value,
        time: movieTime.value,
        price:
            selectedSeats.length *
            prices[ticketType.value]
    });

    localStorage.setItem(
        storageKey(),
        JSON.stringify(tickets)
    );

    alert("Бронирование успешно");

    renderHall();

    selectedSeats = [];

    updateInfo();
});

renderHall();
updateInfo();