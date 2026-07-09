const form = document.querySelector('form.cont');
console.log(form);

fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: {
        'Content-Type': 'application/json'
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = data.get('name')
    const password = data.get('password')

    if(name == "admin" && password == "1234"){
        window.location.href = "index.html/edicion";
    } else {
        window.location.href = "login.html";
    }
});

