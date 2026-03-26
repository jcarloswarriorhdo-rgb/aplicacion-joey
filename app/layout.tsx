import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joey — ¡Aprende con el Canguro!",
  description: "Juego educativo para niños de Kinder, Primaria y Secundaria",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
