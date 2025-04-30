$(document).ready(function() {
    // Configuración de Firebase
    var config = {
        appId: "1:314231053868:android:b2c367fd1569a84266fb89",
        apiKey: "AIzaSyDPhU_Oz4AgZDgLxBK9-cY0yULn6s9YG2k",
        authDomain: "connection-bc106.web.app",
        databaseURL: "https://connection-bc106-default-rtdb.firebaseio.com/",
        projectId: "connection-bc106",
        storageBucket: "connection-bc106.firebasestorage.app",
        messagingSenderId: "314231053868"
    };

    // Inicializar Firebase
    firebase.initializeApp(config);
    const database = firebase.database();

    // Al hacer clic en guardar
    $('#botonGuardar').click(function() {
        const ciudad = $('#ciudad').val();

        if (!ciudad) {
            alert("Por favor escribe una ciudad.");
            return;
        }

        // Obtener ubicación del dispositivo
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Guardar en Firebase
                database.ref('usuarios').push({
                    ciudad: ciudad,
                    coords: {
                        latitude: latitude,
                        longitude: longitude
                    }
                })
                .then(() => {
                    alert("Ciudad guardada correctamente con tu ubicación.");
                })
                .catch((err) => {
                    console.error("Error al guardar ciudad:", err);
                });

            }, function(error) {
                alert("Error al obtener tu ubicación.");
                console.error(error);
            });
        } else {
            alert("Geolocalización no soportada por este navegador.");
        }
    });
});