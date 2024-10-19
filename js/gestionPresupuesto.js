// TODO: Crear las funciones, objetos y variables indicadas en el  enunciado


// TODO: Variable global
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor) {

    if (typeof valor === 'number' && valor > 0) { // Comprueba si valor es un número y es positivo
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

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) { // Valor por defecto en fecha, seria fecha actual.

    this.descripcion = descripcion;

    if (valor > 0) { // Si el valor es positivo lo almacenamos, y si no asignamos a valor 0.
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (isNaN(Date.parse(fecha))) { // Si la fecha no tiene formato valido, almacenamos fecha actual.
        this.fecha = Date.now();
    }
    else {
        this.fecha = Date.parse(fecha); // Si fecha tiene formato valido, parseamos.
    }


    this.etiquetas = new Array(); // CORRECIÓN DEL PROFESOR. Inicializamos con array vacío y posteriormente utilizamos el método anyadirEtiquetas. De esta manera evitamos etiquetas duplicadas desde la creación del objeto.


    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.";
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if (valor > 0) this.valor = valor;
    }

    this.mostrarGastoCompleto = function () {

        let fechaTexto = new Date(this.fecha).toLocaleString(); // fechaTexto almacenamos fecha legible.
        let etiquetasGasto = "";

        this.etiquetas.forEach(etiqueta => { // etiquetasGasto almacena todas las etiquetas listadas con un guión
            etiquetasGasto = etiquetasGasto + "- " + etiqueta + "\n";
        });

        return this.mostrarGasto() + "\n" + "Fecha: " + fechaTexto + "\n" + "Etiquetas:\n" + etiquetasGasto; //Concatenamos todo y devolvemos en el formato exigido.
    }

    this.actualizarFecha = function (fecha) {

        if (!Number.isNaN(Date.parse(fecha))) { // Comprobamos que sea un formato válido
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function (...etiquetasNuevas) {

        for (let e of etiquetasNuevas) { // Recorremos todas las etiquetas a añadir, y si no están se insertan
            if (this.etiquetas.indexOf(e) == -1)
                this.etiquetas.push(e);
        }

    }

    this.anyadirEtiquetas(...etiquetas); // CORRECIÓN DEL PROFESOR. En lugar de pasar directamente el listado de etiquetas, puedes utilizar this.anyadirEtiquetas para eliminar duplicados, por ejemplo.

    this.borrarEtiquetas = function (...etiquetasABorrar) { // Recorremos todas las etiquetas a borrar, y si estan se elimina. Si no esta no se hace nada.
        let index;
        for (let e of etiquetasABorrar) {
            index = this.etiquetas.indexOf(e);
            if (index != -1) {
                this.etiquetas.splice(index, 1);
            }
        }
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

function borrarGasto(id) { // Recorremos el array gastos y si existe coincidencia con id, se elimina el objeto CrearGasto.
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let suma = 0;
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
