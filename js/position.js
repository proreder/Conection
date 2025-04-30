if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log("Latitud: " + position.coords.latitude);
            console.log("Longitud: " + position.coords.longitude);
        },
        function (error) {
            console.error("Error obteniendo la ubicación: ", error.message);
        },
        {
            enableHighAccuracy: true, // Mayor precisión
            timeout: 5000, // Tiempo máximo de espera
            maximumAge: 0 // No usar datos en caché
        }
    );
} else {
    console.log("La geolocalización no está disponible en este navegador.");
}
