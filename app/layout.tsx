import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const moderniz = localFont({
  src: "../public/fonts/Moderniz.otf",
  variable: "--font-moderniz",
});

const ttDrugs = localFont({
  src: "../public/fonts/TT Drugs Trial Condensed Bold.otf",
  variable: "--font-tt-drugs",
});

const acumin = localFont({
  src: [
    {
      path: "../public/fonts/Acumin-RPro.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Acumin-BdPro.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Acumin-ItPro.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Acumin-BdItPro.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-acumin",
});

export const metadata: Metadata = {
  title: "Blok-On | Soluciones Estructurales",
  description: "Arquitectura y construcción premium con precisión industrial.",
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
      className={`${moderniz.variable} ${ttDrugs.variable} ${acumin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-acumin bg-white text-slate-900">
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
