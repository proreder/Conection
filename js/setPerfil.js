$(document).ready(function() {
 
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
    var nombre, email, imagen, ciudad;

    // Previsualización de imagen
    $("#imagen").change(function() {
        var descriptor = new FileReader();
        descriptor.readAsDataURL(this.files[0]);

        descriptor.onloadend = function() {
            imagen = descriptor.result;
            $("#previsualizacion").attr("src", imagen);
        };
    });

    // Botón siempre habilitado
    $("#botonGuardar").prop("disabled", false);

    // Evento de clic para guardar en Firebase
    $("#botonGuardar").click(function() {
        nombre = $("#nombre").val();
        email = $("#email").val();
        ciudad = $("#ciudad").val();

        if (!imagen) {
            imagen = "NONE";
        }

        var datosUsuario = {
            nombre: nombre,
            email: email,
            ciudad: ciudad,
            imagen: imagen,
        };

        var referencia1 = database.ref("usuarios/usuario1");
        var referencia2 = database.ref("usuarios/usuario2");

        referencia1.push(datosUsuario, function() {
            alert('El usuario se ha registrado correctamente en usuario1');
        });
        
        referencia2.push(datosUsuario, function() {
            alert('El usuario se ha registrado correctamente en usuario2');
        });
    });
});
