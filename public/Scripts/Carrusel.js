// Carrusel infinito

function iniciarCarrusel() {

    const carrusel = document.querySelector(".carrusel-cards");

    if (!carrusel) {
        console.log("No existe carrusel");
        return;
    }

    let posicion = 0;
    const velocidad = 0.7;

    let pausado = false;


    // =========================
    // PAUSAR CON EL MOUSE
    // =========================

    carrusel.addEventListener("mouseenter", () => {
        pausado = true;
    });

    carrusel.addEventListener("mouseleave", () => {
        pausado = false;
    });


    // =========================
    // ANIMACIÓN
    // =========================

    function animar() {

        if (!pausado) {

            posicion += velocidad;


            /*
             * Miramos la primera card.
             */
            const primeraCard = carrusel.children[0];


            if (primeraCard) {

                const estilos = getComputedStyle(carrusel);
                const gap = parseFloat(estilos.gap) || 0;

                const anchoCard =
                    primeraCard.getBoundingClientRect().width;


                /*
                 * Cuando la primera card salió
                 * completamente de la pantalla...
                 */
                if (posicion >= anchoCard + gap) {

                    /*
                     * Sacamos la primera card
                     * y la mandamos al final.
                     */
                    carrusel.appendChild(primeraCard);


                    /*
                     * Compensamos el movimiento.
                     *
                     * De esta forma no hay salto.
                     */
                    posicion -= anchoCard + gap;

                }
            }


            carrusel.style.transform =
                `translate3d(-${posicion}px, 0, 0)`;
        }


        requestAnimationFrame(animar);
    }


    animar();
}


iniciarCarrusel();