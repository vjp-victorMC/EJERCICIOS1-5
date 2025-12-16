'use strict';

/**
 * Clase Producto
 * Representa un producto con sus atributos básicos
 */
class Producto {
    constructor(item, cantidad, precioUnidad, marca) {
        this.item = item || "-";
        this.cantidad = cantidad || "-";
        this.precioUnidad = precioUnidad || "-";
        this.marca = marca || "-";
    }

    /**
     * Devuelve un elemento <tr> con la información del producto
     * @returns {HTMLTableRowElement} Fila de tabla con los datos del producto
     */
    devolverTRProducto() {
        const tr = document.createElement("tr");

        const tdItem = document.createElement("td");
        tdItem.textContent = this.item;

        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = this.cantidad;

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = this.precioUnidad;

        const tdMarca = document.createElement("td");
        tdMarca.textContent = this.marca;

        tr.appendChild(tdItem);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdMarca);

        return tr;
    }
}
