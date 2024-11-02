function mostrarDatoEnID(idElemento, valor) {

    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';

    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className='gasto-descripcion';
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className ='gasto-fecha';
    divGastoFecha.textContent= new Date (gasto.fecha).toISOString().split('T')[0];
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className='gasto-valor';
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className='gasto-etiquetas';
    divGasto.append(divGastoEtiquetas);

    for (let e of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className='gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = "#" + e + " ";
        divGastoEtiquetas.append(spanEtiqueta);
    }

    elemento.append(divGasto);
    elemento.append(document.createElement('br'));
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}

export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}