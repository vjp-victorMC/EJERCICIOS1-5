import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../bares.json'; // Importamos el JSON de bares directamente

// Añadimos las imagenes de los markers manualmente porque webpack no las procesa bien.

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Sobreescribimos la función por defecto que busca las imágenes mal
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});


// 1. Inicializamos el mapa centrado en Caceres.

const map = L.map('map').setView([39.475, -6.372], 14);

// 2. Añadimos capas del mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Procesamos los bares y ponemos marcadores
const bares = data.results.bindings; //Esto es un array de objetos(bares)
bares.forEach(bar => {
    // Obtenemos coordenadas y nombre
    const lat = parseFloat(bar.geo_lat.value); //Obtenemos la latitud
    const lng = parseFloat(bar.geo_long.value); //Obtenemos la longitud
    const nombre = bar.rdfs_label.value; //Obtenemos el nombre

    // Algunos bares pueden tener direcciones, las sacamos si existen
    const calle = bar.schema_address_streetAddress ? bar.schema_address_streetAddress.value : 'Dirección desconocida';

    const telefono = bar.schema_telephone ? bar.schema_telephone.value : 'Desconocido';
    const sirvenComida = bar.om_sirveComida ? bar.om_sirveComida.value : 'Desconocido';

    // Crear marcador
    if (lat && lng) {
        const marker = L.marker([lat, lng]).addTo(map);
        // Añadir popup al hacer click
        marker.bindPopup(`<b>${nombre}</b><br>Telefono: ${telefono}<br>Sirven comida: ${sirvenComida}`);
    }
});
console.log("Mapa cargado con", bares.length, "bares.");