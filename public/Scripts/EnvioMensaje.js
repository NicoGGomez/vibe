// Envio de mensaje con el form

// Obtención de elementos del DOM

const form = document.getElementById("contactForm");

// Función para envío de mensaje por Email

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Mover a .env 
    emailjs.sendForm(
        "service_oh3pirn",
        "template_v9u0n1g",
        this
    )
    .then(() => {
        alert("Mensaje enviado correctamente.");
        form.reset();
    })
    .catch((error) => {
        console.error(error);
        alert("Error al enviar el mensaje.");
    });
});