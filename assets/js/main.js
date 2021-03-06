function initMap() {
    
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: -33.5157491, lng: -70.600865 },
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false
    });

	//autocompletado
    var origen = document.getElementById("origen");
    var autocomplete = new google.maps.places.Autocomplete(origen);
    autocomplete.bindTo("bounds", map);

    var destino = document.getElementById("destino");
    var autocomplete = new google.maps.places.Autocomplete(destino);
    autocomplete.bindTo("bounds", map);

    // Evento para encontrar la localización actual 
    //document.getElementById("encuentrame").addEventListener("click", buscar);

    function buscar() {
        if (navigator.geolocation) {
            //  ubicacion actual
            navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
        }
    }

     window.addEventListener("load", buscar);

    var latitud, longitud;
    var funcionExito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

          var miUbicacion = new google.maps.Marker({
              position: { lat: latitud, lng: longitud },
              animation: google.maps.Animation.DROP,
              map: map
          });
         map.setZoom(17);
         map.setCenter({ lat: latitud, lng: longitud });
     }

    //no encuentra la ubicacion "error"
    var funcionError = function(error) {
        alert("Tenemos un problema con encontrar tu ubicación");
    }

    // trazar ruta
    var directionsService = new google.maps.DirectionsService();
    // suppressMarkers: true -> suprimir los iconos por defecto
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: false });

    document.getElementById("origen").addEventListener("change", onChangeHandler);
    document.getElementById("destino").addEventListener("change", onChangeHandler);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById("origen").value,
            destination: document.getElementById("destino").value,
            travelMode: "DRIVING"
        }, function(response, status) {
            if (status === "OK") {
                directionsDisplay.setDirections(response);
                var leg = response.routes[0].legs[0];
            } else {
                window.alert("Directions request failed due to" + status);
            }
        });
    }

    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    document.getElementById("boton-ruta").addEventListener("click", onChangeHandler);

};