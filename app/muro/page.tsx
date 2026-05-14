'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StepCard = ({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) => (
  <div className="bg-white p-8 border border-gray-100 hover:border-[#96C121] transition-all group relative overflow-hidden shadow-sm hover:shadow-xl">
    <div className="absolute -right-4 -top-4 text-gray-50 font-moderniz text-8xl group-hover:text-green-50 transition-colors z-0">
      {number}
    </div>
    <div className="relative z-10">
      <div className="w-16 h-16 bg-[#11406C] text-[#96C121] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-moderniz text-xl text-[#11406C] mb-4 uppercase tracking-tight leading-tight">
        {title}
      </h3>
      <p className="font-acumin text-gray-500 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  </div>
);

export default function MuroPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1590069230002-70cc3bc430aa?q=80&w=2000&auto=format&fit=crop" 
          alt="Muro Perimetral Blok-On"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Muro <span className="text-[#96C121]">Perimetral</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            La solución definitiva en seguridad y estética para tu propiedad. Rapidez de instalación y máxima resistencia.
          </p>
        </div>
      </section>

      {/* Requerimientos Section - Basado en la imagen proporcionada */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.3em] text-xs font-bold">Proceso de Oferta</span>
            <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase mt-4">
              Datos para <span className="text-[#96C121]">Cotizar</span>
            </h2>
            <p className="font-acumin text-gray-400 mt-4 max-w-xl mx-auto">
              Para brindarte una oferta precisa, necesitaremos los siguientes detalles de tu proyecto:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number="01"
              title="Forma y Medidas"
              desc="Indicar si es línea recta o con esquinas. Brindar las medidas de cada lado en metros lineales."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 10l2 2 4-4" />
                </svg>
              }
            />
            <StepCard 
              number="02"
              title="Altura Requerida"
              desc="Contamos con alturas estándar de 2m, 2.5m, 3m y 3.25m según la seguridad que necesites."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              }
            />
            <StepCard 
              number="03"
              title="Planos o Croquis"
              desc="Si dispones de un plano, dibujo o croquis del terreno, puedes adjuntarlo para mayor precisión."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <StepCard 
              number="04"
              title="Datos de Contacto"
              desc="Tu nombre y apellido para personalizar la oferta formal y enviarla a tu correo o WhatsApp."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />
          </div>

          {/* Formulario de Cotización */}
          <div className="mt-24 max-w-4xl mx-auto bg-white border border-gray-100 shadow-2xl overflow-hidden">
            <div className="bg-[#11406C] py-6 px-10">
              <h3 className="font-moderniz text-white text-xl uppercase tracking-tight">Formulario de Cotización Especializada</h3>
            </div>
            <form className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Datos de Contacto */}
              <div className="space-y-4 md:col-span-2">
                <label className="font-moderniz text-[10px] uppercase tracking-widest text-gray-400">Datos del Solicitante</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nombre Completo" className="w-full bg-gray-50 border-0 p-4 text-sm font-acumin outline-none focus:ring-1 focus:ring-[#96C121] transition-all" required />
                  <input type="email" placeholder="Correo Electrónico" className="w-full bg-gray-50 border-0 p-4 text-sm font-acumin outline-none focus:ring-1 focus:ring-[#96C121] transition-all" required />
                </div>
              </div>

              {/* Forma y Medidas */}
              <div className="space-y-4">
                <label className="font-moderniz text-[10px] uppercase tracking-widest text-gray-400">Forma del Muro</label>
                <select className="w-full bg-gray-50 border-0 p-4 text-sm font-acumin outline-none focus:ring-1 focus:ring-[#96C121] transition-all">
                  <option>Línea Recta</option>
                  <option>Con 1 Esquina (L)</option>
                  <option>Con 2 Esquinas (U)</option>
                  <option>Perímetro Completo</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="font-moderniz text-[10px] uppercase tracking-widest text-gray-400">Altura Requerida</label>
                <select className="w-full bg-gray-50 border-0 p-4 text-sm font-acumin outline-none focus:ring-1 focus:ring-[#96C121] transition-all">
                  <option>2.00 Metros</option>
                  <option>2.50 Metros</option>
                  <option>3.00 Metros</option>
                  <option>3.25 Metros</option>
                </select>
              </div>

              <div className="space-y-4 md:col-span-2">
                <label className="font-moderniz text-[10px] uppercase tracking-widest text-gray-400">Medidas Detalladas (Metros por lado)</label>
                <textarea placeholder="Ej: Lado A: 10m, Lado B: 15m..." className="w-full bg-gray-50 border-0 p-4 text-sm font-acumin outline-none focus:ring-1 focus:ring-[#96C121] transition-all h-24 resize-none" required></textarea>
              </div>

              {/* Archivo y Croquis */}
              <div className="space-y-4 md:col-span-2">
                <label className="font-moderniz text-[10px] uppercase tracking-widest text-gray-400">Adjuntar Croquis o Plano (Opcional)</label>
                <div className="border-2 border-dashed border-gray-100 p-8 text-center hover:border-[#96C121] transition-all group cursor-pointer">
                  <input type="file" className="hidden" id="file-upload" accept=".pdf,image/*" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-8 h-8 mx-auto text-gray-300 group-hover:text-[#96C121] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-xs text-gray-400 font-acumin group-hover:text-[#11406C] block">Haz clic para subir un archivo o arrástralo aquí</span>
                    <span className="text-[9px] text-gray-300 uppercase tracking-tighter mt-1">Formatos permitidos: PDF, JPG, PNG</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-[#96C121] text-[#11406C] font-moderniz py-5 uppercase tracking-widest text-sm hover:bg-[#11406C] hover:text-white transition-all">
                  Enviar Solicitud de Cotización
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Banner de Acción */}
      <section className="py-20 bg-[#11406C]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-moderniz text-2xl md:text-4xl text-white mb-8 uppercase tracking-tight">
            ¿Listo para proteger tu <span className="text-[#96C121]">Propiedad?</span>
          </h2>
          <Link 
            href="/contacto"
            className="inline-block bg-[#96C121] text-[#11406C] font-bold py-4 px-12 uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors"
          >
            Solicitar Cotización
          </Link>
        </div>
      </section>

      {/* Características Técnicas */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video overflow-hidden border border-gray-100 shadow-lg">
               <Image 
                 src="/images/muro/murio25.JPG"
                 alt="Instalación de Muro Perimetral Blok-On"
                 fill
                 className="object-cover"
               />
            </div>
            <div className="space-y-8">
              <h3 className="font-moderniz text-3xl text-[#11406C] uppercase leading-tight">
                ¿Por qué elegir el sistema <span className="text-[#96C121]">Blok-On?</span>
              </h3>
              <div className="space-y-6">
                {[
                  { t: "Rapidez", d: "Instalación hasta 3 veces más rápida que el muro de bloque tradicional." },
                  { t: "Economía", d: "Ahorro en desperdicios de materiales y menor costo de mano de obra." },
                  { t: "Estética", d: "Acabado limpio y uniforme que no requiere repello inmediato." },
                  { t: "Seguridad", d: "Sistema de postes y bloques pretensados de alta resistencia estructural." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#96C121]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-[#96C121]"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#11406C] uppercase text-sm mb-1">{item.t}</h4>
                      <p className="text-gray-500 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
