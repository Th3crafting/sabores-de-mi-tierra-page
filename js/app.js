'use strict';

// Constantes
const navBar = document.getElementById('navContainer');
const form = document.getElementById('formularioContacto');
const enviar = document.getElementById('formContactoBtnEnviar');

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