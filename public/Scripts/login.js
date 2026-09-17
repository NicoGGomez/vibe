// Login

// Importación de función de "getUsuario()" de "auth.js"    

import { getUsuario } from "./auth.js";

// Obtención de usuario y verificación de que este logueado

const usuario = getUsuario();

if (usuario) {
    window.location.replace("perfil.html");
    throw new Error("Ya estas logueado");
}

// Obtención de elementos del DOM

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("input-lg-email");
const inputPassword = document.getElementById("input-lg-password");
const divError = document.getElementById("msg-error");

// Función de envío de form de login de usuario

formLogin.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const respuesta = await fetch("https://vibe-n9dy.onrender.com/usuarios/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                emailUsuario: inputEmail.value,
                passwordUsuario: inputPassword.value
            })
        });

        const data = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(data.error);
        }

        localStorage.setItem("token", data.token);

        localStorage.setItem(
            "usuario",
            JSON.stringify(data.usuario)
        );

        console.log(data);

        window.location.href = "index.html";

    } catch (error) {

        console.log("Error al iniciar sesion:", error);
        divError.textContent = error.message;
        divError.style.display = "block";

        setTimeout(() => {
            divError.style.display = "none";
        }, 3000);

    }

});