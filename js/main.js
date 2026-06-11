const menuBtn =
    document.getElementById("menu-btn")

const menu =
    document.getElementById("menu")

if(menuBtn){

    menuBtn.addEventListener("click", function(){

        menu.classList.toggle("show")

    })

}
