// Carga 

// Función para generar el esquelto una card de producto

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

// Función para mostrar el esqueleto generado

export function mostrarCarga(...contenedores) {
    const skeletons = Array(8).fill(generarSkeleton()).join("");

    contenedores.forEach(contenedor => {
        if (contenedor) {
            contenedor.innerHTML = skeletons;
        }
    });
}