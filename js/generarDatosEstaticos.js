import * as presupuesto from './gestionPresupuesto.js'
import * as web from './gestionPresupuesto.js'

presupuesto.actualizarPresupuesto(1500);
web.mostrarDatoEnId(presupuesto.mostrarPresupuesto(),'presupuesto');