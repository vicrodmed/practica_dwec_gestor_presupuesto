// Importamos todo el módulo gestionPresupuesto.js para utilizarlo en el módulo actual.
import * as presupuesto from './gestionPresupuesto.js'

// Añadimos el botón Actualizar presupuesto y asignamos su manejador de evento click
let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

//Añadimos el botón Añadir gasto y asignamos su manejador de evento click
let botonAnyadirgasto = document.getElementById('anyadirgasto');
botonAnyadirgasto.addEventListener("click", anyadirgasto);

// Añadimos funcion manejadora del boton Añadir gasto formulario
let botonAnyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFomulario);

let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", filtarGastoWeb);

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener("click", guardarGastosWeb);

let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener("click", cargarGastosWeb);

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);



//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado
function mostrarDatoEnID(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro
function mostrarGastoWeb(idElemento, gasto) {

    let elemento = document.getElementById(idElemento); // Referencia para luego añadir el div de gasto
    let divGasto = document.createElement('div'); // Creación del div para añadir el gasto <div class="gasto">
    divGasto.className = 'gasto';

    //Creamos un contenedor div para cada propiedad del gasto
    //DESCRIPCION
    let divGastoDescripcion = document.createElement('div'); // <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    divGastoDescripcion.className = 'gasto-descripcion';
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion); //Añadimos al final de <div class="gasto"> con append
    //FECHA
    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
    divGastoFecha.textContent = new Date(gasto.fecha).toISOString().split('T')[0];
    divGasto.append(divGastoFecha);//Añadimos al final de <div class="gasto"> con append
    //VALOR
    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);//Añadimos al final de <div class="gasto"> con append
    //ETIQUETAS
    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    divGasto.append(divGastoEtiquetas);//Añadimos al final de <div class="gasto"> con append

    for (let e of gasto.etiquetas) { // Creamos un spam por cada etiqueta que existe en el gasto.
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = "#" + e + " ";
        // Manejador y asociación con el gasto
        let manejadorEtiqueta = new BorrarEtiquetasHandle();
        manejadorEtiqueta.gasto = gasto;
        manejadorEtiqueta.etiqueta = e;
        spanEtiqueta.addEventListener("click", manejadorEtiqueta);
        divGastoEtiquetas.append(spanEtiqueta);
    }

    // Creación BOTÓN EDITAR por cada gasto
    let botonEditar = document.createElement('button');
    botonEditar.textContent = "Editar";
    botonEditar.className = "gasto-editar"
    divGasto.append(botonEditar);
    // Manejador y asociación con el gasto
    let manejadorBotonEditar = new EditarHandle();
    manejadorBotonEditar.gasto = gasto;
    botonEditar.addEventListener("click", manejadorBotonEditar);


    // Creación de BOTÓN BORRAR para cada gasto
    let botonBorrar = document.createElement('button');
    botonBorrar.textContent = "Borrar";
    botonBorrar.className = "gasto-borrar"
    divGasto.append(botonBorrar);
    // Manejador y asociación con el gasto
    let manejadorBotonBorrar = new BorrarHandle();
    manejadorBotonBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBotonBorrar);


    // Creación del BOTÓN BORRAR (API)
    let botonBorrarApi = document.createElement('button');
    botonBorrarApi.textContent = "Borrar (API)";
    botonBorrarApi.className = "gatos-borrar-api";
    divGasto.append(botonBorrarApi);
    // Manejador y asociación con el gasto
    let manejadorBotonBorrarApi = new BorrarBorrarApi();
    manejadorBotonBorrarApi.gasto = gasto;
    botonBorrarApi.addEventListener("click", manejadorBotonBorrarApi);


    // Creación de BOTÓN EDITAR GASTO para cada gasto. (CREA UN FORMULARIO)
    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.textContent = "Editar(formulario)";
    botonEditarFormulario.className = "gasto-editar-formulario";
    divGasto.append(botonEditarFormulario);
    //Manejador y asociación con el gasto
    let manejadorBotonEditarFormulario = new EditarHandleFormulario();
    manejadorBotonEditarFormulario.gasto = gasto;
    botonEditarFormulario.addEventListener("click", manejadorBotonEditarFormulario);

    elemento.append(divGasto); // Añadimos al final del elemento pasado por parametro
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

function repintar() {
    //Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
    mostrarDatoEnID('presupuesto', presupuesto.mostrarPresupuesto());

    //Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
    mostrarDatoEnID('gastos-totales', "Total gastos: " + presupuesto.calcularTotalGastos() + " €");

    //Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
    mostrarDatoEnID('balance-total', "Balance total: " + presupuesto.calcularBalance() + " €");

    //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
    document.getElementById('listado-gastos-completo').innerHTML = "";

    //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
    for (let e of presupuesto.listarGastos()) {
        mostrarGastoWeb('listado-gastos-completo', e);
    }
}

function actualizarPresupuestoWeb() {
    let valorNuevoPresupuesto = Number(prompt("Introduzca el nuevo presupuesto: "));
    presupuesto.actualizarPresupuesto(valorNuevoPresupuesto);
    repintar();
}

function anyadirgasto() {
    let descripcion = prompt("Introduzca la descripción del gasto: ");
    let valor = Number(prompt("Introduzca el valor del gasto: "));
    let fecha = prompt("Introduzca la fecha del gasto (yyyy-mm-dd): ");
    let etiquetasConComas = prompt("Introduzcas las etiquetas separadas por comas: ");
    let arrayEtiquetas = etiquetasConComas.split(',');

    let nuevoGasto = new presupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);// rest parameter: arrayEtiquetas.
    presupuesto.anyadirGasto(nuevoGasto);
    repintar();
}

function nuevoGastoWebFomulario() {
    // Desactivar el boton id anyadirgasto-formulario
    let botonAnyadirGastoFormulario = document.getElementById('anyadirgasto-formulario');
    botonAnyadirGastoFormulario.disabled = true;
    //Cargamos la plantilla del formulario y la añadimos en id controlesprincipales
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    let divControlesPrincipales = document.getElementById('controlesprincipales');
    divControlesPrincipales.append(plantillaFormulario);

    //Manejador evento submit del formulario
    formulario.addEventListener("submit", function (event) {

        event.preventDefault();// Desactivamos el comportamiento del formulario por defecto.
        let form = event.currentTarget;// Accedemos al formulario que ha activado el evento.

        // Obtenemos los valores del formulario
        let descripcion = form.elements["descripcion"].value;
        let valor = form.elements["valor"].value;
        let fecha = new Date(form.elements["fecha"].value);
        let etiquetasFormArray = form.elements["etiquetas"].value.split(",");

        // Creamos el gasto
        let gasto = new presupuesto.CrearGasto(descripcion, Number(valor), fecha);
        // Añadimos las equiquetas
        etiquetasFormArray.forEach(e => gasto.anyadirEtiquetas(e));
        // Añadimos el gasto
        presupuesto.anyadirGasto(gasto);
        // Repitamos para actualizar el listado de gastos completos
        repintar();
        // Activamos el botón el boton id anyadirgasto-formulario
        botonAnyadirGastoFormulario.disabled = false;
        // Eliminamos el formulario
        formulario.remove();
    });

    //Manejador evento click boton cancelar del formulario
    let botonCancelar = formulario.querySelector("button.cancelar");
    let manejadorBotonCancelar = new CancelarFormulario();
    manejadorBotonCancelar.formulario = formulario; // Propiedad formulario
    manejadorBotonCancelar.boton = botonAnyadirGastoFormulario; // Propiedad boton
    botonCancelar.addEventListener("click", manejadorBotonCancelar);

    //Manejador evento click Manejador de eventos del botón .gasto-enviar-api dentro de nuevoGastoWebFormulario

    let botonGastoEnviarApi = document.getElementById("gasto-enviar-api");
    let manejadorBotonGastoEnviarApi = new EnviarGastoApiFormulario();
    botonGastoEnviarApi.addEventListener("click", manejadorBotonGastoEnviarApi);

}

// Funciones que utilizan el método handleEvent para crear objetos que responda a eventos.
function BorrarHandle() {
    this.handleEvent = function () {
        presupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function CancelarFormulario() {
    this.handleEvent = function (event) {

        this.formulario.remove(); // Eliminamos formulario
        this.boton.disabled = false; // Y volvemos a activar el botón que activo el formulario.

    }
}

function EditarHandle() {
    this.handleEvent = function () {

        this.gasto.actualizarDescripcion(prompt("Modificar descripción del gasto? ", this.gasto.descripcion));
        this.gasto.actualizarValor(Number(prompt("Modificar valor del gasto? ", this.gasto.valor)));
        this.gasto.actualizarFecha(prompt("Modificar fecha del gasto? (aaaa-mm-dd)? ", new Date(this.gasto.fecha).toISOString().split('T')[0]));

        let arrayEtiquetas = this.gasto.etiquetas;
        let etiquetasTexto = arrayEtiquetas.join(",");

        let etiquetasConComas = prompt("Modificar etiquetas del gasto? ", etiquetasTexto);
        let etiquetasSeparadas = etiquetasConComas.split(',');

        etiquetasSeparadas.forEach(e => this.gasto.anyadirEtiquetas(e));

        repintar();
    }
}

// Función manejadora para el evento click del botón Añadir gasto (formulario)
function EditarHandleFormulario() {
    this.handleEvent = function (event) {

        let botonEditarFormulario = event.currentTarget; // Localizamos el botón pulsado.
        botonEditarFormulario.disabled = true; // Y el botón pulsado lo desactivamos.

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);// Creamos la plantilla del formulario.
        let formulario = plantillaFormulario.querySelector("form"); // Guardamos una referencia al formulario creado.

        let divGasto = event.currentTarget.parentElement; // A través del botón pulsado localizamos localizamos su ancestro que es el div de la clase gasto
        divGasto.append(plantillaFormulario); // Y añadimos el formulario al final del div gasto.

        // Rellenamos los datos del formulario con el gasto que queremos editar
        formulario.elements["descripcion"].value = this.gasto.descripcion;
        formulario.elements["valor"].value = Number(this.gasto.valor);
        formulario.elements["fecha"].value = new Date(this.gasto.fecha).toISOString().split('T')[0];
        let arrayEtiquetas = this.gasto.etiquetas;
        let etiquetasTexto = arrayEtiquetas.join(",");
        formulario.elements["etiquetas"].value = etiquetasTexto;

        let manejadorSubmitFormulario = new SubmitHandleFormulario();
        manejadorSubmitFormulario.gasto = this.gasto; // Le pasamos la referencia del gasto actual que estamos tratando.
        formulario.addEventListener("submit", manejadorSubmitFormulario);

        //Manejador evento click boton cancelar del formulario
        let botonCancelar = formulario.querySelector("button.cancelar");
        let manejadorBotonCancelar = new CancelarFormulario();
        manejadorBotonCancelar.formulario = formulario;
        manejadorBotonCancelar.boton = botonEditarFormulario;
        botonCancelar.addEventListener("click", manejadorBotonCancelar);

    }
}

// Función manejadora para el evento submit en la edición del formulario.
function SubmitHandleFormulario() {
    this.handleEvent = function (event) {
        event.preventDefault();
        let form = event.currentTarget;
        this.gasto.actualizarDescripcion(form.elements["descripcion"].value);
        this.gasto.actualizarValor(Number(form.elements["valor"].value));
        this.gasto.actualizarFecha(form.elements["fecha"].value);
        let etiquetasSeparadas = form.elements["etiquetas"].value.split(',');
        etiquetasSeparadas.forEach(e => this.gasto.anyadirEtiquetas(e));
        repintar();
    };
}

// Función manejadora para el evento click de borrar gasto a tráves de la API del servidor.
function BorrarBorrarApi() {
    this.handleEvent = async function (event) {
        event.preventDefault();
        let nombreUsuario = document.getElementById("nombre_usuario").value;
        let respuesta = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.id}`,
            {
                method: "DELETE"
            });

        if (respuesta.ok) {

            cargarGastosApi();
        }

    }
}

//Función manejadora para el evento click de boton Enviar (API) del formulario Añadir Gasto (formulario).
async function EnviarGastoApiFormulario() {
    this.handleEvent = async function (event) {
        event.preventDefault();
        let nombreUsuario = document.getElementById("nombre_usuario").value;

        let formulario = event.currentTarget;
        console.log(formulario);

    }




    /* let respuesta = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, 
        {
           method:"POST"
        });
   
        if (respuesta.ok){
           let datos = await respuesta.json();
           console.log(datos);
           presupuesto.cargarGastos(datos);
           repintar();
           
        } */
}

//Función manejadora para el evento submit del formulario "formulario-filtrado"
function filtarGastoWeb(event) {

    event.preventDefault();// Desactivamos el comportamiento del formulario por defecto.

    let form = event.currentTarget;// Accedemos al formulario que ha activado el evento.

    let parametros = {}; // Creación de un objeto vacío.

    // Asignamos los datos recogidos del formulario al objeto parámetros.

    //DESCRIPCIÓN
    parametros.descripcionContiene = form.elements["formulario-filtrado-descripcion"].value;

    //VALOR MÍNIMO Y MÁXIMO
    // Operador ternario para evitar que a valorMinimo y valorMaximo no se le asigne un 0 cuando no se introduce ningun dato en sus inputs correspondiente.
    parametros.valorMinimo = form.elements["formulario-filtrado-valor-minimo"].value == '' ? undefined : Number(form.elements["formulario-filtrado-valor-minimo"].value);
    parametros.valorMaximo = form.elements["formulario-filtrado-valor-maximo"].value == '' ? undefined : Number(form.elements["formulario-filtrado-valor-maximo"].value);

    //FECHAS
    parametros.fechaDesde = form.elements["formulario-filtrado-fecha-desde"].value;
    parametros.fechaHasta = form.elements["formulario-filtrado-fecha-hasta"].value;

    //ETIQUETAS
    //Transformamos etiquetas con la función transformarListadoEtiquetas.
    parametros.etiquetasTiene = presupuesto.transformarListadoEtiquetas(form.elements["formulario-filtrado-etiquetas-tiene"].value);

    //Limpiamos el dvv#listado-gastos-completo
    document.getElementById('listado-gastos-completo').innerHTML = "";

    //Mostramos todos los gastos filtrados.
    for (let e of presupuesto.filtrarGastos(parametros)) {
        mostrarGastoWeb('listado-gastos-completo', e);
    }
}

//Función guardarGastosWeb. Esta función se utilizará como manejadora de eventos del evento click del botón guardar-gastos.
function guardarGastosWeb() {
    localStorage.setItem("GestorGastosDWEC", JSON.stringify(presupuesto.listarGastos()));
}

function cargarGastosWeb() {
    let gastosGuardados = [];

    //Si no existe la clave en el almacenamiento, llamará a cargarGastos con un array vacío.
    if (localStorage.getItem("GestorGastosDWEC") !== null) {
        gastosGuardados = JSON.parse(localStorage.getItem("GestorGastosDWEC"));
        presupuesto.cargarGastos(gastosGuardados);

    } else {
        presupuesto.cargarGastos([]);
    }
    repintar();

}

async function cargarGastosApi() {

    let nombreUsuario = document.getElementById("nombre_usuario").value;

    //Comprobamos que el input#nombre_usuario contiene el nombre del usuario.
    if (!nombreUsuario) {
        alert('Por favor, introduce un nombre de usuario.');
        return;
    }

    try {
        
        let respuesta = await fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`,
            {
                method: "GET"
            });

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} - ${respuesta.statusText}`);
        }

        let listadoGastos = await respuesta.json();
        console.log(listadoGastos);

        presupuesto.cargarGastos(listadoGastos);
        repintar();

    } catch (error) {
        console.error('Error al cargar los gastos:', error);
    }

}



export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}