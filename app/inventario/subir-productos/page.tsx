"use client";
import React from 'react';

export default function SimplePreview() {
  return (
    <>
      {/* Fondo con imagen y color rosa cubriendo toda la pantalla */}
      <div
        style={{
          backgroundImage: 'url("../../public/imagenes/1.jpg")', // Ruta de la imagen de fondo
          backgroundSize: 'cover', // Asegura que la imagen cubra toda la pantalla
          backgroundPosition: 'center', // Centra la imagen
          backgroundColor: 'pink', // Color de fondo si no hay imagen
          width: '100%', // Cubre todo el ancho de la pantalla
          minHeight: '100vh', // Altura mínima del contenedor para cubrir toda la pantalla
          position: 'absolute', // Asegura que el fondo quede en el fondo
          top: '0', // Posiciona desde el top
          left: '0', // Posiciona desde la izquierda
        }}
      ></div>

      {/* Contenedor centrado sobre el fondo */}
      <div
        style={{
          display: 'flex', // Flexbox para centrar el contenido
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center', // Centra verticalmente
          minHeight: '100vh', // Asegura que el recuadro esté centrado
          padding: '20px', // Espaciado alrededor
          position: 'relative', // Este contenedor se coloca sobre el fondo
        }}
      >
        <div
        style={{
          marginLeft: '150%', // Desplaza el recuadro hacia la derecha
        }}
      ></div>
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Inventario</h1>
          
          {/* Formulario */}
          <div className="grid gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Nombre del producto" 
              className="border p-2 rounded w-full"
            />
            <input 
              type="number" 
              placeholder="Precio" 
              className="border p-2 rounded w-full"
            />
            <input 
              type="number" 
              placeholder="Stock" 
              className="border p-2 rounded w-full"
            />
          </div>
          
          {/* Botones */}
          <div className="flex gap-2 justify-center mb-6">
            <button className="px-4 py-2 bg-green-500 text-white rounded" style={{ backgroundColor: 'pink' }}>
              Agregar
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" style={{ backgroundColor: 'pink' }}>
              Modificar
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded" style={{ backgroundColor: 'pink' }}>
              Eliminar
            </button>
          </div>
          
          {/* Tabla */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left border">ID</th>
                <th className="p-2 text-left border">Nombre</th>
                <th className="p-2 text-left border">Precio</th>
                <th className="p-2 text-left border">Stock</th>
                <th className="p-2 text-left border">Acciones</th>
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
    </>
  );
}
