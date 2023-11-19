// variables globales
console.log("Inicio del programa");
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
    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionesInput.value = "";
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
    localStorage.setItem(listadoPedidos,JSON.stringify(pedidos));
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
            <td> ${i+1} </td>
            <td> ${p.cliente}   </td>
            <td> ${p.producto}   </td>
            <td> ${p.precio}   </td>
            <td> <img src="${p.imagen}" width="50%">    </td>
            <td> ${p.observaciones}   </td>
            <td>
                <span class="btn-warning btn-editar" title="Editar Pedido">  📝 </span>
                <span class="btn-danger" btn-eliminar title="Eliminar Pedido">  ❌ </span>
            </td>
        `;
        tabla.appendChild(fila);
    });


}

function borrarTabla(){
    let filas = d.querySelectorAll(".table > tbody > tr");
    console.log(filas);
    filas.forEach((f)=>{
        f.remove();
    });
};

d.addEventListener("DOMContentLoaded",function(){
    borrarTabla();
    mostrarDatos();

})
