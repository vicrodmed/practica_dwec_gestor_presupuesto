import * as presupuesto from './gestionPresupuesto.js'
import * as web from './gestionPresupuestoWeb.js'

presupuesto.actualizarPresupuesto(1500);
web.mostrarDatoEnID('presupuesto',presupuesto.mostrarPresupuesto());
