// Envio de mensaje con el form

// Configuración EmailJS

const EMAILJS_CONFIG = {
    serviceId: "service_hftcuvs",
    publicKey: "mNu2h0FBQDg5YeOqs",
    orderTamplateId: "template_lzt3hyt",
    contactTemplateId: "template_8tacez1"
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
            EMAILJS_CONFIG.contactTemplateId,
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
