const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

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