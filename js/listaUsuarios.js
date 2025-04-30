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
    // Inicializar Firebase
    firebase.initializeApp(config);
    var database = firebase.database();

    // Referencia a la colección de usuarios
    var referencia = database.ref("usuarios/usuario2");

    // Escuchar cambios en la base de datos
    referencia.on('value', function(datos) {
        var usuarios = datos.val();

        // Limpiar el contenedor antes de agregar nuevos elementos
        $('#listado').empty();

        // Recorrer cada usuario y mostrar imagen + nombre al lado
        $.each(usuarios, function(indice, valor) {
            var prevUsuario = '<div class="user-card" style="display:flex; align-items:center; margin:10px;">';

            // Imagen (con o sin foto)
            if (valor.imagen === 'NONE') {
                prevUsuario += '<button class="btn-usuario" onclick="accionUsuario(\'' + indice + '\')" style="border:none; background:none;">';
                prevUsuario += '<img src="sin_foto.png" alt="Sin Fotografía" style="width:50px; height:50px;"/>';
                prevUsuario += '</button>';
            } else {
                prevUsuario += '<button class="btn-usuario" onclick="accionUsuario(\'' + indice + '\')" style="border:none; background:none;">';
                prevUsuario += '<img src="' + valor.imagen + '" alt="Usuario" style="width:50px; height:50px;"/>';
                prevUsuario += '</button>';
            }

            // Nombre al lado de la imagen
            prevUsuario += '<div style="margin-left:10px; font-size:14px;">' + (valor.nombre || 'Sin nombre') + '</div>';

            prevUsuario += '</div>';

            // Agregar al contenedor
            $('#listado').append(prevUsuario);
        });
    }, function(error) {
        console.log('Error de lectura: ' + error.code);
    });

    // Función para manejar el clic en la imagen
    function accionUsuario(idUsuario) {
        // Redirige a chat.html pasando el ID del usuario
        window.location.href = "chat.html?usuario=" + encodeURIComponent(idUsuario);
    }