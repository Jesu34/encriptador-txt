const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto-aviso");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta-contenedor");
const btnCopiar = document.querySelector(".btn-copiar");

function mostrarAviso(mensaje) {
    aviso.style.background = "#0A3871";
    aviso.style.color = "#FFFFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;

    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "")
        .toLowerCase();
}

function encriptarTexto(texto) {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

function procesarTexto(encriptar) {
    const texto = txtEncriptar.value;
    const textoNormalizado = normalizarTexto(texto);

    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
    } else if (texto !== textoNormalizado) {
        mostrarAviso("No debe tener acentos y caracteres especiales");
    } else {
        const textoProcessado = encriptar ? encriptarTexto(textoNormalizado) : desencriptarTexto(textoNormalizado);
        respuesta.textContent = textoProcessado;
        btnCopiar.style.visibility = "visible";
        contenido.style.display = "none";
    }
}

btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    procesarTexto(true);
});

btnDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    procesarTexto(false);
});

btnCopiar.addEventListener("click", (e) => {
    e.preventDefault();
    const textoCopiar = respuesta.textContent;
    navigator.clipboard.writeText(textoCopiar).then(() => {
        mostrarAviso("Texto copiado al portapapeles");
    }).catch(err => {
        console.error('Error al copiar texto: ', err);
        mostrarAviso("Error al copiar texto");
    });
});