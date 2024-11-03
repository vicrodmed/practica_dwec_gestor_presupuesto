import * as presupuesto from './gestionPresupuesto.js'
import * as web from './gestionPresupuestoWeb.js'

presupuesto.actualizarPresupuesto(1500);
web.mostrarDatoEnID('presupuesto', presupuesto.mostrarPresupuesto());

let valor1 = 23.44, valor2 = 12.88, valor3 = 22.80, valor4 = 62.22, valor5 = 304.75, valor6 = 195.88;

let gasto1 = new presupuesto.CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida");
let gasto2 = new presupuesto.CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida");
let gasto3 = new presupuesto.CrearGasto("Bonobús", valor3, "2020-05-26", "transporte");
let gasto4 = new presupuesto.CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina");
let gasto5 = new presupuesto.CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros");
let gasto6 = new presupuesto.CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros");

presupuesto.anyadirGasto(gasto1);
presupuesto.anyadirGasto(gasto2);
presupuesto.anyadirGasto(gasto3);
presupuesto.anyadirGasto(gasto4);
presupuesto.anyadirGasto(gasto5);
presupuesto.anyadirGasto(gasto6);

web.mostrarDatoEnID('gastos-totales', "Gastos Totales: " + presupuesto.calcularTotalGastos()+" €");
web.mostrarDatoEnID('balance-total',"Balance total: " + presupuesto.calcularBalance()+" €")

for (let e of presupuesto.listarGastos()) {
    web.mostrarGastoWeb('listado-gastos-completo',e);
}


let gastoSep2021 = presupuesto.filtrarGastos({fechaDesde:"2021-09-01",fechaHasta:"2021-09-30"});

for (let e of gastoSep2021) {
    web.mostrarGastoWeb('listado-gastos-filtrado-1',e);
}







