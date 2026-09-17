// Logout

// Importación de función de "logout()" de "auth.js"    

import { logout } from "./auth.js";

// Obtención de elementos del dom

const btnCerrarSesion = document.getElementById("btn-logout");

// Verificacion de exisistencia de "btnCerrarSesion" y funcíon logout

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
        logout()
        window.location.href = "login.html";
    });
}

