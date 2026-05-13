// ============================================================
//  BANCA 360 — Script global (main.js)
//  Maneja: menú hamburguesa, modo oscuro, ocultar/mostrar saldo
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. MENÚ HAMBURGUESA
    ---------------------------------------------------------- */
    const btnMenu  = document.getElementById('btnMenu');
    const mainNav  = document.getElementById('mainNav');

    if (btnMenu && mainNav) {
        btnMenu.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('activo');
            btnMenu.setAttribute('aria-expanded', isOpen);
        });
    }

    /* ----------------------------------------------------------
       2. MODO OSCURO / MODO CLARO
       Persiste la preferencia en localStorage
    ---------------------------------------------------------- */
    const themeToggle = document.getElementById('btnTheme');

    // Si usas body.dark para tu CSS:
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });

    /* ----------------------------------------------------------
       3. OCULTAR / MOSTRAR SALDO (ícono de ojo)
    ---------------------------------------------------------- */
    const btnToggle = document.getElementById('btnToggleBalance');
    const balanceEl = document.getElementById('balanceAmount');
    const eyeIcon   = document.getElementById('eyeIcon');

    // SVG paths para ojo abierto y ojo cerrado
    const EYE_OPEN   = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>`;
    const EYE_CLOSED = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                         a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
                         a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>`;

    if (btnToggle && balanceEl && eyeIcon) {
        btnToggle.addEventListener('click', () => {
            const isHidden = balanceEl.classList.toggle('hidden');
            eyeIcon.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;
            btnToggle.setAttribute('aria-label', isHidden ? 'Mostrar saldo' : 'Ocultar saldo');
        });
    }

});