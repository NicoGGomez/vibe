import { logout } from "./auth.js";

const btnCerrarSesion = document.getElementById("btn-logout");

btnCerrarSesion.addEventListener("click", () => {
    logout()
    window.location.href = "login.html";
});