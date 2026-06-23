import type { Metadata } from "next";
import { Montserrat, Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const moderniz = localFont({
  src: "../public/fonts/Moderniz.otf",
  variable: "--font-moderniz",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-tt-drugs",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-acumin",
});


export const metadata: Metadata = {
  title: "Blok-On | Soluciones Estructurales",
  description: "Arquitectura y construcción premium con precisión industrial.",
  icons: {
    icon: "/images/muro/home/iconopestana.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${moderniz.variable} ${montserrat.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-acumin bg-white text-slate-900">
        <div dangerouslySetInnerHTML={{ __html: `<!-- 
=========================================================
  🚀 Construido con orgullo para BLOK-ON
  👨‍💻 Desarrollado por: Marcelo Martinez
  📧 Contacto: marktuay@gmail.com
=========================================================
-->` }} />
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
