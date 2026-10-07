// Función para mostrar errores

const mostrarError = (mensaje) => {

    const divError =
        document.getElementById("msg-error");

    divError.textContent = mensaje;
    divError.style.display = "block";

    setTimeout(() => {
        divError.style.display = "none";
    }, 3000);

};

// Función para mostrar el modal de confirmación

function mostrarConfirmacion() {
    return new Promise((resolve) => {

        const modal = document.getElementById("modal-confirmacion");
        const btnCancelar = document.getElementById("btn-cancelar");
        const btnConfirmar = document.getElementById("btn-confirmar");

        modal.style.display = "flex";

        btnCancelar.onclick = () => {
            modal.style.display = "none";
            resolve(false);
        };

        btnConfirmar.onclick = () => {
            modal.style.display = "none";
            resolve(true);
        };
    });
}

// Exportación de funciones

export {
    mostrarError,
    mostrarConfirmacion
};