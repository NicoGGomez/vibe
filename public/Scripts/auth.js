export function getToken() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
}

export function getUsuario() {
    const token = getToken();

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
}