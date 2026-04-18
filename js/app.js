// Esperar a que el DOM esté completamente cargado (opcional si usaste 'defer' en HTML, pero es una buena práctica)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionar los elementos del HTML
    const boton = document.getElementById('miBoton');
    const mensaje = document.getElementById('mensaje');

    // 2. Crear una función para manejar el evento
    const cambiarMensaje = () => {
        mensaje.textContent = '¡El proyecto está configurado correctamente!';
        mensaje.style.color = '#28a745'; // Cambia el color a verde
        mensaje.style.fontWeight = 'bold';
    };

    // 3. Asignar el evento 'click' al botón
    boton.addEventListener('click', cambiarMensaje);
});