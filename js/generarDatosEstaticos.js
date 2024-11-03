//Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. Puedes utilizar import * as para utilizar un nombre de módulo que agrupe las funciones exportadas por cada fichero.
import * as presupuesto from './gestionPresupuesto.js'
import * as web from './gestionPresupuestoWeb.js'

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
presupuesto.actualizarPresupuesto(1500);
web.mostrarDatoEnID('presupuesto', presupuesto.mostrarPresupuesto());

//Crear los siguientes gastos (función crearGasto):
let valor1 = 23.44, valor2 = 12.88, valor3 = 22.80, valor4 = 62.22, valor5 = 304.75, valor6 = 195.88;

let gasto1 = new presupuesto.CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida");
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida");
let gasto3 = new presupuesto.CrearGasto("Bonobús", valor3, "2020-05-26", "transporte");
let gasto4 = new presupuesto.CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina");
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros");
let gasto6 = new presupuesto.CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados (función anyadirGasto)
presupuesto.anyadirGasto(gasto1);
presupuesto.anyadirGasto(gasto2);
presupuesto.anyadirGasto(gasto3);
presupuesto.anyadirGasto(gasto4);
presupuesto.anyadirGasto(gasto5);
presupuesto.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
web.mostrarDatoEnID('gastos-totales', "Gastos Totales: " + presupuesto.calcularTotalGastos()+" €");

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
web.mostrarDatoEnID('balance-total',"Balance total: " + presupuesto.calcularBalance()+" €");

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
for (let e of presupuesto.listarGastos()) {
    web.mostrarGastoWeb('listado-gastos-completo',e);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let gastoSep2021 = presupuesto.filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"});

for (let e of gastoSep2021) {
    web.mostrarGastoWeb('listado-gastos-filtrado-1',e);
}

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let gastoMayor50Euros = presupuesto.filtrarGastos({valorMinimo: 50});

for (let e of gastoMayor50Euros) {
    web.mostrarGastoWeb('listado-gastos-filtrado-2',e);
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)

let gastoMayor200EurosSeguro = presupuesto.filtrarGastos({valorMinimo: 200,etiquetasTiene:["seguros"]});

console.log(gastoMayor200EurosSeguro);
console.log(gastoMayor200EurosSeguro.length);

for (let e of gastoMayor200EurosSeguro) {
    web.mostrarGastoWeb('listado-gastos-filtrado-3',e);
}





