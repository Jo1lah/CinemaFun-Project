// Форма обратной связи
const form =
    document.getElementById("contact-form");

// Отправка формы
form.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Сообщение отправлено!");

    form.reset();

});