// El principal objetivo de este desafío es fortalecer
// tus habilidades en lógica de programación. Aquí deberás
// desarrollar la lógica para resolver el problema.

//Creamos la lista de amigos a sortear
let amigos = [];
let amigosSorteados = [];

// Funcion para agregar amigos a la lista
function agregarAmigo() {
    let nombre = document.getElementById('amigo').value;
    document.getElementById('mostrarSorteo').hidden = true;
    document.getElementById('reiniciar').hidden = true;
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (validarNombre(nombre)) {
        amigos.push(nombre);
        document.getElementById('amigo').value = '';
        actualizarListaAmigos();
        amigosSorteados = [];
    } 
}

// Funcion para actualizar lista de amigos
function actualizarListaAmigos() {
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    for (let i = 0; i < amigos.length; i++) {
        let amigoListaHTML = document.createElement('li');
        amigoListaHTML.textContent = amigos[i];
        listaAmigos.appendChild(amigoListaHTML);
    }
}

// Funcion para validaciones del nombre
function validarNombre(nombre) {
    if (nombre === '') {
        alert('No se puede dejar vacio, por favor inserte un nombre');
        return false;
    // Raro si alguien solo se llama con un caracter, aunque en colombia alguien se llama 6, pero que ese coloque el apellido
    } else if (nombre.length < 2) { 
        alert('El nombre debe tener al menos 2 letras');
        return false;
    }
    return true;
}

// Funcion para sortear los amigos 
function sortearAmigo() {
    let tamanioLista = amigos.length;
    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    if (tamanioLista < 4) {
        alert('Debe haber al menos 4 amigos para poder sortear');
        actualizarListaAmigos();
        return;
    }
    if (tamanioLista % 2 !== 0) {
        alert('Verifique la cantidad de amigos, debe ser par para que ningun amigo se quede sin amigo secreto');
        actualizarListaAmigos();
        return;
    }
    let resutado = document.getElementById('resultado');
    resutado.innerHTML = '';

    let indiceAmigo = noRepetirAmigo(tamanioLista);
    if (indiceAmigo !== -1) {
        resutado.innerHTML = 'El amigo secreto sorteado es: ' + amigos[indiceAmigo];
        return;
    } else { 
        listaAmigos.innerHTML = 'El sorteo de amigos ha sido completado';
        document.getElementById('mostrarSorteo').hidden = false;
        document.getElementById('reiniciar').hidden = false;
        return; 
    }
}  

// Funcion para no repetir amigo secreto 
function noRepetirAmigo(tamanioLista) {
    let indiceAmigo = Math.floor(Math.random() * tamanioLista);

    if (amigosSorteados.length === tamanioLista) {
        return -1;
    } else {
        if (amigosSorteados.includes(indiceAmigo)) {
            return noRepetirAmigo(tamanioLista); 
        } else {
            amigosSorteados.push(indiceAmigo)
            return indiceAmigo;
        }
    }
}

// Funcion para mostrar el sorteo completo
function mostrarSorteo() {
    let resutado = document.getElementById('resultado');
    resutado.innerHTML = '';
    for (let i = 0; i < amigosSorteados.length; i += 2) {
        let amigoListaHTML = document.createElement('li');
        amigoListaHTML.textContent = amigos[amigosSorteados[i]] + ' ----> ' + amigos[amigosSorteados[i + 1]];
        resutado.appendChild(amigoListaHTML);
    }
}

// Funcion para reiniciar el sorteo
function reiniciarSorteo() {
    amigos = [];
    amigosSorteados = [];
    document.getElementById('amigo').value = '';
    document.getElementById('mostrarSorteo').hidden = true;
    document.getElementById('reiniciar').hidden = true;
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('listaAmigos').innerHTML = '';
}

