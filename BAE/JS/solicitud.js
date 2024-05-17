const nomvalida = document.getElementById('NombreSoli');
const Apellido1 = document.getElementById('Apellido1Soli')
const Apellido2 = document.getElementById('Apellido2Soli')
const cedvalida = document.getElementById('cedSoli')
const genvalida = document.getElementById('genSoli')
const fechvalida = document.getElementById('fechSoli')
const tipoIdentificacionvalida = document.getElementById('tipoIdentificacionSoli')
const telefvalida = document.getElementById('telefonoSoli')
const emailvalida = document.getElementById('emailSoli')
const cuentavalida = document.getElementById('cuentaIBANSoli')
const estadoCvalida = document.getElementById('estadoCivilSoli')
const dependientesvalida = document.getElementById('dependientesSoli')
const nucleoFvalida = document.getElementById('nucleoFSoli')
const nivelEduvalida = document.getElementById('nivelEduSoli')
const situacionLabvalida = document.getElementById('situacionLabSoli')
const etniavalida = document.getElementById('etniaSoli')
const files2 = document.getElementById('files2Container')
const mensaje = document.getElementById('mensaje')
const DatosParaSoli = localStorage.getItem('datosFormulario');
const datosDisponibles = JSON.parse(decodeURIComponent(DatosParaSoli));
const file4 = localStorage.getItem('documento4');
const file5 = localStorage.getItem('documento5');
const Carta = localStorage.getItem('pdf');
const estado = localStorage.getItem('Solicitud_estado');
const usuario = localStorage.getItem('tipo_usuario');



document.addEventListener('DOMContentLoaded', function () {
    // Informacion basica del solicitante
    if (usuario != "Autorizado") {
        window.location.href = "BAE.html";
    }
    nomvalida.innerText = datosDisponibles.nombreCompleto
    Apellido1.innerText = datosDisponibles.PrimerApellido
    Apellido2.innerText = datosDisponibles.SegundoApellido
    cedvalida.innerText = datosDisponibles.cedula
    genvalida.innerText = datosDisponibles.sexo
    fechvalida.innerText = datosDisponibles.fecha_nacimiento
    tipoIdentificacionvalida.innerHTML = datosDisponibles.tipo_identificacion
    // Informacion de contacto
    telefvalida.innerHTML = datosDisponibles.telefono
    emailvalida.innerHTML = datosDisponibles.email
    cuentavalida.innerHTML = datosDisponibles.cuenta_iban
    // Informacion Personal
    estadoCvalida.innerHTML = datosDisponibles.estado_civil
    dependientesvalida.innerHTML = datosDisponibles.cantidad_dependientes
    nucleoFvalida.innerHTML = datosDisponibles.nucleo_familiar
    nivelEduvalida.innerHTML = datosDisponibles.nivel_educativo
    situacionLabvalida.innerHTML = datosDisponibles.situacion_laboral
    etniavalida.innerHTML = datosDisponibles.identidad_etnica

});

document.addEventListener('DOMContentLoaded', function () {
        // Recuperar la cadena base64 del almacenamiento local
        var base64Pdf = localStorage.getItem('pdf');
    
        // Convertir la cadena base64 de nuevo a un Blob
        var binaryPdf = atob(base64Pdf);
        var len = binaryPdf.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binaryPdf.charCodeAt(i);
        }
        var blob = new Blob([view], {type: "application/pdf"});
    
        // Crear un objeto URL para el Blob
        var url = URL.createObjectURL(blob);
    
        // Crear un iframe para mostrar el PDF
        var iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = '50%';
        iframe.height = '500px';
    
        // Añadir el iframe al cuerpo del documento
        var contenedor3 = document.getElementById('cartContainer'); 
        contenedor3.appendChild(iframe);
})


document.addEventListener('DOMContentLoaded', function () {
    // Definimos las claves de los documentos que queremos mostrar
    const clavesDocumentos = ['documento3', 'documento2'];

    // Iteramos sobre las claves de los documentos
    clavesDocumentos.forEach(function (key) {
        // Obtenemos el contenido base64 almacenado en localStorage
        const contenidoBase64 = localStorage.getItem(key);

        // Verificamos si hay contenido almacenado para la clave actual
        if (contenidoBase64) {
            // Creamos un contenedor div para el documento
            const documentoContainer = document.createElement('div');
            documentoContainer.classList.add('documento-container'); // Añadimos una clase CSS para el contenedor

            // Creamos un elemento <embed> para mostrar el documento
            const embed = document.createElement('embed');
            embed.src = contenidoBase64;
            embed.type = 'application/pdf'; // Se puede cambiar el tipo de acuerdo al tipo de documento

            // Establecemos algunos estilos para el elemento embed
            embed.style.padding = "10px"
            embed.style.width = '40%';
            embed.style.height = '500px'; // Altura fija para evitar cambios bruscos en el diseño

            // Agregamos el elemento embed al contenedor del documento

            // Agregamos el contenedor del documento al cuerpo del documento
            var contenedor = document.getElementById('pdfContainer'); // Aquí 'contenedor' sería el ID del elemento donde deseas agregar el nuevo div
            contenedor.appendChild(embed);
        }
    });
})

function redireccionar() {

        // Verificar si ya existe un estado de solicitud en el localStorage
        var estadoExistente = localStorage.getItem('Solicitud_estado');
    
        if (estadoExistente) {
            // Mostrar alerta de que la solicitud ya existe
            alert("¡La solicitud ya existe!");
            return; // Salir de la función si ya existe una solicitud
        }

    Swal.fire({
        title: "¿El usuario es apto para el beneficio del BAE?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            alert("Has aceptado al usuario");
            // Guardar el estado en el localStorage
            localStorage.setItem('Solicitud_estado', 'Completada');
            // Redirigir a otra página
            window.location.href = "Admin.html";
        } else if (result.isDenied) {
            alert("Has denegado al usuario");
            // Guardar el estado en el localStorage
            localStorage.setItem('Solicitud_estado', 'Denegado');
            // Redirigir a otra página
            window.location.href = "Admin.html";
        }
    });
}

    document.addEventListener('DOMContentLoaded', function () {
    if (estado == "Completada" && file4 !== null && file5 !== null) {
        files2.style.display = "block"
        mensaje.style.display = "none"
            // Definimos las claves de los documentos que queremos mostrar
            const clavesDocumentos2 = ['documento4', 'documento5'];
        
            // Iteramos sobre las claves de los documentos
            clavesDocumentos2.forEach(function (key) {
                // Obtenemos el contenido base64 almacenado en localStorage
                const contenidoBase64 = localStorage.getItem(key);
        
                // Verificamos si hay contenido almacenado para la clave actual
                if (contenidoBase64) {
                    // Creamos un contenedor div para el documento
                    const documentoContainer2 = document.createElement('div');
                    documentoContainer2.classList.add('documento-container'); // Añadimos una clase CSS para el contenedor
        
                    // Creamos un elemento <embed> para mostrar el documento
                    const embed2 = document.createElement('embed');
                    embed2.src = contenidoBase64;
                    embed2.type = 'application/pdf'; // Se puede cambiar el tipo de acuerdo al tipo de documento
        
                    // Establecemos algunos estilos para el elemento embed
                    embed2.style.padding = "10px"
                    embed2.style.width = '40%';
                    embed2.style.height = '500px'; // Altura fija para evitar cambios bruscos en el diseño
        
                    files2.appendChild(embed2);
                }
            });
    }else if (estado == "Completada" && file4 == null && file5 == null ) {
        files2.style.display = "block"
    }
})
