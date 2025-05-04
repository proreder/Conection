import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { app } from "./index.js"; // Asegúrate de exportar `app` desde index.js

export function getAuthenticatedUser() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  if (user) {
    console.log("Usuario autenticado:", user.email);
    return user;
  } else {
    console.error("No hay usuario autenticado.");
    return null;
  }
}

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
var referencia = database.ref("usuarios/usuario1").limitToLast(1);

// Escuchar cambios en la base de datos
referencia.on("value", function (datos) {
    var usuarios = datos.val();

    document.querySelectorAll("#listado").forEach(listadoContainer => {
        listadoContainer.innerHTML = ""; // Limpiar antes de agregar nuevos elementos

        if (!usuarios) {
            listadoContainer.innerHTML = "<p>No hay usuarios registrados.</p>";
            return;
        }

        var indice = Object.keys(usuarios)[0];
        var valor = usuarios[indice];

        var prevUsuario = `
            <div class="row">
                <div class="col-md-3 cabeceraProducto">
                    <h2 id="userName" style="cursor:pointer; color:blue; text-decoration:underline;">
                        ${valor.nombre || "Sin nombre"}
                    </h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 imagenFix">
                    <img id="userImage" 
                         src="${valor.imagen && valor.imagen !== "NONE" ? valor.imagen : "default.jpg"}" 
                         alt="Foto de usuario" 
                         style="cursor:pointer;">
                </div>
                <div class="col-md-3">
                    <p>${valor.email || "Sin correo"}</p>
                </div>
            </div>
            <div class="row espaciador"></div>
        `;

        listadoContainer.innerHTML = prevUsuario;

        // Guardar datos en localStorage y redirigir a usuario.html cuando se haga clic en el NOMBRE
        document.getElementById("userName").addEventListener("click", function () {
            localStorage.setItem("userImage", valor.imagen || "default.jpg");
            localStorage.setItem("userName", valor.nombre || "Sin nombre");
            localStorage.setItem("userEmail", valor.email || "Sin correo");
            window.location.href = "usuario.html";
        });

        // Guardar datos en localStorage y redirigir a profile-details.html cuando se haga clic en la IMAGEN
        document.getElementById("userImage").addEventListener("click", function () {
            localStorage.setItem("userImage", valor.imagen || "default.jpg");
            localStorage.setItem("userName", valor.nombre || "Sin nombre");
            localStorage.setItem("userEmail", valor.email || "Sin correo");
            window.location.href = "profile-details.html";
        });
    });
});
