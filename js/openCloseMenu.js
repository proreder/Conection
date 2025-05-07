// Seleccionamos los elementos
const menu = document.querySelector(".menu");
const toggleBtn = document.querySelector(".toggle-btn");
const overlay = document.querySelector(".overlay");

// Función para abrir/cerrar el menú
toggleBtn.onclick = () => {
    menu.classList.toggle("open");
    overlay.classList.toggle("show");
};

// Función para cerrar el menú al hacer clic fuera
overlay.onclick = () => {
    menu.classList.remove("open");
    overlay.classList.remove("show");
};

//evento al pulsar el icono de perfil
document.querySelector('.toggle-btn-right').addEventListener('click', function () {
    const menuPerfil = document.querySelector('.menu-perfil');
    if (menuPerfil) {
        menuPerfil.classList.toggle('open');
    }
});