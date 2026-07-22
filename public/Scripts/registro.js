const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("input-lg-nombre");
const inputApellido = document.getElementById("input-lg-apellido");
const inputEmail = document.getElementById("input-lg-email");
const inputPassword = document.getElementById("input-lg-password");

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

    }

});