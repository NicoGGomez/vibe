// Envio de mensaje con el form

// Configuración EmailJS

const EMAILJS_CONFIG = {
    publicKey: "Z1zZWU8mOaSMKb943",
    serviceId: "service_oh3pirn",
    templateId: "template_v9u0n1g"
};

// Inicializar EmailJS

emailjs.init(EMAILJS_CONFIG.publicKey);

// Obtención de elementos del DOM

const form = document.getElementById("contactForm");
const btnEnviar = document.getElementById("btnEnviar");
const formMessage = document.getElementById("form-message");

// Función para envío de mensaje por Email

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Estado enviando

    btnEnviar.disabled = true;

    btnEnviar.querySelector("span").textContent = "Enviando...";


    try {

        await emailjs.sendForm(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            this
        );

        // Éxito

        form.reset();

        formMessage.textContent =
            "✓ Mensaje enviado correctamente.";

        formMessage.className =
            "form-message success";

    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "No pudimos enviar el mensaje. Intentá nuevamente.";

        formMessage.className =
            "form-message error";

    } finally {

        btnEnviar.disabled = false;

        btnEnviar.querySelector("span").textContent =
            "Enviar mensaje";
    }

});
