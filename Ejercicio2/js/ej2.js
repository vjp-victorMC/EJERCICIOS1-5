// Función callback para cuando obtenemos la posición
function posicionRecibida(posicion) {
    const lat = posicion.coords.latitude;
    const lng = posicion.coords.longitude;

    //Variable para guardar el mapa

    let map = L.map('map').setView([lat, lng], 13);

    //Añadimos la capa de las calles

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //Marcadores

    //Ayuntamiento

    let markerAyuntamiento = L.marker([40.03000665881377, -6.0897018276292325]).addTo(map);
    markerAyuntamiento.bindPopup('<b>Ayuntamiento de Plasencia</b><br>El ayuntamiento de la ciudad<br><a href="https://www.plasencia.es/web/">Web</a>');
    //Piscina

    let circuloPiscina = L.circle([40.04492422690999, -6.084636685868889], { color: 'blue', fillColor: 'rgba(0, 58, 217, 1)', fillOpacity: 0.5, radius: 50 }).addTo(map);
    circuloPiscina.bindPopup('<b>Piscina Bioclimatica</b><br>La piscina de la ciudad<br><a href="https://deportes.aytoplasencia.es/">Web</a>');

    //Instituto

    let poligonoInstituto = L.polygon([[40.04333404099771, -6.086615946094051], [40.04286277602809, -6.085858594400963], [40.0424994558295, -6.087180281562657], [40.04282511274924, -6.0875455542038015]], { color: 'blue', fillColor: 'rgba(0, 58, 217, 1)', fillOpacity: 0.5 }).addTo(map);
    poligonoInstituto.bindPopup('<b>Instituto IES VALLE DEL JERTE</b><br>Instituo de educacion secundaria, bachillerato y formacion profesional<br><a href="https://iesvallejertepla.educarex.es/">Web</a>');

    //Estacion de trenes

    let poligonoEstacion = L.polygon([[40.0249015363365, -6.0989161379696295], [40.02468920144816, -6.098276965801131], [40.02043487307327, -6.100037296949318], [40.02124830294582, -6.1004985715900295]], { color: 'blue', fillColor: 'rgba(0, 58, 217, 1)', fillOpacity: 0.5 }).addTo(map);
    poligonoEstacion.bindPopup('<b>Estacion de trenes</b><br>Estacion de trenes RENFE<br><a href="https://www.renfe.com/es/es/inspirate/estaciones/estacion-plasencia">Web</a>');

}
//Pedir localizacion y mostrar el mapa con los marcadores(gestionando errores en caso de existir y mostrando un mensaje por consola)

navigator.geolocation.getCurrentPosition(posicionRecibida, (err) => {
    switch (err.code) {
        case err.PERMISSION_DENIED:
            console.error("Permiso denegado");
            break;
        case err.POSITION_UNAVAILABLE:
            console.error("Posicion no disponible");
            break;
        case err.TIMEOUT:
            console.error("Timeout");
            break;
        default:
            console.error("Error de geolocalización: ", err);
    }
});
