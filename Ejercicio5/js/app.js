'use strict';

// Referencias a elementos del DOM
const formulario = document.getElementById('formularioProducto');
const tbodyProductos = document.getElementById('tbodyProductos');

/**
 * Inicializa la aplicación
 */
async function inicializarApp() {
    try {
        // Abrir la base de datos
        await ManejadorDB.abrirDB();
        console.log('Base de datos inicializada');

        // Cargar y mostrar productos existentes
        await cargarProductos();

    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        alert('Error al inicializar la base de datos');
    }
}

/**
 * Carga todos los productos de la BD y los muestra en la tabla
 */
async function cargarProductos() {
    try {
        const productos = await ManejadorDB.obtenerTodosLosProductos();

        // Limpiar la tabla
        tbodyProductos.innerHTML = '';

        if (productos.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;
            td.textContent = 'No hay productos registrados';
            td.style.textAlign = 'center';
            tr.appendChild(td);
            tbodyProductos.appendChild(tr);
        } else {
            // Mostrar cada producto
            productos.forEach(productoData => {
                const producto = new Producto(
                    productoData.item,
                    productoData.cantidad,
                    productoData.precioUnidad,
                    productoData.marca
                );

                const tr = producto.devolverTRProducto();
                tbodyProductos.appendChild(tr);
            });
        }

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

/**
 * Maneja el evento de envío del formulario
 */
formulario.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const item = document.getElementById('item').value.trim();
    const cantidad = document.getElementById('cantidad').value.trim();
    const precioUnidad = document.getElementById('precioUnidad').value.trim();
    const marca = document.getElementById('marca').value.trim();

    // Crear nuevo producto (si están vacíos, el constructor usa "-")
    const nuevoProducto = new Producto(item, cantidad, precioUnidad, marca);

    try {
        // Insertar en la base de datos
        await ManejadorDB.insertarProducto(nuevoProducto);

        // Recargar la tabla
        await cargarProductos();

        // Limpiar el formulario
        formulario.reset();

        console.log('Producto añadido correctamente');

    } catch (error) {
        console.error('Error al añadir producto:', error);
        alert('Error al añadir el producto');
    }
});

// Inicializar la aplicación cuando se carga la página
window.addEventListener('DOMContentLoaded', inicializarApp);

// Función útil para limpiar la BD durante desarrollo (opcional)
// Descomentar y ejecutar en consola si necesitas resetear la BD
// window.limpiarBD = async function() {
//     await ManejadorDB.eliminarBD();
//     location.reload();
// };
