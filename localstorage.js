// variables globales
//console.log("Inicio del programa");
const d = document;
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionesInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
const listadoPedidos = "Pedidos";
let tabla = d.querySelector(".table tbody");
btnGuardar.addEventListener("click", () => {
    if (validarDatos() != null) {
        guardarDatos(validarDatos());
        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionesInput.value = "";
    }
    //console.log("datos: " + JSON.stringify(datos));
    //guardarDatos(datos);
});

function validarDatos() {
    let datosForm = null;
    if (
        clienteInput.value == "" ||
        productoInput.value == "" ||
        precioInput.value == "" ||
        imagenInput.value == "" ||
        observacionesInput.value == ""
    ) {
        alert("Todos los campos son obligatorios");
    } else {
        datosForm = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observaciones: observacionesInput.value,
        };
    }
    return datosForm;
}

function guardarDatos(datos) {
    let pedidos = [];

    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //console.log(`var: datos ${datos} tipo: ${typeof (datos)}`);
    //console.log(`var previos: ${pedidosPrevios} tipo: ${typeof(pedidosPrevios)}`);
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    pedidos.push(datos);
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    borrarTabla();
    mostrarDatos();
    alert("Dato guardado");
}

function mostrarDatos() {
    let pedidos = [];

    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //console.log(`var: datos ${datos} tipo: ${typeof (datos)}`);
    //console.log(`var previos: ${pedidosPrevios} tipo: ${typeof(pedidosPrevios)}`);
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    //console.log(pedidos);
    pedidos.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${i + 1} </td>
            <td> ${p.cliente}   </td>
            <td> ${p.producto}   </td>
            <td> ${p.precio}   </td>
            <td> <img src="${p.imagen}" width="50%">    </td>
            <td> ${p.observaciones}   </td>
            <td>
                <span onclick="actulizarPedido(${i})" class="btn-warning btn-editar" title="Editar Pedido">  📝 </span>
                <span onclick="borrarPedido(${i})" class="btn-danger" btn-eliminar title="Eliminar Pedido">  ❌ </span>
            </td>
        `;
        tabla.appendChild(fila);

    });

}

function borrarPedido(p) {
    let pedidos = [];

    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //console.log(`var: datos ${datos} tipo: ${typeof (datos)}`);
    //console.log(`var previos: ${pedidosPrevios} tipo: ${typeof(pedidosPrevios)}`);
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }

    let confirmar = confirm(
        `¿Deseas eliminar el pedido de: ${pedidos[p].cliente} ?`
    );
    if (confirmar) {
        let ped = pedidos.splice(p, 1);

        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
        alert(`El pedido se ha eliminado`);
    }
}

function borrarTabla() {
    let filas = d.querySelectorAll(".table > tbody > tr");
    //console.log(filas);
    filas.forEach((f) => {
        f.remove();
    });
}

d.addEventListener("DOMContentLoaded", function () {
    borrarTabla();
    mostrarDatos();
});

function actulizarPedido(pos) {
    let pedidos = [];

    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //console.log(`var: datos ${datos} tipo: ${typeof (datos)}`);
    //console.log(`var previos: ${pedidosPrevios} tipo: ${typeof(pedidosPrevios)}`);
    if (pedidosPrevios != null) {
        pedidos = pedidosPrevios;
    }
    clienteInput.value = pedidos[pos].cliente;
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    observacionesInput.value = pedidos[pos].observaciones;

    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");

    btnActualizar.addEventListener("click", function () {
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = productoInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].observaciones = observacionesInput.value;

        localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
        alert("Se actualizó con exito");
        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        borrarTabla();
        mostrarDatos();
        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionesInput.value = "";



    });
}


let buscarInput = d.querySelector(".buscar-input");
let buscarButton = d.querySelector(".buscar-button");

buscarInput.addEventListener("input", function () {
    var searchTerm = this.value;

    performSearch(searchTerm);
});

buscarButton.addEventListener("click", function () {
    var searchTerm = buscarInput.value;

    performSearch(searchTerm);
});


function performSearch(searchTerm) {

    let pedidos = JSON.parse(localStorage.getItem(listadoPedidos)) || [];


    let filteredPedidos = pedidos.filter((pedido) => {

        return (
            pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pedido.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pedido.observaciones.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    updateTable(filteredPedidos);
}


function updateTable(data) {

    borrarTabla();

    data.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${i + 1} </td>
            <td> ${p.cliente}   </td>
            <td> ${p.producto}   </td>
            <td> ${p.precio}   </td>
            <td> <img src="${p.imagen}" width="50%">    </td>
            <td> ${p.observaciones}   </td>
            <td>
                <span onclick="actulizarPedido(${i})" class="btn-warning btn-editar" title="Editar Pedido">  📝 </span>
                <span onclick="borrarPedido(${i})" class="btn-danger" btn-eliminar title="Eliminar Pedido">  ❌ </span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function exportarPDF() {
    var element = document.querySelector('.table');

    // Obtener todas las imágenes dentro del elemento
    var images = element.querySelectorAll('img');
    var loadedImagesCount = 0;

    // Función que se ejecutará cuando una imagen esté cargada
    function onImageLoad() {
        loadedImagesCount++;

        // Verificar si todas las imágenes están cargadas
        if (loadedImagesCount === images.length) {
            // Todas las imágenes están cargadas, ahora generamos el PDF
            generatePDF(element);
        }
    }

    // Agregar el evento load a cada imagen
    images.forEach(function (img) {
        img.addEventListener('load', onImageLoad);
    });
}




