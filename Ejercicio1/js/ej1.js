
// Variables globales del mapa y el marcador
let map = null;
let marker = null;

// Función callback para cuando obtenemos la posición
function posicionRecibida(posicion) {
    const lat = posicion.coords.latitude;
    const lng = posicion.coords.longitude;
 
    // Si el mapa no existe, lo creamos (solo la primera vez)
    if (!map) {
        map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("<img src='images/persona.jpg' width='80' height='50'>").openPopup();
    } else {
        // En intervalos sucesivos, solo actualizamos coordenadas
        marker.setLatLng([lat, lng]);
        map.panTo([lat, lng]);
    }
}

// Función para pedir la posición
function actualizarPosicion() {
    navigator.geolocation.getCurrentPosition(posicionRecibida, (err) => {
        console.error("Error de geolocalización: ", err);
    });
}

// Ejecutar inmediatamente al cargar
actualizarPosicion();

// Programar la ejecución cada 30 segundos (30000 ms)
setInterval(actualizarPosicion, 30000);




