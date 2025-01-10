"use client";
import React from 'react';

export default function SimplePreview() {
  return (
    <div className="p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Gestión de Inventario</h1>
        
        {/* Formulario */}
        <div className="grid gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Nombre del producto" 
            className="border p-2 rounded"
          />
          <input 
            type="number" 
            placeholder="Precio" 
            className="border p-2 rounded"
          />
          <input 
            type="number" 
            placeholder="Stock" 
            className="border p-2 rounded"
          />
        </div>
        
        {/* Botones */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-green-500 text-white rounded"  style={{ backgroundColor: 'pink' }}>
            Agregar
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded"  style={{ backgroundColor: 'pink' }}>
            Modificar
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded"  style={{ backgroundColor: 'pink' }}>
            Eliminar
          </button>
        </div>
        
        {/* Tabla */}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left border">ID</th>
              <th className="p-2 text-left border">Nombre</th>
              <th className="p-2 text-left border">Precio</th>
              <th className="p-2 text-left border">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">1</td>
              <td className="p-2 border">Melani Anti-G</td>
              <td className="p-2 border">$99.99</td>
              <td className="p-2 border">10</td>
              <td className="p-2 border">
                <button className="text-blue-500">Seleccionar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}