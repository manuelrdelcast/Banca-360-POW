// Esperar a que el DOM esté completamente cargado (opcional si usaste 'defer' en HTML, pero es una buena práctica)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionar los elementos del HTML
    const boton = document.getElementById('miBoton');
    const mensaje = document.getElementById('mensaje');
    const botonhomepage = document.getElementById('iniciobtn');
    const temabtn = document.getElementById('Temabtn');
    // Capturamos el botón y el panel lateral
    const btnMenu = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Escuchamos el clic
    btnMenu.addEventListener('click', () => {
        // toggle() es una función maravillosa: 
        // Si la clase 'open' no está, se la pone. Si ya está, se la quita.
        sidebar.classList.toggle('open');
    });
    // Cerrar el menú al hacer clic en cualquier enlace dentro de él


    // 2. Crear una función para manejar el evento
    const cambiarMensajePrueba = () => {
        mensaje.textContent = '¡El proyecto está configurado correctamente!';
        mensaje.style.color = '#28a745';
        mensaje.style.fontWeight = 'bold';
    };

    const cambiarMensajeInicio = () => {
        mensaje.textContent = '¡El proyecto está configurado y vas al Inicio!';
        mensaje.style.color = '#28a745'; 
        mensaje.style.fontWeight = 'bold';
    };

    // 3. Asignar el evento 'click' al botón
    boton.addEventListener('click', cambiarMensajePrueba);
    iniciobtn.addEventListener('click', cambiarMensajeInicio);

    temabtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        } else {
        document.body.setAttribute('data-theme', 'dark');
        } 
    });
});