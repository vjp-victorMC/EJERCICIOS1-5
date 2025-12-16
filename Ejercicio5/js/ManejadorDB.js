'use strict';

let nombreBD = 'Productos';
let versionDB = 1;
let almacen = 'AlmacenProductos';
let db = null; // Almacena localmente la db.

/**
 * Clase ManejadorDB
 * Gestiona todas las operaciones con IndexedDB
 */
class ManejadorDB {

    /**
     * Abre o crea la base de datos IndexedDB
     * @returns {Promise} Promesa que se resuelve cuando la BD está abierta
     */
    static abrirDB() {
        return new Promise((resolve, reject) => {
            const solicitud = indexedDB.open(nombreBD, versionDB);

            // Se ejecuta si la BD necesita ser creada o actualizada
            solicitud.onupgradeneeded = function (evento) {
                db = evento.target.result;

                // Crear el almacén de objetos si no existe
                if (!db.objectStoreNames.contains(almacen)) {
                    // Usamos autoIncrement para generar IDs automáticos
                    const objectStore = db.createObjectStore(almacen, {
                        keyPath: 'id',
                        autoIncrement: true
                    });

                    console.log('Almacén de objetos creado correctamente');
                }
            };

            // Se ejecuta cuando la BD se abre correctamente
            solicitud.onsuccess = function (evento) {
                db = evento.target.result;
                console.log('Base de datos abierta correctamente');
                resolve(db);
            };

            // Se ejecuta si hay un error
            solicitud.onerror = function (evento) {
                console.error('Error al abrir la base de datos:', evento.target.error);
                reject(evento.target.error);
            };
        });
    }

    /**
     * Obtiene todos los productos almacenados en la BD
     * @returns {Promise<Array>} Promesa que se resuelve con un array de productos
     */
    static obtenerTodosLosProductos() {
        return new Promise((resolve, reject) => {
            const transaccion = db.transaction([almacen], 'readonly');
            const objectStore = transaccion.objectStore(almacen);
            const solicitud = objectStore.getAll();

            solicitud.onsuccess = function (evento) {
                const productos = evento.target.result;
                console.log('Productos obtenidos:', productos);
                resolve(productos);
            };

            solicitud.onerror = function (evento) {
                console.error('Error al obtener productos:', evento.target.error);
                reject(evento.target.error);
            };
        });
    }

    /**
     * Inserta un nuevo producto en la BD
     * @param {Producto} producto - El producto a insertar
     * @returns {Promise} Promesa que se resuelve cuando el producto se inserta
     */
    static insertarProducto(producto) {
        return new Promise((resolve, reject) => {
            const transaccion = db.transaction([almacen], 'readwrite');
            const objectStore = transaccion.objectStore(almacen);

            // Convertir el objeto Producto a un objeto plano
            const productoData = {
                item: producto.item,
                cantidad: producto.cantidad,
                precioUnidad: producto.precioUnidad,
                marca: producto.marca
            };

            const solicitud = objectStore.add(productoData);

            solicitud.onsuccess = function (evento) {
                console.log('Producto insertado correctamente con ID:', evento.target.result);
                resolve(evento.target.result);
            };

            solicitud.onerror = function (evento) {
                console.error('Error al insertar producto:', evento.target.error);
                reject(evento.target.error);
            };
        });
    }

    /**
     * Elimina completamente la base de datos
     * Útil para testing y limpiar la basura
     * @returns {Promise} Promesa que se resuelve cuando la BD se elimina
     */
    static eliminarBD() {
        return new Promise((resolve, reject) => {
            const solicitud = indexedDB.deleteDatabase(nombreBD);

            solicitud.onsuccess = function () {
                console.log('Base de datos eliminada correctamente');
                db = null;
                resolve();
            };

            solicitud.onerror = function (evento) {
                console.error('Error al eliminar la base de datos:', evento.target.error);
                reject(evento.target.error);
            };

            solicitud.onblocked = function () {
                console.warn('La eliminación está bloqueada. Cierra todas las pestañas que usen esta BD.');
            };
        });
    }
}
