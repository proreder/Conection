document.addEventListener("DOMContentLoaded", function () {
    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get("nombre") || "Usuario desconocido";
    const email = params.get("email") || "Correo no disponible";
    const imagen = params.get("imagen") || "sin_foto.png";

    // Mostrar los datos en la página
    document.getElementById("nombreUsuario").textContent = nombre;
    document.getElementById("emailUsuario").textContent = email;
    document.getElementById("imagenUsuario").src = imagen;
});
