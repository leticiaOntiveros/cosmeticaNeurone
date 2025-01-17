"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Printer, Trash2, Wifi, WifiOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Interfaces
interface Product {
  id: number;
  name: string;
  price: number;
}

interface SaleItem {
  quantity: number;
  product: Product;
}

interface CompanyData {
  name: string;
  nit: string;
  address: string;
  phone: string;
}

interface ClientData {
  name: string;
  nit: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
}

export default function NotaVenta() {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('Conectando...');

  // Estados de datos de cliente y empresa
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    nit: '',
    address: '',
    phone: '',
  });

  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    nit: '',
    phone: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
  });

  // Cargar productos desde la API
  const fetchProducts = async () => {
    try {
      setIsConnected(false);
      setConnectionMessage('Conectando...');

      const response = await axios.get('http://localhost:5000/api/products', {
        timeout: 5000
      });
      
      const formattedProducts = response.data.map((product: any) => ({
        id: product.producto_id,
        name: product.nombre,
        price: product.precio
      }));

      setProducts(formattedProducts);
      setIsConnected(true);
      setConnectionMessage('Conexión establecida exitosamente');
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setIsConnected(false);
      setConnectionMessage('Error de conexión. Verificando...');
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();

    const reconnectInterval = setInterval(() => {
      if (!isConnected) {
        fetchProducts();
      }
    }, 10000);

    return () => clearInterval(reconnectInterval);
  }, []);

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar la selección de un producto
  const handleProductSelect = (product: Product) => {
    const existingItemIndex = selectedItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { quantity: 1, product }]);
    }

    setSearchTerm('');
  };

  // Eliminar un producto de la lista
  const handleDeleteItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  // Cálculos para la venta
  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.3;
  const iva = (subtotal - discount) * 0.19;
  const total = subtotal - discount + iva;

  // Función de impresión
  const handlePrint = () => {
    window.print();
  };

  // Componente de vista previa
  const Preview = () => (

    <div className="p-8 bg-white">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">NOTA DE VENTA</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-right">
          <p>Fecha: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Cliente:</h3>
        <p>{clientData.name || '[Nombre ]'}</p>
        <p>Plazo: {clientData.nit || '[Plazo de Compra]'}</p>
        <p>Tel: {clientData.phone || '[Teléfono ]'}</p>
        <p>Email: {clientData.email || '[Email]'}</p>
      </div>

      <table className="w-full mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Cant</th>
            <th className="text-left p-2">Descripcion</th>
            <th className="text-right p-2">Precio Unitario</th>
            <th className="text-right p-2">Importe</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.product.name}</td>
              <td className="text-right p-2">${item.product.price.toLocaleString()}</td>
              <td className="text-right p-2">${(item.quantity * item.product.price).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <p>SUBTOTAL: ${subtotal.toLocaleString()}</p>
        <p className="font-bold">TOTAL: ${total.toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <>
    {/* Fondo rosa con imagen de fondo */}
    <div
      style={{
        backgroundImage: 'url("/imagenes/1.jpg")', // Ruta de la imagen de fondo
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
          backgroundColor: 'pink',
        }}
      ></div>

      {/* Recuadro blanco con los componentes */}
      <div className="bg-white border-4 border-yellow-300 shadow-md rounded-lg p-6 transform -translate-x-20  -translate-y-5">
        <div className="mb-4">
    <div className="container mx-auto p-4">
      {/* Indicador de conexión */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          {isConnected ? (
            <Wifi className="mr-2 text-green-500" />
          ) : (
            <WifiOff className="mr-2 text-red-500" />
          )}
          <span className={`
            ${isConnected ? 'text-green-600' : 'text-red-600'} 
            font-semibold
          `}>
            {connectionMessage}
          </span>
        </div>
        {!isConnected && (
          <button 
            onClick={fetchProducts} 
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Reconectar
          </button>
        )}
      </div>

      {/* Datos del Cliente */}
      <h1 className="text-2xl font-bold mb-6 text-center">Nota de Venta</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Datos del Cliente</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Nombre Cliente"
            value={clientData. name}
            onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
          />
          <Input
            placeholder="Plazo de compra"
            value={clientData.nit}
            onChange={(e) => setClientData({ ...clientData, nit: e.target.value })}
          />
          <Input
            placeholder="Teléfono"
            value={clientData.phone}
            onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
          />
          <Input
            placeholder="Móvil"
            value={clientData.mobile}
            onChange={(e) => setClientData({ ...clientData, mobile: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={clientData.email}
            onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
          />
          <Input
            placeholder="Dirección"
            value={clientData.address}
            onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
          />
          <Input
            placeholder="Ciudad"
            value={clientData.city}
            onChange={(e) => setClientData({ ...clientData, city: e.target.value })}
          />
        </div>
      </div>

      {/* Barra de búsqueda de productos */}
      <div className="relative mb-4">
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
          disabled={!isConnected}
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />

        {/* Resultados de búsqueda */}
        {isConnected && searchTerm && (
          <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductSelect(product)}
                >
                  {product.name} - ${product.price.toLocaleString()}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No se encontraron productos</div>
            )}
          </div>
        )}
      </div>

      {/* Lista de productos seleccionados */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Productos Seleccionados</h2>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Cant</th>
              <th className="text-left p-2">Descripción</th>
              <th className="text-right p-2">Precio Unitario</th>
              <th className="text-right p-2">Importe</th>
              <th className="text-right p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.product.name}</td>
                <td className="text-right p-2">${item.product.price.toLocaleString()}</td>
                <td className="text-right p-2">${(item.quantity * item.product.price).toLocaleString()}</td>
                <td className="text-right p-2">
                  <button onClick={() => handleDeleteItem(index)} className="text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumen de la venta */}
      <div className="text-right mb-4">
        <p>SUBTOTAL: ${subtotal.toLocaleString()}</p>
        <p>DESCUENTO (30%): -${discount.toLocaleString()}</p>
        <p>IVA (19%): +${iva.toLocaleString()}</p>
        <p className="font-bold">TOTAL: ${total.toLocaleString()}</p>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-between">
        <Button onClick={handlePrint} className="bg-green-500 text-white">Imprimir</Button>
        <Dialog>
          <DialogTrigger asChild >
            <Button className="bg-blue-500 text-white">Vista Previa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vista Previa de la Nota de Venta</DialogTitle>
            </DialogHeader>
            <Preview />
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
}