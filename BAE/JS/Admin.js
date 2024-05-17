// Carta 1
const solicitudesP = document.getElementById("solicitudesP")
const carta = document.getElementById("cartaDeLaSolictud")
const mensaje = document.getElementById("mensaje")
const nomvalida = document.getElementById('NombreSoli')
const Apellido1 = document.getElementById('Apellido1Soli')
const Apellido2 = document.getElementById('Apellido2Soli')
const cedvalida = document.getElementById('cedSoli')
const telefvalida = document.getElementById('telefonoSoli')
const emailvalida = document.getElementById('emailSoli')
// Carta 2
const solicitudesA = document.getElementById("solicitudesA")
const carta2 = document.getElementById("cartaDeLaSolictud2")
const mensaje2 = document.getElementById("mensaje2")
const nomvalidaA = document.getElementById('NombreSoli2')
const Apellido1A = document.getElementById('Apellido1Soli2')
const Apellido2A = document.getElementById('Apellido2Soli2')
const cedvalidaA = document.getElementById('cedSoli2')
const telefvalidaA = document.getElementById('telefonoSoli2')
const emailvalidaA = document.getElementById('emailSoli2')

const DatosParaSoli = localStorage.getItem('datosFormulario')
const datosDisponibles = JSON.parse(decodeURIComponent(DatosParaSoli));
const estadoSolicitud = localStorage.getItem("Solicitud_estado");
const usuario = localStorage.getItem('tipo_usuario');

document.addEventListener('DOMContentLoaded', function () {
    // Informacion basica del solicitante
    if (usuario != "Autorizado") {
        window.location.href = "BAE.html";
    }
    llenarInformacion()
    
    if (estadoSolicitud == "Completada") {
        carta.style.display = "none"
        mensaje.style.display = "block"
    
    }else{
        carta2.style.display = "none"
        mensaje2.style.display = "block"
    }
});

function llenarInformacion() {
// Carta 1
    nomvalida.innerHTML = datosDisponibles.nombreCompleto
    Apellido1.innerText = datosDisponibles.PrimerApellido
    Apellido2.innerText = datosDisponibles.SegundoApellido
    cedvalida.innerText = datosDisponibles.cedula
    telefvalida.innerHTML = datosDisponibles.telefono
    emailvalida.innerHTML = datosDisponibles.email
// Carta 2
    nomvalidaA.innerHTML = datosDisponibles.nombreCompleto
    Apellido1A.innerText = datosDisponibles.PrimerApellido
    Apellido2A.innerText = datosDisponibles.SegundoApellido
    cedvalidaA.innerText = datosDisponibles.cedula
    telefvalidaA.innerHTML = datosDisponibles.telefono
    emailvalidaA.innerHTML = datosDisponibles.email
}

function viaje() {
    window.location.href = "Solicitud.html";
}

function elegirOpcionP() {
    solicitudesP.style.display = "block"
    solicitudesA.style.display = "none"
}

function elegirOpcionA() {
    solicitudesA.style.display = "block"
    solicitudesP.style.display = "none"
}


function goBack() {
    window.location.href = "BAE.html";
}