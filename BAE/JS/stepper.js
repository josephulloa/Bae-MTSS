// Función para obtener el número de paso de la URL
function getCurrentStep() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = window.location.pathname;

    // Extraer el nombre de la página de la URL
    const pageName = page.substring(page.lastIndexOf('/') + 1);

    // Verificar el nombre de la página y establecer el paso correspondiente
    console.log("Página actual:", pageName);
    if (pageName === 'FormBAE.html') {
        return 1;
    }else if (pageName === 'DatosPersonales.html') {
        return 2;
    }else if (pageName === 'DatosAdjuntos.html') {
        return 3;
    } else if (pageName === 'CartaCompromiso.html') {
        return 4;
    } else {
        return 5; // Si el nombre de la página no coincide con ninguna página conocida, establecer el paso 1 por defecto
    }
}

// Función para actualizar el stepper
function updateStepper() {
    const currentStep = getCurrentStep();
    const steps = document.querySelectorAll('.step');

    steps.forEach(step => {
        const stepNumber = parseInt(step.getAttribute('data-step'));
        if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('completed');
            step.classList.remove('active');
        }
    });
}

// Actualizar el stepper cuando se carga la página
window.addEventListener('load', function() {
    updateStepper();
});


