const ticketsList =
    document.getElementById("tickets-list")

let allTickets = []

for(let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i)

    if(key.startsWith("tickets_")) {

        const tickets =
            JSON.parse(
                localStorage.getItem(key)
            ) || []

        tickets.forEach(ticket => {

            allTickets.push({
                key,
                ...ticket
            })

        })

    }

}

if(allTickets.length === 0) {

    ticketsList.innerHTML = `
        <div class="empty-tickets">
            <h3>🎬 Билетов пока нет</h3>
            <p>
                Перейдите в афишу и
                забронируйте фильм
            </p>
        </div>
    `

}
else {

    allTickets.forEach((ticket,index) => {

        ticketsList.innerHTML += `

            <div class="ticket-card">

                <h3>
                    🎟 Билет №${index + 1}
                </h3>

                <p>
                    Места:
                    ${ticket.seats.join(", ")}
                </p>

                <p>
                    Стоимость:
                    ${ticket.price} ₸
                </p>

                <p>
                    Время:
                    ${ticket.time || "-"}
                </p>

            </div>

        `
    })
}

document
.getElementById("clear-btn")
.addEventListener("click", () => {

    if(
        !confirm(
            "Удалить все билеты?"
        )
    ) return

    const keys = []

    for(let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i)

        if(key.startsWith("tickets_")) {

            keys.push(key)
        }
    }

    keys.forEach(key =>
        localStorage.removeItem(key)
    )

    location.reload()
})