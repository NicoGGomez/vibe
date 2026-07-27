
function iniciarCarrusel(){

    const cards = document.querySelector(".carrusel-cards");

    if (!cards) {
        console.log("No existe carrusel");
        return;
    }


    const originales = [...cards.children];


    // duplicamos
    originales.forEach(card => {
        console.log(card.getBoundingClientRect().width);
        const clon = card.cloneNode(true);
        cards.appendChild(clon);
    });


    let x = 0;
    const velocidad = 0.5;

    let pausado = false;


    cards.addEventListener("mouseenter", () => pausado = true);
    cards.addEventListener("mouseleave", () => pausado = false);


    function calcularAnchoOriginal(){

        let ancho = 0;

        originales.forEach(card => {
            ancho += card.getBoundingClientRect().width;
        });

        const gap = parseInt(getComputedStyle(cards).gap) || 0;

        return ancho + gap * (originales.length - 1);
    }


    let anchoOriginal;


    // Esperamos que rendericen los card-comp
    setTimeout(() => {
        anchoOriginal = calcularAnchoOriginal();

        console.log("ancho carrusel:", anchoOriginal);
        console.log("ancho real:", cards.scrollWidth);

        animar();
    }, 100);


    function animar(){

        if(!pausado && anchoOriginal){

            x += velocidad;


            if (x >= anchoOriginal) {
                cards.style.transition = "none";
                x = 0;
                cards.style.transform = `translate3d(-${x}px,0,0)`;
            }


            cards.style.transform = `translate3d(-${x}px,0,0)`;
        }


        requestAnimationFrame(animar);
    }


    window.addEventListener("load", () => {
        anchoOriginal = calcularAnchoOriginal();
        animar();
    });

}


iniciarCarrusel();
