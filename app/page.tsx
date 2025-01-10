import { redirect } from "next/navigation";

export default function Home() {
  redirect("/inventario/album"); // Redirige automáticamente a la página de inventario
  return null; // No necesitas renderizar nada aquí
}
