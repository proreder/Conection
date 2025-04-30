document.querySelector('.btn-glow').addEventListener('click', (e) => {
    // Mostrar mensaje de confirmación antes de redirigir
    let confirmar = confirm("El alta se ha realizado correctamente. ¿Quieres ir a tu perfil?");
    
    if (confirmar) {
        // Si el usuario acepta, redirigir a perfil.html
        window.location.href = "perfil.html";
    }
});
