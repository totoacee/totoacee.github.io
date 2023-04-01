// coordenadas de las direcciones
var direccion1 = [-34.5150816, -58.5117969];
var direccion2 = [-34.5052785, -58.4995933];
var mymap;

// crea el mapa
document.addEventListener('DOMContentLoaded', function() {
  mymap = L.map('map').setView([-34.51009, -58.5117969], 14);

  // agrega el mapa base
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(mymap);

  var direccionIcon = L.Icon.extend({
    options: {
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
    }
  });

  // agrega los marcadores de las direcciones
  L.marker(direccion1, {icon: new direccionIcon()}).addTo(mymap);
  L.marker(direccion2, {icon: new direccionIcon()}).addTo(mymap);

  // obtiene la dirección ingresada por el usuario y la convierte en coordenadas
  var form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var direccionUsuario = document.getElementById('direccion').value;
    obtenerCoordenadas(direccionUsuario);
  });
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(location.search);
  const direccion = params.get("direccion");

  // Si hay una dirección en los parámetros, buscarla automáticamente
  if (direccion) {
    document.getElementById("direccion").value = direccion;
    direccionUsuario = direccion
    obtenerCoordenadas(direccionUsuario);
  }
});

// utiliza el servicio Nominatim de OpenStreetMap para obtener las coordenadas de una dirección
function obtenerCoordenadas(direccion) {
  var url1 = 'https://nominatim.openstreetmap.org/search?street=' + direccion + '&city=Vicente+Lopez&state=Buenos+Aires&country=Argentina&format=json';
  var url2 = 'https://nominatim.openstreetmap.org/search?street=' + direccion + '&city=San+Isidro&state=Buenos+Aires&country=Argentina&format=json';

  // Intenta buscar la dirección en Vicente López
  fetch(url1)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        // Si encuentra la dirección, muestra el marcador en el mapa y calcula la distancia
        var coordenadasUsuario = [data[0].lat, data[0].lon];
        L.marker(coordenadasUsuario).addTo(mymap);
        var distancia1 = calcularDistancia(coordenadasUsuario, direccion1);
        var distancia2 = calcularDistancia(coordenadasUsuario, direccion2);
        if (distancia1 < distancia2) {
          alert('La dirección ingresada se encuentra más cerca de Pizza City Olivos.');
        } else {
          alert('La dirección ingresada se encuentra más cerca de Club Union de Olivos.');
        }
      } else {
        // Si no encuentra la dirección en Vicente López, intenta buscarla en San Isidro
        fetch(url2)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              // Si encuentra la dirección, muestra el marcador en el mapa y calcula la distancia
              var coordenadasUsuario = [data[0].lat, data[0].lon];
              L.marker(coordenadasUsuario).addTo(mymap);
              var distancia1 = calcularDistancia(coordenadasUsuario, direccion1);
              var distancia2 = calcularDistancia(coordenadasUsuario, direccion2);
              if (distancia1 < distancia2) {
                alert('La dirección ingresada se encuentra más cerca de Pizza City Olivos.');
              } else {
                alert('La dirección ingresada se encuentra más cerca de Club Union de Olivos.');
              }
            } else {
              // Si no encuentra la dirección en ninguna de las dos localidades, muestra un mensaje de error
              alert('No se pudo encontrar la dirección ingresada.');
            }
          })
          .catch(error => console.error(error));
      }
    })
    .catch(error => console.error(error));
}


// calcula la distancia en metros entre dos coordenadas
function calcularDistancia(coordenadas1, coordenadas2) {
  var R = 6371e3; // radio de la tierra en metros
  var phi1 = coordenadas1[0] * Math.PI / 180; // latitud 1 en radianes
  var phi2 = coordenadas2[0] * Math.PI / 180; // latitud 2 en radianes
  var deltaPhi = (coordenadas2[0] - coordenadas1[0]) * Math.PI / 180; // diferencia de latitud en radianes
  var deltaLambda = (coordenadas2[1] - coordenadas1[1]) * Math.PI / 180; // diferencia de longitud en radianes
  var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // distancia en metros
  return d;
}
