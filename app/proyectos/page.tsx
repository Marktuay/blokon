'use client';

import React from 'react';
import Image from 'next/image';

const ProjectLogos = [
  { name: 'Ciudad El Doral' },
  { name: 'Residencial Monte Nebo' },
  { name: 'Praderas del Mombacho' },
  { name: 'Ciudad Campuzano' },
  { name: 'Programa Bismarck Martinez' },
  { name: 'INVUR' }
];

const Features = [
  { 
    title: 'Antisísmico',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6m-3-10v.01M9 16h.01M15 16h.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 22l4-2 4 2 4-2 4 2 4-2" /></svg>
  },
  { 
    title: 'Resistente al viento',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" /></svg>
  },
  { 
    title: '70% más rápido de construir',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  { 
    title: '25% más económico',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  { 
    title: 'Aislamiento Acústico',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 12l4-4m0 8l-4-4" /></svg>
  },
  { 
    title: 'Buen Aspecto',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
  },
  { 
    title: 'Material certificado 100% seguro',
    icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  }
];

export default function ProyectosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" 
          alt="Proyectos BLOKON"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-4xl md:text-6xl text-white uppercase tracking-tight mb-4 leading-tight">
            Nuestros <span className="text-[#96C121]">Proyectos</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Descubre los desarrollos construidos con nuestro sistema constructivo eficiente, seguro y económico.
          </p>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-2xl md:text-3xl text-[#11406C] uppercase tracking-tight mb-16 inline-block bg-[#11406C] text-white px-8 py-3">
            Proyectos construidos con nuestro sistema
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {ProjectLogos.map((logo, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-transparent hover:border-[#96C121] transition-all">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <span className="font-moderniz text-[9px] uppercase text-[#11406C]">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-2xl md:text-3xl text-white uppercase tracking-tight mb-16 inline-block bg-[#11406C] px-8 py-3">
            Muestras de proyectos hechos con nuestro sistema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Usando imágenes genéricas de casas tipo residencial para el placeholder */}
            {[
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687920-4e2a09c15468?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800&auto=format&fit=crop"
            ].map((img, idx) => (
              <div key={idx} className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <Image 
                  src={img}
                  alt={`Proyecto Blok-On ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11406C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                  <span className="text-white font-moderniz text-[10px] uppercase tracking-widest border-b border-[#96C121] pb-2">
                    Ver Proyecto
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Icons Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 justify-items-center">
            {Features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="text-[#11406C] group-hover:text-[#96C121] transition-colors duration-300 mb-4 transform group-hover:-translate-y-2">
                  {feature.icon}
                </div>
                <h4 className="font-moderniz text-[10px] md:text-xs text-[#11406C] uppercase tracking-tight max-w-[120px] leading-relaxed">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#96C121] text-[#11406C]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-3xl md:text-4xl uppercase tracking-tight mb-6">
            ¿Listo para construir?
          </h2>
          <p className="font-acumin max-w-2xl mx-auto mb-10 text-[#11406C]/80">
            Únete a los desarrolladores que ya confían en el sistema Blok-On para sus proyectos habitacionales.
          </p>
          <a href="/contacto" className="inline-block bg-[#11406C] text-white font-moderniz px-12 py-5 uppercase tracking-widest text-sm hover:bg-white hover:text-[#11406C] transition-all shadow-xl">
            Cotizar Mi Proyecto
          </a>
        </div>
      </section>
    </main>
  );
}
