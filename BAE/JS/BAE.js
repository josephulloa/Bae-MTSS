// ---------------------------------------------------------------------------------
// llamadas de html
const consentimiento = document.getElementById("consentimiento");
const nombreCompleto = document.getElementById("nombreCompleto");
const apellido1 = document.getElementById("PrimerApellido");
const apellido2 = document.getElementById("SegundoApellido");
const cedula = document.getElementById("cedula");
const fecha_nacimiento = document.getElementById("fecha_nacimiento");
const sexo = document.getElementById("sexo");
const estado_civil = document.getElementById("estado_civil");
const nivel_educativo = document.getElementById("nivel_educativo");
const situacion_laboral = document.getElementById("situacion_laboral");
const cantidad_dependientes = document.getElementById("cantidad_dependientes");
const cantidad_familiar = document.getElementById("cantidad_familiar");
const cuenta_iban = document.getElementById("cuenta_iban");
const tipo_identificacion = document.getElementById("tipo_identificacion");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const identidad_etnica = document.getElementById("identidad_etnica");
const otra_identidad_etnica = document.getElementById("otra_identidad_etnica");
const body_otra_identidad_etnica = document.getElementById("body_otra_identidad_etnica");
const urlParams = new URLSearchParams(window.location.search);
const page = window.location.pathname;

// Extraer el nombre de la página de la URL
const pageName = page.substring(page.lastIndexOf('/') + 1);
// --------------------------------------------------------------------------------------
// guardar los datos ingresador de los inputs en LS

function DataConsentimiento() {
    const datosConsentimiento = {
        consentimiento: consentimiento.value,
    };
    localStorage.setItem(
        "datosConsentimiento",
        JSON.stringify(datosConsentimiento)
    );
    if (consentimiento.value == "Si") {
        window.location.href = "DatosPersonales.html";
    } else {
        toastr.error('No es posible avanzar sin aceptar el contenido anterior');
    }
}

function guardarDatosFormulario() {
    // Validación de campos requeridos
    const camposRequeridos = [
        nombreCompleto,
        apellido1,
        apellido2,
        cedula,
        fecha_nacimiento,
        sexo,
        estado_civil,
        nivel_educativo,
        situacion_laboral,
        cantidad_dependientes,
        cuenta_iban,
        tipo_identificacion,
        telefono,
        email,
        identidad_etnica,
    ];
    for (const campo of camposRequeridos) {
        if (campo.value.trim() === "") {
            toastr.error(`El campo ${campo.name}  es obligatorio.`);
            return; // Detener la función si un campo obligatorio está vacío
        }
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        toastr.error("Por favor, introduce un correo electrónico válido.");
        return;
    }

    // Validación de número de teléfono
    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(telefono.value)) {
        toastr.error("Por favor, introduce un número de teléfono válido.");
        return;
    }

    // Validación de fecha de nacimiento
    const today = new Date();
    const birthDate = new Date(fecha_nacimiento.value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age;
    }
    if (age < 18) {
        toastr.error("Debes ser mayor de 18 años para registrarte.");
        return;
    }

    const datosFormulario = {
        nombreCompleto: nombreCompleto.value,
        PrimerApellido: apellido1.value,
        SegundoApellido: apellido2.value,
        cedula: cedula.value,
        fecha_nacimiento: fecha_nacimiento.value,
        sexo: sexo.value,
        estado_civil: estado_civil.value,
        nivel_educativo: nivel_educativo.value,
        situacion_laboral: situacion_laboral.value,
        cantidad_dependientes: cantidad_dependientes.value,
        nucleo_familiar: Nucleo_familiar.value,
        cuenta_iban: cuenta_iban.value,
        tipo_identificacion: tipo_identificacion.value,
        telefono: telefono.value,
        email: email.value,
        identidad_etnica: identidad_etnica.value,
        otra_identidad_etnica: otra_identidad_etnica.value,
    };
    localStorage.setItem("datosFormulario", JSON.stringify(datosFormulario));
    window.location.href = "DatosAdjuntos.html";

}
// -------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
// nos permite guardar documentos en el LS
function guardarDocumentosEnLocalStorage() {
    guardarDocumentoEnLocalStorage(['documento2', 'documento3']);
}

function guardarDocumentoEnLocalStorage(inputIds) {
    var promises = inputIds.map(function(inputId) {
        return new Promise(function(resolve, reject) {
            const input = document.getElementById(inputId);
            const file = input.files[0];

            if (file) {
                // Verificar si el archivo es un PDF y no está vacío
                if (file.type === 'application/pdf' && file.size > 0) {
                    const reader = new FileReader();

                    reader.onload = function (event) {
                        const contenidoBase64 = event.target.result;
                        localStorage.setItem(inputId, contenidoBase64);
                        toastr.success("Documento " + inputId + " guardado en localStorage.");
                        resolve();
                    };

                    reader.onerror = function (event) {
                        reject(new Error("Error al leer el archivo: " + event));
                    };

                    reader.readAsDataURL(file);
                } else {
                    reject(new Error("El archivo seleccionado para " + inputId + " no es un documento PDF o está vacío."));
                }
            } else {
                reject(new Error("No se seleccionó ningún documento para " + inputId));
            }
        });
    });

    Promise.all(promises)
        .then(function() {
            toastr.success("Documentos se han guardado correctamente");
            setTimeout(function () {
                window.location.href = "CartaCompromiso.html";
            }, 3000);
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
}

// ---------------------------------------------------------------------------
// el boton de volver a la pagina anterior en la que se encontraba
function goBack() {
    window.history.back();
}

// ------------------------------------------------------------------------------------

// Definimos la contraseña correcta
const correctPassword = "12345678";
const correctUser = "BAE";

// Función para abrir el modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para verificar la contraseña
function checkPassword() {
    // Obtenemos el valor ingresado por el usuario
    const passwordInput = document.getElementById("password").value;
    const userInput = document.getElementById("user").value;

    // Comparamos la contraseña ingresada con la contraseña correcta
    if (passwordInput === correctPassword && userInput === correctUser) {
        toastr.success("Has ingresado como funcionario de BAE.");
        // Si la contraseña y usuario son correctos, redirigimos a la URL deseada
        localStorage.setItem('tipo_usuario', 'Autorizado');
        setTimeout(function () {
            window.location.href = "Admin.html";
        }, 2000);
    } else {
        // Si la contraseña es incorrecta, mostramos un mensaje de error
        toastr.error("Nombre de usuario o contraseña incorrecta. Inténtalo de nuevo.");
    }

    // Cerramos el modal después de verificar la contraseña
    closeModal();
}

document.addEventListener('DOMContentLoaded', function () {
    // Comprobar si el local storage está lleno
    const datosParaCarta = localStorage.getItem('datosFormulario');
    const datosDisponibles = JSON.parse(decodeURIComponent(datosParaCarta));
if (datosParaCarta.length > 0 ) {
    if (datosDisponibles.fecha != "") { // Suponiendo que tienes otros datos guardados en el local storage
        // Ocultar el botón
        var boton = document.getElementById('btn1'); // Reemplaza 'id_del_boton' con el ID real de tu botón
        boton.style.display = "none";
    }
}
})

// ------------------------------------------------------------------------------------------
function seguirProceso() {
    window.location.href = "Form2BAE.html";
}

// ---------------------------------------------------------------------------

const estadoSolicitud = localStorage.getItem("Solicitud_estado");

if (estadoSolicitud == "Completada") {// Suponiendo que tienes datos guardados en el local storage
    // Mostrar el botón
    var boton = document.getElementById('btn2'); // Reemplaza 'btn2' con el ID real de tu botón
    boton.style.display = "block";
}
;
// -----------------------------------------------------------------------------------

// Obtén los elementos del DOM

// Agrega un event listener al elemento select para escuchar el evento 'change'
console.log(pageName);
if (pageName == "DatosPersonales.html") {
    identidad_etnica.addEventListener('change', function () {
        // Comprueba si el nuevo valor es 'Otra'
        if (identidad_etnica.value === 'Otra') {
            // Si es 'Otra', muestra el div
            body_otra_identidad_etnica.style.display = 'block';
        } else {
            // Si no es 'Otra', oculta el div
            body_otra_identidad_etnica.style.display = 'none';
        }
    });
}

