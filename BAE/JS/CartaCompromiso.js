
const nomvalida = document.getElementById('nom');
const cedvalida = document.getElementById('ced');
const Apellido1 = document.getElementById('apellido1')
const Apellido2 = document.getElementById('apellido2')
const ubicacion = document.getElementById('ubicacion');
const resultadoUbi = document.getElementById("resultadoUbi")
const datosParaCarta = localStorage.getItem('datosFormulario');
const datosDisponibles = JSON.parse(decodeURIComponent(datosParaCarta));
var fecha = new Date();
var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
var fechaFormateada = fecha.toLocaleDateString('es-ES', options);

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de la variable
    nomvalida.innerText = datosDisponibles.nombreCompleto
    cedvalida.innerText = datosDisponibles.cedula
    Apellido1.innerText = datosDisponibles.PrimerApellido
    Apellido2.innerText = datosDisponibles.SegundoApellido
    
});

function mostrarFechaHora() {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = fechaFormateada;
}

window.onload = function () {
    mostrarFechaHora();
};

function guardarDatosCarta() {
    datosCarta = {
        nombre_de_Persona: datosDisponibles.nombreCompleto,
        apellido1: datosDisponibles.PrimerApellido,
        apellido2: datosDisponibles.SegundoApellido,
        ubicacion: ubicacion.value,
        cedula_Persona: datosDisponibles.cedula,
        fecha: fechaFormateada
    }
    
    if (ubicacion.value.trim() === "") {
        toastr.error(`El campo ${ubicacion.name}  es obligatorio.`);
        return; // Detener la función si un campo obligatorio está vacío
    }
    localStorage.setItem('datosCarta', JSON.stringify(datosCarta));
    console.log(datosCarta);
    ubicacion.style.display = "none"
    resultadoUbi.innerHTML = ubicacion.value
}

// el alert que nos permite saber si eres apto para el beneficio de BAE en caso de no aplicar se maneja de manera distinta
function redirect() {
    
    if (ubicacion.value !== "") {
        
        Swal.fire({
            title: "¿Estas seguro que la informacion proporcionada es es la correcta?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No`,
        }).then((result) => {
    
            if (result.isConfirmed) {
                toastr.success("Felicidades completaste el formulario BAE, posteriormente se habilitaran nuevos pasos en caso de ser aceptada tu solicitud");
                htmlAPdf()
                setTimeout(function() {
                    window.location.href = "BAE.html";
                }, 6000);
            } else if (result.isDenied) {
                toastr.error("Corrogir los datos necesarios : D");
            }
        });
    }
}

function htmlAPdf() {
    var HTML_Width = $("#carta_compromiso").width();
    var HTML_Height = $("#carta_compromiso").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;

    html2canvas($("#carta_compromiso")[0],{allowTaint:true}).then(function(canvas) {
        canvas.getContext('2d');

        console.log(canvas.height+"  "+canvas.width);

        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('P', 'pt',  [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);

        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
        }

        // Convertir el PDF a una cadena base64
        var base64Pdf = btoa(pdf.output());

        // Almacenar la cadena base64 en el almacenamiento local
        localStorage.setItem('pdf', base64Pdf);
    });
};


