'use strict';

// Constantes
const navBar = document.getElementById('navContainer');
const form = document.getElementById('formularioContacto');
const enviar = document.getElementById('formContactoBtnEnviar');
const botonSubir = document.querySelector(".boton_subir");
const contenedorRecetas = document.getElementById('contenedorRecetas');
const contenedorRecetaExpandida = document.getElementById('contenedorCartaExpandida');
const cartaExpandida = document.querySelector(".carta_expandida");
const imagenReceta = document.getElementById('imagenRecetaCartaExpandida');
const tituloReceta = document.getElementById('ContenitoTituloCartaExpandida');
const listaIzquierda = document.getElementById('listaIzquierdaCartaExpandida');
const listaDerecha = document.getElementById('listaDerechaCartaExpandida');
const preparacionReceta = document.getElementById('contenidoPreparacionCartaExpandida');

// ------● Código para el botón de subir ●------

botonSubir.addEventListener('click', function (e) {
    e.preventDefault();
    const inicio = window.scrollY;
    const destino = 0;
    const distancia = destino-inicio;
    const duracion = 800;

    let inicioAnimacion = null;
    function animarScroll(tiempo){
        if(!inicioAnimacion) inicioAnimacion = tiempo;

        const tiempoTranscurrido = tiempo-inicioAnimacion;
        const posicionActual = inicio+distancia*(tiempoTranscurrido/duracion);
        window.scrollTo(0, posicionActual);

        if(tiempoTranscurrido<duracion){
            requestAnimationFrame(animarScroll);
        }
    }
    requestAnimationFrame(animarScroll);
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 200){
        botonSubir.style.display = "block";
    }else {
        botonSubir.style.display = "none";
    }
});

// ------● Código para expansión de las recetas ●------
function expandirCarta(idReceta) {
    contenedorRecetaExpandida.style.display = 'flex';
    fetch('../assets/json/recetas.json')
        .then(response => response.json())
        .then(data => {
            const identificadorReceta = idReceta;
            const receta = data[identificadorReceta];

            imagenReceta.src = receta.imagen;
            tituloReceta.textContent = receta.titulo;

            receta.ingredientes.forEach((ingrediente, index) => {
                const itemLista = document.createElement('li');
                itemLista.textContent = ingrediente;

                if(index<=8){
                    listaIzquierda.appendChild(itemLista);
                }else{
                    listaDerecha.appendChild(itemLista);
                }
            });

            const descripcionReceta = receta.preparacion;

            document.getElementById('contenidoPreparacionCartaExpandida').innerHTML = descripcionReceta;
        })
        .catch(error => {
            console.error('Error al cargar los datos : ', error);
        });
    
    setTimeout(() => {
        cartaExpandida.style.transform = 'scale(1)';
    }, 100);

    setTimeout(() => {

    }, 300);
}

function cerrarCartaExpandida() {
    cartaExpandida.style.transform = 'scale(0.7)';
    setTimeout(() => {
        contenedorRecetaExpandida.style.display = 'none';

        listaIzquierda.innerHTML = '';
        listaDerecha.innerHTML = '';
        document.getElementById('contenidoPreparacionCartaExpandida').innerHTML = '';
    }, 300);
}

contenedorRecetas.addEventListener('click', (e) => {
    const cartaClic = e.target.closest('.carta_receta');
    const idReceta = cartaClic.id;
    console.log(idReceta);
    if(cartaClic){
        expandirCarta(idReceta);
    }
});

contenedorRecetaExpandida.addEventListener('click', (e) => {
    if(e.target === contenedorRecetaExpandida){
        cerrarCartaExpandida();
    }
});

// ------● Código validación del formulario ●------

// Objeto para validación del formulario
const formValid = {
    nombre: false,
    correo: false,
    comentario: false
}

// Envio del formulario
enviar.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(Object.values(formValid));
    if(formValidValues(formValid) === -1){
        alert("Comentarios enviados.");
        form.reset();
    }else{
        alert("Campos incompletos");
    }
});

// Validación del formulario
const formValidValues = (objeto) =>{
    const values = Object.values(objeto);
    let response = values.findIndex(e => e ===false);
    return response;
}

// Validación a del cambio del formulario
form.addEventListener('change', (e) => {
    const idEntrada = e.target.id;
    console.log(idEntrada);
    const valorEntrada = e.target.value;
    console.log(valorEntrada);
    const claseEntrada = e.target.classList;
    console.log(claseEntrada);

    // Funciones
    const validClass = () => {
        claseEntrada.remove("is_invalid");
        claseEntrada.add("is_valid");
    };
    const inValidClass = () => {
        claseEntrada.remove("is_valid");
        claseEntrada.add("is_invalid");
    };

    switch (idEntrada) {
        case "formContactoNombre":
            const nombresRx = /^([A-Z][a-z]{2,})(\s[A-Z][a-z]{2,})?(\s[A-Z][a-z]{2,})(\s[A-Z][a-z]{2,})?$/g;
            formValid.nombre = valorEntrada.match(nombresRx) ? true : false;
            formValid.nombres ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case "formContactoCorreo":
            const correoRx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,}(\.co)?$/g;
            formValid.correo = valorEntrada.match(correoRx) ? true : false;
            formValid.correo ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
        case "formContactoComentario":
            const cometarioRx = /^.{3,300}$/g;
            formValid.comentario = valorEntrada.match(cometarioRx) ? true : false;
            formValid.comentario ? validClass() : inValidClass();
            console.log(Object.values(formValid));
            break;
    }
})

// ------● Animacion navBar ●------

// Animacion de la navBar
let prevScrollPos = window.scrollY;

window.addEventListener("scroll", function (){
    let currScrollPos = window.scrollY;

    if(currScrollPos > prevScrollPos){
        navBar.style.transform = `translateY(-105%)`;
    }else{
        navBar.style.transform = `translateY(0%)`;
    }

    prevScrollPos = currScrollPos;
});