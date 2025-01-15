"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Producto {
  producto_id: number;
  nombre: string;
  precio: number;
  stock: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export default function GestionInventario() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<Partial<Producto>>({
    nombre: "",
    precio: undefined,
    stock: undefined,
  });
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para obtener productos con término de búsqueda
  const fetchProductos = async (search: string = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/products/search`, {
        params: {
          query: search
        }
      });
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para manejar la búsqueda con debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProductos(searchTerm);
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Agregar producto
  const handleAgregar = async () => {
    try {
      if (!formData.nombre || !formData.precio || !formData.stock) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      await axios.post("http://localhost:5000/api/products", formData);
      setFormData({ nombre: "", precio: undefined, stock: undefined });
      fetchProductos(searchTerm);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Modificar producto
  const handleModificar = async () => {
    try {
      if (!productoSeleccionado || !formData.nombre || !formData.precio || !formData.stock) {
        alert("Por favor, selecciona un producto y completa todos los campos.");
        return;
      }
      await axios.put(`http://localhost:5000/api/products/${productoSeleccionado.producto_id}`, formData);
      setProductoSeleccionado(null);
      setFormData({ nombre: "", precio: undefined, stock: undefined });
      fetchProductos(searchTerm);
    } catch (error) {
      console.error("Error al modificar producto:", error);
    }
  };

  // Eliminar producto
  const handleEliminar = async () => {
    try {
      if (!productoSeleccionado) {
        alert("Por favor, selecciona un producto para eliminar.");
        return;
      }
      await axios.delete(`http://localhost:5000/api/products/${productoSeleccionado.producto_id}`);
      setProductoSeleccionado(null);
      fetchProductos(searchTerm);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Seleccionar producto para modificar/eliminar
  const seleccionarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  // Cargar productos iniciales
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestión de Inventario</h1>

      {/* Búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Estado de carga */}
      {isLoading && (
        <div className="text-center mb-4">
          Cargando productos...
        </div>
      )}

      {/* Formulario */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Agregar/Modificar Producto</h2>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={formData.nombre || ""}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.precio || ""}
            onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock || ""}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={handleAgregar} className="px-4 py-2 bg-green-500 text-white rounded">
            Agregar
          </button>
          <button onClick={handleModificar} className="px-4 py-2 bg-blue-500 text-white rounded">
            Modificar
          </button>
          <button onClick={handleEliminar} className="px-4 py-2 bg-red-500 text-white rounded">
            Eliminar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Precio</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Fecha Creación</th>
            <th className="border border-gray-300 p-2">Fecha Actualización</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.producto_id}>
                <td className="border border-gray-300 p-2">{producto.producto_id}</td>
                <td className="border border-gray-300 p-2">{producto.nombre}</td>
                <td className="border border-gray-300 p-2">${producto.precio.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{producto.stock}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(producto.fecha_creacion).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(producto.fecha_actualizacion).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => seleccionarProducto(producto)}
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}