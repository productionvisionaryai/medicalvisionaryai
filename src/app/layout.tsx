import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppFab from '@/components/WhatsAppFab';
// 1. MUST import the Solana Provider you created
import { SolanaProvider } from "@/components/SolanaProvider"; 
// 2. MUST import the wallet styles
import "@solana/wallet-adapter-react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clínica de Armonía Estética | Elena Asesora",
  description: "Asesoría personalizada en bienestar y armonía corporal.",
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
        {/* 3. Wrap everything in the Provider */}
        <SolanaProvider>
          {children} 
          <WhatsAppFab />
        </SolanaProvider>
      </body>
    </html>
  );
}