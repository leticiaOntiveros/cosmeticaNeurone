"use client"
import * as React from "react";
import Link from "next/link"; // Importa Link de Next.js

import {
  NotebookPen,
  BadgeDollarSign,
} from "lucide-react";

import { NavMainn as NavMainnc } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Este es un ejemplo de datos.
const data = {
  navMain: [
    {
      title: "Inventario",
      url: "/inventario/album",
      icon: NotebookPen,
      isActive: true,
      items: [
        {
          title: "Ver inventario",
          url: "/inventario/album",
        },
        {
          title: "Modificar inventario",
          url: "/inventario/subir-productos",
        },
      ],
    },
    {
      title: "Sistema de ventas",
      url: "/inventario/notasVenta",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Realizar venta",
          url: "/inventario/notasVenta",
        },
      ],
    },
  ],
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-gradient-to-b from-pink-500 via-pink-300 to-blue-500 text-white"
    >
  
      
      <SidebarHeader className="p-4">
        {/* Aquí puedes añadir tu TeamSwitcher si lo necesitas */}
        <h2 className="text-lg font-bold">Neurone Cosmetica</h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        {/* Aquí usamos NavMain para que cargue los items */}
        <NavMainnc items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Aquí puedes añadir tu NavUser si lo necesitas */}
        <p>www.neuronecosmetica.com</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
