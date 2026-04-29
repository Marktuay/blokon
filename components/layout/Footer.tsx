'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-4 md:px-8 font-inter border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Quick Quote Form */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-epilogue text-sm font-bold uppercase tracking-[0.2em] mb-8">Cotización Rápida</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre" 
                className="w-full bg-white text-black p-3 text-sm outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Teléfono" 
                  className="bg-white text-black p-3 text-sm outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-white text-black p-3 text-sm outline-none"
                />
              </div>
              <textarea 
                placeholder="Mensaje" 
                rows={3}
                className="w-full bg-white text-black p-3 text-sm outline-none resize-none"
              ></textarea>
              <button className="w-full bg-[#96C121] text-black font-bold py-3 uppercase tracking-widest text-sm hover:bg-white transition-colors">
                Enviar
              </button>
            </form>
            <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
              Responderemos a la brevedad. No compartimos tu información con terceros de ninguna manera.
            </p>
            <div className="pt-6 space-y-1 text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>Lun - Vie:</span>
                <span>9:00 am - 18:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sáb:</span>
                <span>9:00 am - 14:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Dom:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>

          {/* Column 2: Menu */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-epilogue text-sm font-bold uppercase tracking-[0.2em] mb-8">Menú</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <Link href="/">Inicio</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors text-[#96C121]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                <Link href="/proyectos">Proyectos</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12" y1="8" y2="8"/></svg>
                <Link href="/sobre-nosotros">Sobre Nosotros</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <Link href="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portafolio */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-epilogue text-sm font-bold uppercase tracking-[0.2em] mb-8">Portafolio</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"/></svg>
                <Link href="/infraestructura">Infraestructura</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21V3"/><path d="M18 21V3"/><path d="M6 21V3"/></svg>
                <Link href="/corporativo">Corporativo</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
                <Link href="/cultura">Cultura</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <Link href="/especiales">Especiales</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Servicios */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-epilogue text-sm font-bold uppercase tracking-[0.2em] mb-8">Servicios</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-6.74-9.26"/><path d="M8 3v5.17A4 4 0 0 0 8.95 15.3l3.05 3.05"/></svg>
                <Link href="/diseno">Diseño Estructural</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <Link href="/supervision">Supervisión</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <Link href="/consultoria">Consultoría</Link>
              </li>
              <li className="flex items-center gap-3 hover:text-white transition-colors text-[#96C121]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 10Z"/><path d="M11 20c-1 1-1.3 1-3.5 2C10 20 10 18 10 18"/></svg>
                <Link href="/sustentabilidad">Sustentabilidad</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contacto */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-epilogue text-sm font-bold uppercase tracking-[0.2em] mb-8">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+505 8692 - 7530</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>ventas@blok-on.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Km 18.5 carretera nueva a León, Mateare</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-8">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap">Pagos Aceptados</div>
            <div className="flex gap-6 items-center transition-all">
              {/* VISA */}
              <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="#1434CB">
                <path d="M12.636 15.006h2.15l1.341-8.29h-2.15l-1.341 8.29zm8.563-8.034c-.482-.187-1.24-.388-2.179-.388-2.31 0-3.935 1.156-3.946 2.809-.012 1.22 1.156 1.888 2.046 2.296.91.417 1.217.683 1.217 1.056-.011.572-.733.834-1.408.834-.944 0-1.448-.135-2.22-.457l-.312-.135-.333 1.933c.556.241 1.577.452 2.64.462 2.457 0 4.062-1.144 4.083-2.91.011-1.353-1.002-1.996-2.223-2.548-.733-.342-1.157-.573-1.157-.925 0-.311.367-.643 1.167-.643.666 0 1.144.131 1.522.281l.178.08.326-1.745zM8.303 6.716L6.284 12.33 5.4 7.9c-.11-.532-.47-.954-.954-1.184l-3.342-.01-.01.191c.693.15 1.482.4 1.95.663.291.161.372.302.432.573L5.2 15.006h2.261l3.436-8.29H8.303zm6.657 0h-1.688c-.522 0-.913.141-1.135.643l-3.21 7.647h2.261l.452-1.176h2.763l.261 1.176h1.989l-1.729-8.29zm-2.883 4.672l.863-2.25 1.498 2.25h-2.361z"/>
              </svg>
              {/* Mastercard */}
              <svg className="h-8 w-auto" viewBox="0 0 24 24">
                <circle cx="9" cy="12" r="7" fill="#EB001B" />
                <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
              </svg>
              {/* American Express */}
              <svg className="h-7 w-auto" viewBox="0 0 24 24" fill="#006FCF">
                <path d="M22 2H2v20h20V2zM10.8 17.5l-.5-1.5H7.7l-.5 1.5H5.4l2.8-8h1.6l2.8 8h-1.8zm5.5 0h-1.6v-3.5l-1.5 3.5h-1.2l-1.5-3.5v3.5H9v-8h1.6l1.8 4.2 1.8-4.2h1.6v8h.5zM10 14.5l-.8-2.4-.8 2.4h1.6z"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#96C121] hover:text-black transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </button>
            {/* Instagram */}
            <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#96C121] hover:text-black transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </button>
            {/* X (Twitter) */}
            <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#96C121] hover:text-black transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </button>
            {/* LinkedIn */}
            <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#96C121] hover:text-black transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </button>
          </div>

        </div>

        <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
              Copyright © Blok-On {new Date().getFullYear()}. Todos los derechos reservados.
            </p>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
    </footer>
  );
};
