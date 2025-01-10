"use client";

import React, { useState } from 'react';
import { Search, Printer, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const sampleProducts: Product[] = [
    { id: 1, name: 'Capisen 1L', price: 42 },
    { id: 2, name: 'Melani Anti-G', price: 69 },
    { id: 3, name: 'Shampo Depura', price: 120 },
  ];

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * 0.3;
  const iva = (subtotal - discount) * 0.19;
  const total = subtotal - discount + iva;

  const handlePrint = () => {
    window.print();
  };

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
            backgroundColor: 'pink',
          }}
        ></div>

        {/* Recuadro blanco con los componentes */}
        <div className="p-4 bg-white rounded-lg shadow-lg w-full max-w-4xl">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Neurone Cosmetica Notas de Venta</h2>
            <div className="grid grid-cols-2 gap-4"></div>
          </div>

          {/* Datos del Cliente */}
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
                placeholder="Teléfono Cliente"
                value={clientData.phone}
                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
              />
              <Input
                placeholder="Email Cliente"
                value={clientData.email}
                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Productos */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Productos</h2>
            <div className="relative">
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {searchTerm && (
              <div className="mt-2 border rounded-md shadow-sm">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedItems([...selectedItems, { quantity: 1, product }]);
                      setSearchTerm('');
                    }}
                  >
                    {product.name} - ${product.price.toLocaleString()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tabla de Productos Seleccionados */}
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Cantidad</th>
                <th className="text-left p-2">Descripción</th>
                <th className="text-right p-2">Precio Unitario</th>
                <th className="text-right p-2">Total</th>
                <th className="text-center p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...selectedItems];
                        newItems[index].quantity = parseInt(e.target.value) || 1;
                        setSelectedItems(newItems);
                      }}
                      className="w-20"
                    />
                  </td>
                  <td className="p-2">{item.product.name}</td>
                  <td className="text-right p-2">${item.product.price.toLocaleString()}</td>
                  <td className="text-right p-2">${(item.quantity * item.product.price).toLocaleString()}</td>
                  <td className="text-center p-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(index)}
                      className="p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Resumen */}
          <div className="text-right mb-4">
            <p>Subtotal: ${subtotal.toLocaleString()}</p>
            <p className="font-bold">Total: ${total.toLocaleString()}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" style={{ backgroundColor: 'pink' }}>
                <Printer className="mr-2 h-4 w-4" />
                Previsualizar e Imprimir
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Neurone Cosmetica</DialogTitle>
              </DialogHeader>
              <Preview />
              <Button onClick={handlePrint} style={{ backgroundColor: 'pink' }}>
                Imprimir
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
