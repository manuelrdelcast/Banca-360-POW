// ============================================================
//  BANCA 360 — Script global (main.js)
//  Maneja todas las interacciones de la interfaz de usuario
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. MENÚ HAMBURGUESA (Mobile)
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
       2. MODO OSCURO / MODO CLARO (Persistencia)
    ---------------------------------------------------------- */
    const themeToggle = document.getElementById('btnTheme');

    if (themeToggle) {
        // Sincronizar la posición del interruptor visual al cargar
        if (localStorage.getItem('theme') === 'dark') {
            themeToggle.checked = true;
        }

        // Escuchar cuando el usuario hace clic en la luna/sol
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    /* ----------------------------------------------------------
       3. OCULTAR / MOSTRAR SALDO (Inicio)
    ---------------------------------------------------------- */
    const btnToggle = document.getElementById('btnToggleBalance');
    const balanceEl = document.getElementById('balanceAmount');
    const eyeIcon   = document.getElementById('eyeIcon');

    const EYE_OPEN   = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
    const EYE_CLOSED = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`;

    if (btnToggle && balanceEl && eyeIcon) {
        const saldoReal = balanceEl.textContent;
        const saldoOculto = 'Bs. ••••••';
        let oculto = true;

        // Estado inicial: Oculto con puntitos
        balanceEl.textContent = saldoOculto;
        eyeIcon.innerHTML = EYE_CLOSED;
        btnToggle.setAttribute('aria-label', 'Mostrar saldo');
        balanceEl.classList.remove('hidden'); // Limpieza de seguridad

        // Intercambiar texto al hacer clic
        btnToggle.addEventListener('click', () => {
            oculto = !oculto; 
            if (oculto) {
                balanceEl.textContent = saldoOculto;
                eyeIcon.innerHTML = EYE_CLOSED;
                btnToggle.setAttribute('aria-label', 'Mostrar saldo');
            } else {
                balanceEl.textContent = saldoReal;
                eyeIcon.innerHTML = EYE_OPEN;
                btnToggle.setAttribute('aria-label', 'Ocultar saldo');
            }
        });
    }

    /* ----------------------------------------------------------
       4. FUNCIONALIDAD DE CONTRASEÑAS
    ---------------------------------------------------------- */
    
    // A. Mostrar / Ocultar Contraseñas
    const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/></svg>`;
    const eyeSlashSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/><path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/></svg>`;

    document.querySelectorAll('.toggle-password').forEach(button => {
        button.innerHTML = eyeSlashSVG; // Comienza con el ojo tachado

        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);

            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = eyeOpenSVG;
            } else {
                input.type = 'password';
                this.innerHTML = eyeSlashSVG;
            }
        });
    });

    // B. Verificar si contraseñas coinciden
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");

    if (password && confirmarPassword) {
        function verificarPasswords() {
            if (password.value !== confirmarPassword.value) {
                confirmarPassword.setCustomValidity("Las contraseñas no coinciden.");
                confirmarPassword.classList.add("invalid");
                confirmarPassword.classList.remove("valid");
            } else {
                confirmarPassword.setCustomValidity("");
                confirmarPassword.classList.remove("invalid");
                if (confirmarPassword.value !== "") {
                    confirmarPassword.classList.add("valid");
                }
            }
        }
        password.addEventListener("input", verificarPasswords);
        confirmarPassword.addEventListener("input", verificarPasswords);
    }

    /* ----------------------------------------------------------
       5. VERIFICACIÓN FORMATO DE CORREO (RegEx)
    ---------------------------------------------------------- */
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    if (emailInputs.length > 0) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        emailInputs.forEach(emailInput => {
            emailInput.addEventListener('input', function() {
                if (this.value === '') {
                    this.setCustomValidity('El correo es obligatorio.');
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                } else if (!emailRegex.test(this.value)) {
                    this.setCustomValidity('Por favor, ingresa un correo válido (ej: usuario@dominio.com).');
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                } else {
                    this.setCustomValidity('');
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                }
            });
        });
    }

    /* ----------------------------------------------------------
       6. LÓGICA DE VALIDACIÓN ESTRICTA DE FORMULARIOS (Todos los forms)
    ---------------------------------------------------------- */
    // Seleccionamos TODOS los formularios de la página
    const todosLosFormularios = document.querySelectorAll('.pm-form');

    todosLosFormularios.forEach(formulario => {
        // A. Validar campos en tiempo real mientras escribe
        const inputsRequeridos = formulario.querySelectorAll('input[required], select[required]');
        
        inputsRequeridos.forEach(input => {
            input.addEventListener('input', function() {
                // Evitar escribir letras en los campos estrictamente numéricos
                if (this.id === 'numDoc' || this.id === 'numTelefono' || this.id === 'numCuenta') {
                    this.value = this.value.replace(/[^0-9]/g, ''); 
                }

                // Específico para campos de monto: permitimos números, coma y punto
                if (this.id === 'monto') {
                    this.value = this.value.replace(/[^0-9,.]/g, ''); 
                }

                // --- VALIDACIONES ESTRICTAS DE CANTIDAD DE DÍGITOS ---
                if (this.id === 'numTelefono') {
                    if (this.value.length > 0 && this.value.length < 7) {
                        this.setCustomValidity('Faltan números. Deben ser exactamente 7 dígitos.');
                    } else {
                        this.setCustomValidity('');
                    }
                }
                
                if (this.id === 'numCuenta') {
                    if (this.value.length > 0 && this.value.length < 20) {
                        this.setCustomValidity('Faltan números. La cuenta debe tener exactamente 20 dígitos.');
                    } else {
                        this.setCustomValidity('');
                    }
                }
                
                // Pintar campos (verde/rojo)
                if (this.checkValidity()) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
    });

    /* ----------------------------------------------------------
       6.1. MODALES PARA (Pago Móvil / Transferencias / Depósitos)
    ---------------------------------------------------------- */
    const formConModal = document.getElementById('pagoMovilForm') || document.getElementById('transferenciaForm') || document.getElementById('depositoForm');
    const pmModal  = document.getElementById('pmModal');
    const pmBackdrop = document.getElementById('pmBackdrop');
    const btnCloseModal = document.getElementById('btnModalClose');

    if (formConModal && pmModal && pmBackdrop) {
        // B. Validar al presionar enviar y mostrar Modal
        formConModal.addEventListener('submit', (e) => {
            e.preventDefault();

            if (formConModal.checkValidity()) {
                pmModal.removeAttribute('hidden');
                pmBackdrop.removeAttribute('hidden');
            } else {
                const inputsRequeridos = formConModal.querySelectorAll('input[required], select[required]');
                inputsRequeridos.forEach(input => {
                    if (!input.checkValidity()) input.classList.add('invalid');
                });
                formConModal.reportValidity(); 
            }
        });
    }

    // C. Cierre del modal y redirección
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            window.location.href = 'Inicio.html'; 
        });
    }

    /* ----------------------------------------------------------
       7. DETALLES DE TRANSACCIÓN (Parámetros URL)
    ---------------------------------------------------------- */
    const dtRef = document.getElementById('dt-ref');
    if (dtRef) {
        const params = new URLSearchParams(window.location.search);
        
        const ref = params.get('ref') || '00000000';
        const fecha = params.get('fecha') || 'No disponible';
        const concepto = params.get('concepto') || 'Transacción';
        const monto = params.get('monto') || '0.00';
        const tipo = params.get('tipo') || 'neutral';
        
        dtRef.textContent = '#' + ref;
        
        const dtFecha = document.getElementById('dt-fecha');
        if (dtFecha) dtFecha.textContent = fecha;
        
        const dtConcepto = document.getElementById('dt-concepto');
        if (dtConcepto) dtConcepto.textContent = concepto;
        
        const iconEl = document.getElementById('dt-icon');
        const amountEl = document.getElementById('dt-amount');
        const tipoEl = document.getElementById('dt-tipo');
        
        if (tipo === 'in') {
            amountEl.textContent = '+ Bs. ' + monto;
            amountEl.style.color = 'var(--color-in)';
            iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z"/></svg>`;
            iconEl.style.backgroundColor = '#dcfce7';
            iconEl.style.color = 'var(--color-in)';
            iconEl.style.borderColor = '#dcfce7';
            if(tipoEl) tipoEl.textContent = 'Ingreso / Abono';
        } else if (tipo === 'out') {
            amountEl.textContent = '- Bs. ' + monto;
            amountEl.style.color = 'var(--color-out)';
            iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/></svg>`;
            iconEl.style.backgroundColor = '#fee2e2';
            iconEl.style.color = 'var(--color-out)';
            iconEl.style.borderColor = '#fee2e2';
            if(tipoEl) tipoEl.textContent = 'Cargo / Retiro';
        } else {
            amountEl.textContent = 'Bs. ' + monto;
        }
    }

    /* ----------------------------------------------------------
       8. FILTRO DE MOVIMIENTOS (Historial)
    ---------------------------------------------------------- */
    const buttons = document.querySelectorAll('.btn-filter');
    const items = document.querySelectorAll('.transaction-item');
    const title = document.getElementById('tituloMovimientos');

    if (buttons.length > 0 && items.length > 0 && title) {
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('btn--primary');
                    b.classList.add('btn--secondary');
                });
                btn.classList.remove('btn--secondary');
                btn.classList.add('btn--primary');

                const filter = btn.getAttribute('data-filter');

                if(filter === 'in') title.textContent = 'Solo Entradas';
                else if(filter === 'out') title.textContent = 'Solo Salidas';
                else title.textContent = 'Todos los Movimientos';

                items.forEach(item => {
                    const type = item.getAttribute('data-type');
                    if (filter === 'all' || filter === type) {
                        item.style.display = ''; // Lo dejamos en blanco para que use el CSS normal
                    } else {
                        item.style.display = 'none'; 
                    }
                });
            });
        });
    }

    /* ----------------------------------------------------------
       9. SPINNER LOGIN
    ---------------------------------------------------------- */
    // Buscamos específicamente el formulario de login (el que tiene action="Inicio.html")
    const loginForm = document.querySelector('form.pm-form[action="Inicio.html"]');

    if (loginForm && !document.getElementById('pmModal')) {
        loginForm.addEventListener('submit', function(e) {
            // Solo detenemos el envío si el formulario es válido HTML5
            if (this.checkValidity()) {
                e.preventDefault(); 
                
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.7';
                    submitBtn.innerHTML = '<span class="btn-spinner"></span> Iniciando...';
                    
                    setTimeout(() => {
                        window.location.href = this.getAttribute('action') || 'Inicio.html';
                    }, 2000);
                }
            }
        });
    }

    /* ----------------------------------------------------------
       10. LIBERACIÓN DE ANIMACIONES
    ---------------------------------------------------------- */
    // Remueve la etiqueta inyectada en HTML para habilitar las animaciones 
    // después de cargar el tema oscuro inicial.
    setTimeout(() => {
        const bloqueo = document.getElementById('bloqueo-animaciones');
        if (bloqueo) bloqueo.remove();
    }, 50);

});