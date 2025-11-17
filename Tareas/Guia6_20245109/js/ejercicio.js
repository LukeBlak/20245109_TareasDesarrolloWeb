document.addEventListener("DOMContentLoaded", function() {
    
    const formulario = document.getElementById('form');
    const carnetInput = document.getElementById('idTxtCarnet');
    const nombreInput = document.getElementById('idTxtNombre');
    const duiInput = document.getElementById('idTxtDui');
    const nitInput = document.getElementById('idTxtNit');
    const fechaInput = document.getElementById('idTxtFecha');
    const correoInput = document.getElementById('idTxtCorreo');
    const edadInput = document.getElementById('idNumEdad');

    const carnetRegex = /^[A-Za-z]{2}\d{3}$/;
    const nombreRegex = /^[A-Za-z\s]+$/;
    const duiRegex = /^\d{8}-\d{1}$/;
    const nitRegex = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    const correoRegex = /^[^\s@]+@[^\s@].[^\s@]+$/;
    const edadRegex = /^\d+$/

    function validarCampos(input, reglaRegex, mensajeError) {
        const valor = input.value.trim();

        if (reglaRegex.test(valor)) {
            input.classList.remove('invalido');
            input.classList.add('valido');
            return true;
        } else {
            input.classList.remove('valido');
            input.classList.add('invalido');

            let elementoError = input.nextElementSibling;
            if (!elementoError || !elementoError.classList.contains('mensaje-error')) {
                elementoError = document.createElement('span');
                elementoError.className = 'mensaje-error';
                input.parentNode.appendChild(elementoError);            
            }
            elementoError.textContent = mensajeError;

            return false;
        }
    }

    carnetInput.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
        validarCampos(this, carnetRegex, "Formato: dos letras y tres números (ej: AB123)");
    });

    nombreInput.addEventListener('input', function () {
        validarCampos(this, nombreRegex, "Solo se permiten letras y espacios, sin caracteres especiales");
    });

    duiInput.addEventListener('input', function () {
        validarCampos(this, duiRegex, "Formato: XXXXXXXX-X");
    });

    nitInput.addEventListener('input', function () {
        validarCampos(this, nitRegex, "Formato: XXXX-XXXXXX-XXX-X");
    });

    correoInput.addEventListener('input', function() {
        validarCampos(this, correoRegex, "Formato de correo inválido");
    });

    edadInput.addEventListener('input', function () {
        validarCampos(this, edadRegex, "Solo se permiten números");
    });

    carnetInput.placeholder = 'AB123';
    duiInput.placeholder = 'XXXXXXX-X';
    nitInput.placeholder = 'XXXX-XXXXXX-XXX-X';
    correoInput.placeholder = 'estudiante@email.com';
})