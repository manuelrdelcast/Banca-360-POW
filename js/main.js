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

/* ----------------------------------------------------------
       4. LÓGICA DEL FORMULARIO PAGO MÓVIL
    ---------------------------------------------------------- */
    const pagoForm = document.getElementById('pagoMovilForm');
    const pmModal  = document.getElementById('pmModal');
    const pmBackdrop = document.getElementById('pmBackdrop');
    const btnCloseModal = document.getElementById('btnModalClose');

    if (pagoForm && pmModal && pmBackdrop) {
        pagoForm.addEventListener('submit', (e) => {
            // 1. Evitamos que la página se recargue (comportamiento por defecto)
            e.preventDefault();

            // 2. Aquí podrías agregar validaciones (que los campos no estén vacíos)
            
            // 3. Mostramos el modal y el fondo oscuro quitando el atributo 'hidden'
            pmModal.removeAttribute('hidden');
            pmBackdrop.removeAttribute('hidden');

            // Opcional: Podrías limpiar el formulario después de enviar
            // pagoForm.reset();
        });
    }

    // Lógica para cerrar el modal al darle al botón "Aceptar"
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            pmModal.setAttribute('hidden', '');
            pmBackdrop.setAttribute('hidden', '');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);
            
            const ref = params.get('ref') || 'Desconocido';
            const fecha = params.get('fecha') || 'Desconocido';
            const concepto = params.get('concepto') || 'Desconocido';
            const monto = params.get('monto') || '0.00';
            const tipo = params.get('tipo') || 'out'; // in o out
            
            document.getElementById('dt-ref').textContent = '#' + ref;
            document.getElementById('dt-fecha').textContent = fecha;
            document.getElementById('dt-concepto').textContent = concepto;
            
            const iconEl = document.getElementById('dt-icon');
            const amountEl = document.getElementById('dt-amount');
            const tipoEl = document.getElementById('dt-tipo');
            
            if (tipo === 'in') {
                iconEl.textContent = '↓';
                iconEl.className = 'transaction-item__icon transaction-item__icon--in';
                amountEl.textContent = '+ Bs. ' + parseFloat(monto).toLocaleString('en-US', {minimumFractionDigits: 2});
                amountEl.className = 'transaction-item__amount transaction-item__amount--in';
                tipoEl.textContent = 'Ingreso / Abono';
            } else {
                iconEl.textContent = '↑';
                iconEl.className = 'transaction-item__icon transaction-item__icon--out';
                amountEl.textContent = '- Bs. ' + parseFloat(monto).toLocaleString('en-US', {minimumFractionDigits: 2});
                amountEl.className = 'transaction-item__amount transaction-item__amount--out';
                tipoEl.textContent = 'Salida / Cargo';
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('.btn-filter');
            const items = document.querySelectorAll('.transaction-item');
            const title = document.getElementById('tituloMovimientos');

            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Resetear los botones
                    buttons.forEach(b => {
                        b.style.backgroundColor = 'var(--color-surface-alt)';
                        b.style.color = 'var(--color-text)';
                        b.classList.remove('active');
                    });

                    // Activar el botón presionado (darle color de botón primario)
                    btn.style.backgroundColor = 'var(--color-primary)';
                    btn.style.color = '#fff';
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    // Cambiar título según filtro
                    if(filter === 'in') title.textContent = 'Solo Entradas';
                    else if(filter === 'out') title.textContent = 'Solo Salidas';
                    else title.textContent = 'Todos los Movimientos';

                    // Ocultar / Mostrar items iterando sobre la lista
                    items.forEach(item => {
                        const type = item.getAttribute('data-type');
                        if (filter === 'all' || filter === type) {
                            item.style.display = 'list-item'; // mostrar
                        } else {
                            item.style.display = 'none'; // ocultar
                        }
                    });
                });
            });
        });