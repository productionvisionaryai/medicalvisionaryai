import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppFab from '@/components/WhatsAppFab';
// QUITAR: import { SolanaProvider } from "@/components/SolanaProvider"; 
// QUITAR: import "@solana/wallet-adapter-react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helena AI | Asistente Médico para Cirujanos Plásticos",
  description: "Asistente de IA especializado para cirujanos plásticos. Contacto: +52-56 16 73 74 67",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA] text-slate-900`}
      >
        {/* QUITAR: <SolanaProvider> wrapper */}
        {children} 
        <WhatsAppFab />
        {/* QUITAR: </SolanaProvider> */}
      </body>
    </html>
  );
}