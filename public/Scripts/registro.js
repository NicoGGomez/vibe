// Registro

// Importación de función de "logout()" de "auth.js"    

import { getUsuario } from "./auth.js";

// Obtención de usuario y verificación de que este logueado

const usuario = getUsuario();

if (usuario) {
    window.location.replace("perfil.html");
    throw new Error("Ya estas logueado");
}

// Obtención de elementos del dom 

const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("input-lg-nombre");
const inputApellido = document.getElementById("input-lg-apellido");
const inputEmail = document.getElementById("input-lg-email");
const inputPassword = document.getElementById("input-lg-password");
const divError = document.getElementById("msg-error");

// Función de envío de form de registro de usuario

formRegistro.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {


        const respuesta = await fetch("https://vibe-n9dy.onrender.com/usuarios/registro",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nombreUsuario: inputNombre.value,
                apellidoUsuario: inputApellido.value,
                emailUsuario: inputEmail.value,
                passwordUsuario: inputPassword.value
            })
        });

        const data = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(data.error);
        }

        console.log(data);

        window.location.href = "login.html";

    } catch (error) {

        console.log("Error al cargar el usuario:", error);
        divError.textContent = error.message;
        divError.style.display = "block";

        setTimeout(() => {
            divError.style.display = "none";
        }, 3000);

    }

});