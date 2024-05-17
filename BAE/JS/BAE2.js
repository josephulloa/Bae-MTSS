// Obtener referencia al enlace de descarga\
var enlaceDescarga = document.getElementById('descargar');
const estadoSolicitud = localStorage.getItem("Solicitud_estado");


document.addEventListener('DOMContentLoaded', function () {
    // Informacion basica del solicitante
    if (estadoSolicitud != "Completada") {
        window.location.href = "BAE.html";
    }
});
// Agregar evento clic al enlace
enlaceDescarga.addEventListener('click', function() {
    // Crear un elemento 'a' temporal
    var link = document.createElement('a');
    link.setAttribute('href', '/Bae/img/2-BitacoradeaccionesBAE.docx'); // Reemplaza con la ruta de tu archivo
    link.setAttribute('download', 'BitacoraBAE.docx'); // Puedes cambiar el nombre del archivo que se descargará

    // Simular clic en el enlace temporal
    link.click();

    // Limpiar el elemento 'a' temporal
    link.remove();
});

// Obtener referencia al enlace de descarga
var enlaceDescarga2 = document.getElementById('descargar2');

// Agregar evento clic al enlace
enlaceDescarga2.addEventListener('click', function() {
    // Crear un elemento 'a' temporal
    var link = document.createElement('a');
    link.setAttribute('href', '/Bae/img/2-PlanIndividualdeactividadesBAE(1)(1).docx'); // Reemplaza con la ruta de tu archivo
    link.setAttribute('download', 'PlanIndividual.docx'); // Puedes cambiar el nombre del archivo que se descargará

    // Simular clic en el enlace temporal
    link.click();

    // Limpiar el elemento 'a' temporal
    link.remove();
});

// ----------------------------------------------------------------------------------

// funcion para guardar los documentos de las bitacoras al ser aprovado y llevar el control acerca del beneficiario del programa 
function guardarDocumentosEnLocalStorage2() {
    guardarDocumentoEnLocalStorage('documento4');
    guardarDocumentoEnLocalStorage('documento5');
};

function guardarDocumentoEnLocalStorage(inputId) {
    const input = document.getElementById(inputId);
    const file = input.files[0];

    if (file) {
        if (file.type === 'application/pdf') {
            const reader = new FileReader();

            reader.onload = function (event) {
                const contenidoBase64 = event.target.result;
                localStorage.setItem(inputId, contenidoBase64);
                toastr.success("Documento " + inputId + " guardado en localStorage.");
            };

            reader.readAsDataURL(file);
            toastr.success("Documentos se han guardado en correctamente");
        } else {
            toastr.error("El archivo seleccionado para " + inputId + " no es un documento PDF.");
        }
    } else {
        toastr.error("No se seleccionó ningún documento para " + inputId);
    }
}


// ------------------------------------------------------------------------------------
function redirect() {

    alert("Felicidades, has completado el proceso");
    window.location.href = "BAE.html";
    
}