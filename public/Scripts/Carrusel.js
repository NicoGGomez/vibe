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

    // Pausar con el mouse 

    carrusel.addEventListener("mouseenter", () => {
        pausado = true;
    });

    carrusel.addEventListener("mouseleave", () => {
        pausado = false;
    });

    // Función para animar el carrusel

    function animar() {

        if (!pausado) {

            posicion += velocidad;

            const primeraCard = carrusel.children[0];


            if (primeraCard) {

                const estilos = getComputedStyle(carrusel);
                const gap = parseFloat(estilos.gap) || 0;

                const anchoCard =
                    primeraCard.getBoundingClientRect().width;

                if (posicion >= anchoCard + gap) {

                    carrusel.appendChild(primeraCard);

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