"use client"; 
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Search } from 'lucide-react';
import melaniImage from "@/public/imagenes/melani.jpg";
import capisenImage from "@/public/imagenes/capisen.jpg";
import shampooImage from "@/public/imagenes/shampoo.jpg";


const Album = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const photos = [
    { id: 1, src: "/imagenes/melani.jpg", title: "Melani Anti-G", description: "Locion capilar de uso diario" },
    { id: 2, src: "/imagenes/capisen.jpg", title: "Capisen", description: "Descripción 2" },
    { id: 3, src: "/imagenes/shampoo.jpg", title: "Shampoo", description: "Descripción 3" },
  ];

  // Filtrar las fotos por título
  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  return (
    <div className="p-4">
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 w-full border rounded-md"
      />

      {/* Grid de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id}>
            <CardHeader>
              <img src={photo.src} alt={photo.title} className="rounded-md w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">{photo.title}</h3>
              <p className="text-sm text-gray-500">{photo.description}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Ver más
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <img src={photo.src} alt={photo.title} className="w-full h-auto rounded-md" />
                  <h3 className="text-lg font-semibold mt-4">{photo.title}</h3>
                  <p className="text-sm text-gray-500">{photo.description}</p>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Album;
