import * as presupuesto from './gestionPresupuesto.js'

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

let botonAnyadirgasto = document.getElementById('anyadirgasto');
botonAnyadirgasto.addEventListener("click",anyadirgasto);


//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado
function mostrarDatoEnID(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro
function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement('div'); // Creación <div class="gasto">
    divGasto.className = 'gasto';

    let divGastoDescripcion = document.createElement('div'); // <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    divGastoDescripcion.className = 'gasto-descripcion';
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion); //Añadimos al final de <div class="gasto"> con append

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
    divGastoFecha.textContent = new Date(gasto.fecha).toISOString().split('T')[0];
    divGasto.append(divGastoFecha);//Añadimos al final de <div class="gasto"> con append

    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);//Añadimos al final de <div class="gasto"> con append

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    divGasto.append(divGastoEtiquetas);//Añadimos al final de <div class="gasto"> con append

    for (let e of gasto.etiquetas) { // Creamos un spam por cada etiqueta que existe en el gasto.
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = "#" + e + " ";
        let manejadorEtiqueta = new BorrarEtiquetasHandle();
        manejadorEtiqueta.gasto = gasto;
        manejadorEtiqueta.etiqueta = e;
        spanEtiqueta.addEventListener("click",manejadorEtiqueta);
        divGastoEtiquetas.append(spanEtiqueta);
    }

    // Botón Editar
    let botonEditar =document.createElement('button');
    botonEditar.textContent="Editar";
    botonEditar.className="gasto-editar"
    divGasto.append(botonEditar);
    let manejadorBotonEditar = new EditarHandle();
    manejadorBotonEditar.gasto = gasto;
    botonEditar.addEventListener("click",manejadorBotonEditar);

    //Botón Borrar
    let botonBorrar =document.createElement('button');
    botonBorrar.textContent="Borrar";
    botonBorrar.className="gasto-borrar"
    divGasto.append(botonBorrar);
    let manejadorBotonBorrar = new BorrarHandle();
    manejadorBotonBorrar.gasto = gasto;
    botonBorrar.addEventListener("click",manejadorBotonBorrar);

    elemento.append(divGasto); // Añadimos al final del elemento pasado por parametro
    elemento.append(document.createElement('br')); // Añadimos al final un linea en blanco para mejor la visibilidad de cada gasto.
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let elemento = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div'); // Creación <div class="agrupacion">
    divAgrupacion.className = 'agrupacion';

    let periodoText = "";

    switch (periodo) { // Según el parametro periodo creamos el texto para el <h1>
        case "dia":
            periodoText = "Gastos agrupados por día";
            break;
        case "mes":
            periodoText = "Gastos agrupados por mes";
            break;
        case "anyo":
            periodoText = "Gastos agrupados por año";
            break;

        default:
            break;
    }

    let h1Titulo = document.createElement('h1');
    h1Titulo.textContent = periodoText;
    divAgrupacion.append(h1Titulo);

    Object.entries(agrup).forEach(([clave, valor]) => { // Recorremos el objeto agrup y trabajamos con cada par de clave/valor para ir creando la estructura del html.

        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';

        let spamClave = document.createElement('span');
        spamClave.className = 'agrupacion-dato-clave';
        spamClave.textContent = clave + ": ";

        let spamValor = document.createElement('span');
        spamValor.className = 'agrupacion-dato-valor';
        spamValor.textContent = valor;

        divAgrupacionDato.append(spamClave);
        divAgrupacionDato.append(spamValor);

        divAgrupacion.append(divAgrupacionDato);
    });

    elemento.append(divAgrupacion); //Finalmente añadimos al final del elemento pasado por parámetro.
}

function repintar () { // SIN EXPORTAR DE MOMENTO
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnID('presupuesto',presupuesto.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnID('gastos-totales', "Total gastos: " + presupuesto.calcularTotalGastos() + " €");

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnID('balance-total', "Balance total: " + presupuesto.calcularBalance() + " €");

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById('listado-gastos-completo').innerHTML="";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let e of presupuesto.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', e);
    }
}

function actualizarPresupuestoWeb (){
    let valorNuevoPresupuesto =Number( prompt("Introduzca el nuevo presupuesto: "));
    presupuesto.actualizarPresupuesto(valorNuevoPresupuesto);
    repintar();
}

function anyadirgasto (){
    let descripcion = prompt("Introduzca la descripción del gasto: ");
    let valor = Number(prompt("Introduzca el valor del gasto: "));
    let fecha = prompt("Introduzca la fecha del gasto (yyyy-mm-dd): ");
    let etiquetasConComas = prompt("Introduzcas las etiquetas separadas por comas: ");
    let arrayEtiquetas = etiquetasConComas.split(',');

    let nuevoGasto = new presupuesto.CrearGasto(descripcion,valor,fecha,...arrayEtiquetas);// rest parameter: arrayEtiquetas.
    presupuesto.anyadirGasto(nuevoGasto);
    repintar();
}

function EditarHandle() {
    this.handleEvent = function () {

        this.gasto.actualizarDescripcion(prompt("Modificar descripción del gasto? ", this.gasto.descripcion));
        this.gasto.actualizarValor(Number(prompt("Modificar valor del gasto? ", this.gasto.valor)));
        this.gasto.actualizarFecha(prompt("Modificar fecha del gasto? (aaaa-mm-dd)? ", new Date(this.gasto.fecha).toISOString().split('T')[0]));

        let arrayEtiquetas = this.gasto.etiquetas;
        let etiquetasTexto = arrayEtiquetas.join(",");

        let etiquetasConComas = prompt("Modificar etiquetas del gasto? ",etiquetasTexto);
        let etiquetasSeparadas = etiquetasConComas.split(',');

        etiquetasSeparadas.forEach(e => this.gasto.anyadirEtiquetas(e));

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(){
        presupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle (){
    this.handleEvent = function (){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}