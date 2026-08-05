export function generarSkeleton() {
    return `
        <div class="card-skeleton">
            <div class="skeleton-img"></div>
            <div class="skeleton-text titulo"></div>
            <div class="skeleton-text precio"></div>
            <div class="skeleton-btn"></div>
        </div>
    `;
}

// export function mostrarCarga(contenedorCards, contenedor) {
//     const skeletons = Array(8).fill(generarSkeleton()).join("");

//     if (contenedorCards) {
//         contenedorCards.innerHTML = skeletons;
//     }

//     if (contenedor) {
//         contenedor.innerHTML = skeletons;
//     }
// }

export function mostrarCarga(...contenedores) {
    const skeletons = Array(8).fill(generarSkeleton()).join("");

    contenedores.forEach(contenedor => {
        if (contenedor) {
            contenedor.innerHTML = skeletons;
        }
    });
}