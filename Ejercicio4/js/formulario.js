// Obtener referencias a los elementos del DOM
const formulario = document.getElementById("formulario");
const btnConsultar = document.getElementById("btnConsultar");
const listaUsuarios = document.getElementById("listaUsuarios");

// Evento para enviar el formulario
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value;

    if (nombre && edad) {
        // Guardar en localStorage
        localStorage.setItem(nombre, edad);

        alert(`Usuario ${nombre} con edad ${edad} ha sido registrado correctamente.`);

        // Limpiar el formulario
        formulario.reset();
    } else {
        alert("Por favor, introduce nombre y edad.");
    }
});

// Evento para consultar usuarios registrados
btnConsultar.addEventListener("click", function () {
    // Limpiar la lista anterior
    listaUsuarios.innerHTML = "";

    // Verificar si hay usuarios registrados
    if (localStorage.length === 0) {
        listaUsuarios.innerHTML = "<p>No hay usuarios registrados.</p>";
        return;
    }

    // Crear título
    const titulo = document.createElement("h3");
    titulo.textContent = "Usuarios registrados:";
    listaUsuarios.appendChild(titulo);

    // Crear lista
    const ul = document.createElement("ul");

    // Recorrer todos los elementos en localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const nombre = localStorage.key(i);
        const edad = localStorage.getItem(nombre);

        const li = document.createElement("li");
        li.textContent = `${nombre}: ${edad} años`;
        ul.appendChild(li);
    }

    listaUsuarios.appendChild(ul);
});
