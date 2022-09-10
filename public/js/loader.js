const loader = document.getElementById("preloader");

function LoaderVanish() {
    // loader.style.opacity = "0.0";
    loader.style.display = "none";
}
setTimeout(LoaderVanish, 1850);
const Blood = document.getElementById("BloodMoney");

function DropDown() {
    Blood.style.display = 'block';
}

function DropUp() {
    Blood.style.display = 'none';
}
