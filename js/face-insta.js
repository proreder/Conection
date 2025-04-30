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
    firebase.initializeApp(config);

    var database = firebase.database();

    // Evento de clic para guardar en Firebase
    $("#guardar").click(function() {
        // Capturar los valores de los campos de Instagram y Facebook
        var instagram = $("#Instagram").val().trim();
        var facebook = $("#Facebook").val().trim();

        // Verificar que ambos campos no estén vacíos
        if (instagram === "" || facebook === "") {
            alert("Por favor, ingrese ambos campos de Instagram y Facebook.");
            return;
        }

        // Referencia de la base de datos donde se guardarán los datos
        var referencia = database.ref("usuarios/usuario2");

        // Guardar los datos usando .set()
        referencia.set({
            instagram: instagram,
            facebook: facebook
        }).then(function() {
            alert("Los datos se han guardado correctamente.");
        }).catch(function(error) {
            alert("Error al guardar los datos: " + error.message);
        });
    });
});
