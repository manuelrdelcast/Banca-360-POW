/* ============================================================
   PAGO MÓVIL — Lógica de validación y envío
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Referencias al DOM ── */
    const form          = document.getElementById('pagoMovilForm');
    const btnPreview    = document.getElementById('btnPreview');
    const btnEnviar     = document.getElementById('btnEnviar');
    const pmSummary     = document.getElementById('pmSummary');
    const pmModal       = document.getElementById('pmModal');
    const pmBackdrop    = document.getElementById('pmBackdrop');
    const btnModalClose = document.getElementById('btnModalClose');

    // Campos
    const tipoDoc    = document.getElementById('tipoDoc');
    const numDoc     = document.getElementById('numDoc');
    const banco      = document.getElementById('banco');
    const prefijo    = document.getElementById('prefijo');
    const numTel     = document.getElementById('numTelefono');
    const monto      = document.getElementById('monto');
    const concepto   = document.getElementById('concepto');

    // Contadores / errores
    const conceptoCount = document.getElementById('conceptoCount');

    /* ── Helpers: marcar campo como válido / inválido ── */
    function setValid(el, errorId) {
        el.classList.remove('invalid');
        el.classList.add('valid');
        document.getElementById(errorId).textContent = '';
    }

    function setInvalid(el, errorId, msg) {
        el.classList.remove('valid');
        el.classList.add('invalid');
        document.getElementById(errorId).textContent = msg;
    }

    function clearState(el, errorId) {
        el.classList.remove('valid', 'invalid');
        document.getElementById(errorId).textContent = '';
    }

    /* ── Validaciones individuales ── */

    function validateTipoDoc() {
        if (!tipoDoc.value) {
            setInvalid(tipoDoc, 'tipoDocError', 'Selecciona un tipo.');
            return false;
        }
        setValid(tipoDoc, 'tipoDocError');
        return true;
    }

    function validateNumDoc() {
        const val = numDoc.value.trim();
        // Solo dígitos, entre 6 y 9 caracteres
        if (!/^\d{6,9}$/.test(val)) {
            setInvalid(numDoc, 'numDocError', 'Ingresa entre 6 y 9 dígitos numéricos.');
            return false;
        }
        setValid(numDoc, 'numDocError');
        return true;
    }

    function validateBanco() {
        if (!banco.value) {
            setInvalid(banco, 'bancoError', 'Selecciona un banco.');
            return false;
        }
        setValid(banco, 'bancoError');
        return true;
    }

    function validatePrefijo() {
        if (!prefijo.value) {
            setInvalid(prefijo, 'prefijoError', 'Selecciona un prefijo.');
            return false;
        }
        setValid(prefijo, 'prefijoError');
        return true;
    }

    function validateNumTel() {
        const val = numTel.value.trim();
        // Exactamente 7 dígitos
        if (!/^\d{7}$/.test(val)) {
            setInvalid(numTel, 'numTelefonoError', 'Ingresa exactamente 7 dígitos.');
            return false;
        }
        setValid(numTel, 'numTelefonoError');
        return true;
    }

    function validateMonto() {
        // Acepta: 1000,00 / 1.000,00 / 500,5 / 0,01
        // No acepta: 0,00 / negativos / letras
        const val = monto.value.trim();
        const regex = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{1,2})?$/;

        if (!regex.test(val)) {
            setInvalid(monto, 'montoError', 'Formato inválido. Usa: 1.500,00 o 500,00');
            return false;
        }

        // Convertir a número para verificar que sea > 0
        const numerico = parseFloat(val.replace(/\./g, '').replace(',', '.'));
        if (isNaN(numerico) || numerico <= 0) {
            setInvalid(monto, 'montoError', 'El monto debe ser mayor a Bs. 0,00');
            return false;
        }

        setValid(monto, 'montoError');
        return true;
    }

    function validateConcepto() {
        const val = concepto.value.trim();
        if (val.length < 3) {
            setInvalid(concepto, 'conceptoError', 'El concepto debe tener al menos 3 caracteres.');
            return false;
        }
        setValid(concepto, 'conceptoError');
        return true;
    }

    /* ── Validar todos los campos y retornar true/false ── */
    function validateAll() {
        const results = [
            validateTipoDoc(),
            validateNumDoc(),
            validateBanco(),
            validatePrefijo(),
            validateNumTel(),
            validateMonto(),
            validateConcepto(),
        ];
        return results.every(Boolean);
    }

    /* ── Formateo del monto mientras el usuario escribe ──
       Solo permite dígitos y coma. Coloca siempre ",00" al final
       si el usuario no la escribió. El formateo completo se hace
       al salir del campo (blur).                               */

    monto.addEventListener('input', () => {
        // Permite solo dígitos, puntos y coma
        let val = monto.value.replace(/[^\d.,]/g, '');
        monto.value = val;
    });

    monto.addEventListener('blur', () => {
        let val = monto.value.trim();
        if (!val) return;

        // Quitar todo lo que no sea dígito o coma (tolerante)
        val = val.replace(/[^\d,]/g, '');

        // Si no tiene coma, agregar ",00"
        if (!val.includes(',')) val += ',00';

        // Separar parte entera y decimal
        let [entero, decimal] = val.split(',');
        decimal = (decimal || '').padEnd(2, '0').slice(0, 2);

        // Formatear parte entera con puntos de miles
        entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        monto.value = `${entero},${decimal}`;
    });

    /* ── Contador de caracteres del concepto ── */
    concepto.addEventListener('input', () => {
        const len = concepto.value.length;
        conceptoCount.textContent = `${len} / 100`;
    });

    /* ── Solo números en campos numéricos ── */
    [numDoc, numTel].forEach(el => {
        el.addEventListener('input', () => {
            el.value = el.value.replace(/\D/g, '');
        });
    });

    /* ── Validación en tiempo real (al salir de cada campo) ── */
    tipoDoc.addEventListener('change', validateTipoDoc);
    numDoc.addEventListener('blur',    validateNumDoc);
    banco.addEventListener('change',   validateBanco);
    prefijo.addEventListener('change', validatePrefijo);
    numTel.addEventListener('blur',    validateNumTel);
    monto.addEventListener('blur',     validateMonto);
    concepto.addEventListener('blur',  validateConcepto);

    /* ── Obtener texto visible de un <select> ── */
    function getSelectText(selectEl) {
        return selectEl.options[selectEl.selectedIndex]?.text || '—';
    }

    /* ── Construir y mostrar el resumen ── */
    function showSummary() {
        if (!validateAll()) return;

        document.getElementById('summaryReceptor').textContent =
            `${tipoDoc.value}-${numDoc.value.trim()}`;
        document.getElementById('summaryBanco').textContent =
            getSelectText(banco);
        document.getElementById('summaryTelefono').textContent =
            `${prefijo.value}-${numTel.value.trim()}`;
        document.getElementById('summaryMonto').textContent =
            `Bs. ${monto.value.trim()}`;
        document.getElementById('summaryConcepto').textContent =
            concepto.value.trim();

        pmSummary.hidden = false;
        pmSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* ── Abrir / cerrar modal ── */
    function openModal(msg) {
        document.getElementById('modalMsg').textContent = msg;
        pmModal.hidden    = false;
        pmBackdrop.hidden = false;
        btnModalClose.focus();
    }

    function closeModal() {
        pmModal.hidden    = true;
        pmBackdrop.hidden = true;
    }

    /* ── Eventos de los botones ── */

    // Vista previa
    btnPreview.addEventListener('click', showSummary);

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateAll()) {
            // Hacer scroll al primer error
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Simular envío: deshabilitar botón brevemente
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Procesando…';

        setTimeout(() => {
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Confirmar pago';

            const receptor  = `${tipoDoc.value}-${numDoc.value.trim()}`;
            const telefono  = `${prefijo.value}-${numTel.value.trim()}`;
            const montoVal  = `Bs. ${monto.value.trim()}`;

            openModal(
                `Pago de ${montoVal} enviado a ${receptor} (${telefono}) ` +
                `en ${getSelectText(banco)}. Tu transacción fue procesada exitosamente.`
            );

            // Limpiar formulario tras éxito
            form.reset();
            pmSummary.hidden = true;
            form.querySelectorAll('.valid, .invalid').forEach(el => {
                el.classList.remove('valid', 'invalid');
            });
            form.querySelectorAll('.pm-form__error').forEach(el => el.textContent = '');
            conceptoCount.textContent = '0 / 100';

        }, 1200); // simula latencia de red
    });

    // Cerrar modal
    btnModalClose.addEventListener('click', closeModal);
    pmBackdrop.addEventListener('click', closeModal);

    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !pmModal.hidden) closeModal();
    });

});