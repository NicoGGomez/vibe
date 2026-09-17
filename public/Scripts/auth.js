// Auth

// Función para obtener los token

export function getToken() {
    return localStorage.getItem("token");
}

// Función para eliminar el token

export function logout() {
    localStorage.removeItem("token");
}

// Función para obtener un usuario y verificar el estado del token

export function getUsuario() {
    const token = getToken();

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
}