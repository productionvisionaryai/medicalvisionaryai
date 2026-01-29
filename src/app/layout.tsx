import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppFab from '@/components/WhatsAppFab';
import GlobalErrorBoundary from "@/components/error-boundaries/GlobalErrorBoundary";
import TestErrorButton from "@/components/error-testing/TestErrorButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Configuración de Viewport para evitar zoom en inputs de citas (UX Médica Superior)
export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Helena AI | Inteligencia Artificial para Alta Especialidad Médica",
  description: "Plataforma de asistencia médica avanzada y telemedicina. Optimización de flujos clínicos con IA. Contacto: +52-56 16 73 74 67",
  keywords: ["Telemedicina", "IA Médica", "Alta Especialidad", "Helena AI", "Visionary AI"],
  authors: [{ name: "Visionary AI Labs" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA] text-slate-900 selection:bg-blue-100 min-h-screen`}
      >
        <GlobalErrorBoundary>
          {/* Main Wrapper para control de z-index y capas de telemedicina */}
          <main className="relative z-0">
            {children}
          </main>
          
          {/* Capas de Interacción */}
          <WhatsAppFab />
          
          {/* Debugging: Solo visible en entorno local */}
          {isDev && (
            <div className="fixed bottom-4 left-4 z-50">
              <TestErrorButton />
            </div>
          )}
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}