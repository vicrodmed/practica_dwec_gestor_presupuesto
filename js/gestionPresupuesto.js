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

    this.obtenerPeriodoAgrupacion = function (periodo) {

        let fechaString = new Date(this.fecha).toISOString(); // Como this.fecha es un timestamps, creamos un Date y obtenemos la fecha en string.

        if (periodo == "mes") return fechaString.substring(0, 7);
        if (periodo == "dia") return fechaString.substring(0, 10);
        if (periodo == "anyo") return fechaString.substring(0, 4);

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

function filtrarGastos(parametros) { // parametros es un objeto con las siguientes propiedades fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene.

    console.log(parametros);
    console.log(Object.keys(parametros).length);
    

    if (Object.keys(parametros).length == 0) return gastos; // Si no entra ningun parámetros devolvemos todos los gastos.

    return gastos.filter(function (gasto) { // funcion filter recorre todos los gastos y aplica los criterios de filtrado.

        let resultado = true;

        //FECHAS
        if (parametros.fechaDesde !== undefined || parametros.fechaHasta !== undefined) { // Si no se aporta fechas, pasamos al resto de criterios.

            let fechaDesdeTimestamp = Date.parse(parametros.fechaDesde); //Convertir a timestamp.
            let fechaHastaTimestamp = Date.parse(parametros.fechaHasta);//Convertir a timestamp.

            if (gasto.fecha < fechaDesdeTimestamp) return false; // Si el gasto se registra con una fecha inferior a fechaDesde devolvemos false.
            if (gasto.fecha > fechaHastaTimestamp) return false; // Si el gasto se registra con una fecha superior a fechaHasta devolvemos false.
            if (gasto.fecha >= fechaDesdeTimestamp && gasto.fecha <= fechaHastaTimestamp) resultado = true; // Si el gasto se registra con entre las fechas fechaDesde y fechaHasta devolvemos verdadero.
        }

        // VALOR
        if (parametros.valorMinimo !== undefined || parametros.valorMaximo !== undefined) { // Si no se aporta valores min y max pasamos al resto de criterios.
            // Con los valores max y min, realizamos lo mismo que con las fechas.
            if (gasto.valor < parametros.valorMinimo) return false;
            if (gasto.valor > parametros.valorMaximo) return false;
            if (gasto.valor >= parametros.valorMinimo && gasto.valor <= parametros.valorMaximo) resultado = true;
        }

        //DESCRIPCIÓN
        if (parametros.descripcionContiene !== undefined) { // Si no se aporta descrición pasamos al siguietne criterio.

            // Convertimos todo a minúsculas para realizar la comparación que no se distingan entre mayúsculas y minúsculas.
            let gastoDescripMinus = gasto.descripcion.toLowerCase();
            let parametroDescripContiene = parametros.descripcionContiene.toLowerCase();

            if (gastoDescripMinus.includes(parametroDescripContiene)) { // Comprobamos con includes si la descripcion del gasto está dentro de descripcionContiene.
                resultado = true;
            }
            else {
                resultado = false;
            }
        }

        //ETIQUETAS
        if (parametros.etiquetasTiene !== undefined) { // Si no se aporta etiquetas, no se comprueba el criterio.

            //ERROR DETECTADO: NO se había hecho la comparación de maneta que no se distingan mayúsculas de minúsculas.Corrección:
            let parametroEtiquetasMinus = parametros.etiquetasTiene.map(e => e.toLowerCase());
            let etiquetasGastoMinus = gasto.etiquetas.map(e =>e.toLowerCase());

            for (let e of parametroEtiquetasMinus) { //Recorremos todas las etiquetas pasadas por parametro y comprobamos que si están en las etiquetas del gasto.
                if (etiquetasGastoMinus.includes(e)) {
                    resultado = true;
                    break; // En cuanto coincida una etiqueta asignamos true y salimos del for ... of.
                }
                else {
                    resultado = false; // Si coincide seguimos buscando por todas las etiquetas y asignamos false.
                }
            }
        }

        return resultado; // Y por ultimo devolvemos resutaldo.
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta = new Date().toISOString().split("T")[0]) {
// Parametros por defecto.

    let parametrosFiltrados = { // Como la función filtrarGasto recibe un un objeto como parametro, creamos un objeto para todos los parametros
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    }

    let gastosFiltrados = filtrarGastos(parametrosFiltrados);

    return gastosFiltrados.reduce(function (acc, gasto) { // reduce recibe dos parámetros: una función y un objeto vacío.

        let perAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        acc[perAgrupacion] = acc[perAgrupacion] || 0;
        acc[perAgrupacion] += gasto.valor;

        return acc;

    }, {});

}

function transformarListadoEtiquetas (etiquetas) {
/*
Para dar todas las facilidades a los usuarios, admitiremos varios tipos de separadores: ,, ., :, ; y espacio. Así, los usuarios podrán introducir las etiquetas de diferentes maneras: eti1, eti2, eti1 eti2, eti1:eti2, eti1;eti2, eti1.eti2.
Ten en cuenta que la función debe manejar también correctamente combinaciones de separadores (coma más espacio, espacio más coma, etc.).

a = transformarListadoEtiquetas("eti1,eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1, eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1 , eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1 ,   eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1.eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1. eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1:eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1;eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1 eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1    eti2"); // a = ["eti1","eti2"]
a = transformarListadoEtiquetas("eti1 :, ; eti2"); // a = ["eti1","eti2"]
*/

let regEtiquetas = /\w*/g;

let arrayEtiquetas = etiquetas.match(regEtiquetas);
let arrayEtiquetasSinNulos =[];

for (let e of arrayEtiquetas) {
    if(e.length>0){
        arrayEtiquetasSinNulos.push(e)
    }
}

return arrayEtiquetasSinNulos;

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
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas
}