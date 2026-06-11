const addBtn = document.getElementById("add-btn");
const putBtn = document.getElementById("put-btn");
const patchBtn = document.getElementById("patch-btn");


addBtn.addEventListener("click", async function() {

    const name =
        document.getElementById("movie-name").value

    try {

        const response = await fetch(
            "https://dummyjson.com/posts/add",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    title: name
                })
            }
        )

        const data =
            await response.json()

        console.log(data)

        alert("Фильм добавлен")

    } catch (error) {

        console.log(error)

    }

})


// PUT

putBtn.addEventListener("click", async function() {

    const id =
        document.getElementById("put-id").value

    const name =
        document.getElementById("put-name").value

    try {

        const response = await fetch(
            `https://dummyjson.com/posts/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    title: name
                })
            }
        )

        const data =
            await response.json()

        console.log(data)

        alert("Данные обновлены")

    } catch (error) {

        console.log(error)

    }

})


// PATCH

patchBtn.addEventListener("click", async function() {

    const id =
        document.getElementById("patch-id").value

    const rating =
        document.getElementById("patch-rating").value

    try {

        const response = await fetch(
            `https://dummyjson.com/posts/${id}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    rating: rating
                })
            }
        )

        const data =
            await response.json()

        console.log(data)

        alert("Рейтинг обновлен")

    } catch (error) {

        console.log(error)

    }

})