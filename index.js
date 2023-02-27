var menu = document.getElementById("main-menu");
var menuBar = document.querySelector(".menu");
var button = document.querySelector(".hamburger-btn");
var hamburgerMenu =document.querySelector(".hamburger-menu");

button.onclick = hamburgerButtonClick 
function hamburgerButtonClick() {
    if (button.getAttribute("aria-expanded") == "false") {
        button.setAttribute("aria-expanded", "true");
        hamburgerMenu.classList.add("show-menu");
    } else {
        button.setAttribute("aria-expanded", "false");
        hamburgerMenu.classList.remove("show-menu");
    }
    document.onclick = function(e) {
        console.log("hamburger click")
       if(!menuBar.contains(e.target)){
            button.setAttribute("aria-expanded", "false");
            hamburgerMenu.classList.remove("show-menu");
        } 
    }
    document.onkeyup = function (e){
        console.log("escape")
        if(e.key == "Escape"){
        hamburgerMenu.classList.remove("show-menu");
        button.focus();
        }
    }
}
