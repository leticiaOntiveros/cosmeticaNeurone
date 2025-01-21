"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Printer, Trash2, Wifi, WifiOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Interfaces (mantener las mismas)
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
  // Estados combinados
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('Conectando...');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // Funciones de la lógica actualizada
  const handleGenerateNotaAndOpenDialog = async () => {
    try {
      for (const item of selectedItems) {
        await axios.put(`http://localhost:5000/api/products/${item.product.id}/stock`, {
          quantity: item.quantity,
        });
      }
      setIsDialogOpen(true);
      alert('Stock actualizado exitosamente.');
    } catch (error) {
      console.error('Error al generar la nota de venta:', error);
      alert('Hubo un error al generar la nota de venta. Inténtalo nuevamente.');
    }
  };

  const handleClearData = () => {
    setSelectedItems([]);
    setClientData({
      name: '',
      nit: '',
      phone: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
    });
    setIsDialogOpen(false);
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity += change;
    if (updatedItems[index].quantity < 1) {
      updatedItems[index].quantity = 1;
      return;
    }
    setSelectedItems(updatedItems);
  };

  
  // Resto de funciones existentes
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

  useEffect(() => {
    fetchProducts();
    const reconnectInterval = setInterval(() => {
      if (!isConnected) {
        fetchProducts();
      }
    }, 10000);
    return () => clearInterval(reconnectInterval);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDeleteItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.3;
  const iva = (subtotal - discount) * 0.19;
  const total = subtotal - discount + iva;

  // Componente Preview actualizado
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

  // Return con el diseño actualizado
  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/imagenes/1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'pink',
          width: '100%',
          minHeight: '100vh',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      ></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            marginLeft: '150%',
            backgroundColor: 'pink',
          }}
        ></div>

        <div className="bg-white border-4 border-yellow-300 shadow-md rounded-lg p-6 transform -translate-x-20 -translate-y-5">
          <div className="mb-4">
            <div className="container mx-auto p-4">
              {/* Indicador de conexión */}
              {/*
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  {isConnected ? (
                    <Wifi className="mr-2 text-green-500" />
                  ) : (
                    <WifiOff className="mr-2 text-red-500" />
                  )}
                  <span className={`${isConnected ? 'text-green-600' : 'text-red-600'} font-semibold`}>
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
*/}
              {/* Datos del Cliente */}
              <h1 className="text-2xl font-bold mb-6 text-center">Nota de Venta</h1>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Datos del Cliente</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Nombre Cliente"
                    value={clientData.name}
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

              {/* Barra de búsqueda y lista de productos */}
              <div className="relative mb-4">
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                  disabled={!isConnected}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />

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
                        <td className="p-2 flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            disabled={item.quantity === 1}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                          >
                            +
                          </button>
                        </td>
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
                {/*<p>DESCUENTO (30%): -${discount.toLocaleString()}</p>
                <p>IVA (19%): +${iva.toLocaleString()}</p>*/}
                <p className="font-bold">TOTAL: ${total.toLocaleString()}</p>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-between">
                <div className="flex justify-end">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={handleGenerateNotaAndOpenDialog}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Generar Nota y Vista Previa
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Vista Previa de la Nota de Venta</DialogTitle>
                      </DialogHeader>
                      {/* Vista previa */}
                      <div className="preview-content">
                        <Preview />
                      </div>
                      {/* Botones de acción en el diálogo */}
                      <div className="flex justify-between mt-4">
                        <Button
                          onClick={() => {
                            window.print();
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Imprimir Nota
                        </Button>
                        <Button
                          onClick={handleClearData}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Cerrar y Limpiar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}