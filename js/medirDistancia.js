document.addEventListener("DOMContentLoaded", function () {
    // Inicializar la base de datos
    var config = {
        appId: "1:314231053868:android:b2c367fd1569a84266fb89",
        apiKey: "AIzaSyDPhU_Oz4AgZDgLxBK9-cY0yULn6s9YG2k",
        authDomain: "connection-bc106.web.app",
        databaseURL: "https://connection-bc106-default-rtdb.firebaseio.com/",
        projectId: "connection-bc106",
        storageBucket: "connection-bc106.firebasestorage.app",
        messagingSenderId: "314231053868"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    // Referencias
    var refUsuario1 = database.ref("usuarios/usuario1");
    var refUsuario2 = database.ref("usuarios/usuario2");

    // Obtener datos de ambos
    Promise.all([
        refUsuario1.once("value"),
        refUsuario2.once("value")
    ]).then(([snapshot1, snapshot2]) => {
        var usuarios1 = snapshot1.val();
        var usuarios2 = snapshot2.val();

        if (!usuarios1 || !usuarios2) {
            console.log("Faltan datos de usuarios");
            return;
        }

        Object.values(usuarios1).forEach(user1 => {
            if (!user1.coords) return;

            var lat1 = user1.coords.latitude;
            var lon1 = user1.coords.longitude;

            Object.values(usuarios2).forEach(user2 => {
                if (!user2.coords) return;

                var lat2 = user2.coords.latitude;
                var lon2 = user2.coords.longitude;

                var distancia = calcularDistancia(lat1, lon1, lat2, lon2);

                if (distancia < 30) {
                    alert("¡Usuarios cercanos detectados! (" + Math.round(distancia) + " m)");
                } else {
                    console.log("Usuarios a " + Math.round(distancia) + " m");
                }
            });
        });
    }).catch(error => {
        console.error("Error al leer usuarios:", error);
    });

    // Función para calcular distancia (fórmula Haversine)
    function calcularDistancia(lat1, lon1, lat2, lon2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }

        var R = 6371e3; // Radio de la Tierra en metros
        var φ1 = toRad(lat1);
        var φ2 = toRad(lat2);
        var Δφ = toRad(lat2 - lat1);
        var Δλ = toRad(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // distancia en metros
    }
});
