// TODO: Crear las funciones, objetos y variables indicadas en el  enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === 'number' && valor > 0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor debe ser un número y no negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {

    this.descripcion = descripcion;

    if (valor > 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    if (etiquetas === undefined) {
        this.etiquetas = new Array();
    }
    else {
        this.etiquetas = etiquetas;
    }

    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if (valor > 0) this.valor = valor;
    }

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if(gastos[i].id == id){
            gastos.splice(i,1);
        } 
    }
}

function calcularTotalGastos() {
    let suma=0;
    for (let i = 0; i < gastos.length; i++) {
        suma = suma + gastos[i].valor;
    }
    return suma;
}

function calcularBalance() {
 return presupuesto - calcularTotalGastos();
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
