function mostrarDatoEnID (idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent=valor;
}

function mostrarGastoWeb (idElemento, gasto){

}

function mostrarGastosAgrupadosWeb (idElemento,agrup,periodo){

}

export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}