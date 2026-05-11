'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';

interface KitModel {
  name: string;
  area: number;
  priceCompleto12: number;
  priceCompleto15: number;
  priceCajon12: number;
  priceCajon15: number;
}

const KIT_MODELS: KitModel[] = [
  { name: 'Azucena', area: 36.51, priceCompleto12: 73715.00, priceCompleto15: 76614.15, priceCajon12: 50358.50, priceCajon15: 52256.00 },
  { name: 'Julieta', area: 39.76, priceCompleto12: 80654.00, priceCompleto15: 83667.10, priceCajon12: 60871.80, priceCajon15: 63110.85 },
  { name: 'Esperanza', area: 42.86, priceCompleto12: 82894.30, priceCompleto15: 85712.95, priceCajon12: 60135.80, priceCajon15: 62196.60 },
  { name: 'Dalila', area: 47.73, priceCompleto12: 86928.50, priceCompleto15: 90102.50, priceCajon12: 65257.90, priceCajon15: 67640.70 },
  { name: 'Mariana', area: 56.09, priceCompleto12: 87749.60, priceCompleto15: 91613.60, priceCajon12: 63693.90, priceCajon15: 66487.25 },
  { name: 'Promesa', area: 56.54, priceCompleto12: 85394.40, priceCompleto15: 89390.65, priceCajon12: 60066.80, priceCajon15: 62837.15 },
  { name: 'Zoe', area: 56.95, priceCompleto12: 106133.50, priceCompleto15: 109956.10, priceCajon12: 71440.30, priceCajon15: 73853.00 },
  { name: 'Laiz', area: 67.63, priceCompleto12: 108918.80, priceCompleto15: 113411.85, priceCajon12: 74161.20, priceCajon15: 77174.20 },
  { name: 'Victoria', area: 74.49, priceCompleto12: 121702.20, priceCompleto15: 126694.35, priceCajon12: 75469.90, priceCajon15: 78503.60 },
  { name: 'Estrella', area: 80.83, priceCompleto12: 127702.90, priceCompleto15: 133013.60, priceCajon12: 82570.00, priceCajon15: 86064.25 },
  { name: 'Sofia', area: 83.73, priceCompleto12: 130950.50, priceCompleto15: 136191.05, priceCajon12: 77758.40, priceCajon15: 80908.25 },
  { name: 'Agustina', area: 91.41, priceCompleto12: 140336.80, priceCompleto15: 145876.35, priceCajon12: 86374.20, priceCajon15: 89811.55 },
  { name: 'Valentina', area: 97.98, priceCompleto12: 138508.30, priceCompleto15: 144037.50, priceCajon12: 87130.90, priceCajon15: 90510.75 },
  { name: 'Paulina', area: 108.28, priceCompleto12: 156689.80, priceCompleto15: 162969.95, priceCajon12: 100951.60, priceCajon15: 104802.95 },
];

export default function KitsPage() {
  const [thickness, setThickness] = useState<12 | 15>(12);
  const [option, setOption] = useState<'completo' | 'cajon'>('completo');
  const { addToCart } = useCart();

  const getPrice = (model: KitModel) => {
    if (option === 'completo') {
      return thickness === 12 ? model.priceCompleto12 : model.priceCompleto15;
    } else {
      return thickness === 12 ? model.priceCajon12 : model.priceCajon15;
    }
  };

  return (
    <main className="min-h-screen bg-white font-acumin text-[#1a1c1c]">
      {/* Hero Section Estandarizado */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop" 
          alt="Catálogo Kits BLOKON"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Catalogo de <span className="text-[#96C121]">Kits</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Sistemas constructivos listos para ensamblar. Desde estructuras básicas hasta proyectos complejos de rápida ejecución en Nicaragua.
          </p>
        </div>
      </section>

      {/* Intro Stats Section */}
      <section className="py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#96C121]/10 flex items-center justify-center rounded-lg">
                <span className="text-[#96C121] font-bold text-xl">70%</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#11406C]">Más Rápido</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#96C121]/10 flex items-center justify-center rounded-lg">
                <span className="text-[#96C121] font-bold text-xl">25%</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#11406C]">Más Económico</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#96C121]/10 flex items-center justify-center rounded-lg">
                <svg className="w-6 h-6 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#11406C]">Antisísmico</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#96C121]/10 flex items-center justify-center rounded-lg">
                <svg className="w-6 h-6 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#11406C]">Alta Eficiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controles de Catálogo */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
              <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Catálogo 2026</span>
              <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight leading-none mb-6">
                Personaliza <span className="text-[#96C121]">tu Kit</span>
              </h2>
              <p className="text-gray-600">
                Selecciona el espesor del Blokón y el tipo de configuración para ver los precios actualizados (IVA incluido).
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
              {/* Selector de Espesor */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setThickness(12)}
                  className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${thickness === 12 ? 'bg-[#11406C] text-white shadow-md' : 'text-gray-500 hover:text-[#11406C]'}`}
                >
                  12 CM
                </button>
                <button 
                  onClick={() => setThickness(15)}
                  className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${thickness === 15 ? 'bg-[#11406C] text-white shadow-md' : 'text-gray-500 hover:text-[#11406C]'}`}
                >
                  15 CM
                </button>
              </div>
              
              {/* Selector de Opción */}
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setOption('completo')}
                  className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${option === 'completo' ? 'bg-[#96C121] text-[#11406C] shadow-md' : 'text-gray-500 hover:text-[#11406C]'}`}
                >
                  COMPLETO
                </button>
                <button 
                  onClick={() => setOption('cajon')}
                  className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${option === 'cajon' ? 'bg-[#96C121] text-[#11406C] shadow-md' : 'text-gray-500 hover:text-[#11406C]'}`}
                >
                  CAJÓN
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Modelos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {KIT_MODELS.map((model) => (
              <div key={model.name} className="bg-white group overflow-hidden border border-gray-200 hover:border-[#96C121] transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-moderniz text-2xl font-bold uppercase tracking-tighter text-[#11406C]">{model.name}</h3>
                    <span className="bg-[#11406C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {model.area} m²
                    </span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
                    {option === 'completo' ? 'Kit Completo' : 'Opción Cajón'} - {thickness}cm
                  </p>
                  <p className="font-bold text-3xl text-[#1a1c1c]">C$ {getPrice(model).toLocaleString('es-NI', { minimumFractionDigits: 2 })}</p>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-center text-sm text-gray-600 gap-2">
                      <svg className="w-4 h-4 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Postes de Concreto
                    </li>
                    <li className="flex items-center text-sm text-gray-600 gap-2">
                      <svg className="w-4 h-4 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Blokones {thickness}cm {thickness === 12 ? '(Textura)' : '(Liso)'}
                    </li>
                    {option === 'completo' && (
                      <li className="flex items-center text-sm text-gray-600 gap-2">
                        <svg className="w-4 h-4 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        Divisiones Internas
                      </li>
                    )}
                    <li className="flex items-center text-sm text-gray-600 gap-2">
                      <svg className="w-4 h-4 text-[#96C121]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      Vigas y Accesorios
                    </li>
                  </ul>

                  <button 
                    onClick={() => {
                      alert(`¡${model.name} (${option.toUpperCase()} ${thickness}cm) agregado a la cotización!`);
                    }}
                    className="w-full py-4 bg-[#11406C] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#96C121] hover:text-[#11406C] transition-all"
                  >
                    Cotizar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secciones Informativas */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Componentes */}
            <div>
              <h2 className="text-4xl font-moderniz font-bold uppercase text-[#11406C] mb-12">¿Qué incluye el Kit?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 border-l-4 border-[#96C121]">
                  <h4 className="font-bold uppercase text-[#11406C] mb-2 text-sm tracking-widest">Postes y Blokones</h4>
                  <p className="text-sm text-gray-600">Concreto pretensado de alta resistencia. Disponibles en textura (12cm) o liso (15cm).</p>
                </div>
                <div className="bg-gray-50 p-8 border-l-4 border-[#96C121]">
                  <h4 className="font-bold uppercase text-[#11406C] mb-2 text-sm tracking-widest">Accesorios</h4>
                  <p className="text-sm text-gray-600">Piezas de remate para puertas y ventanas, piezas de esquina y unión.</p>
                </div>
                <div className="bg-gray-50 p-8 border-l-4 border-[#96C121]">
                  <h4 className="font-bold uppercase text-[#11406C] mb-2 text-sm tracking-widest">Documentación</h4>
                  <p className="text-sm text-gray-600">Manual de armado paso a paso y planos constructivos detallados.</p>
                </div>
                <div className="bg-gray-50 p-8 border-l-4 border-[#96C121]">
                  <h4 className="font-bold uppercase text-[#11406C] mb-2 text-sm tracking-widest">Estructura</h4>
                  <p className="text-sm text-gray-600">Viga asísmica (VA-C-23) y viga corona (VC-C-2) incluidas.</p>
                </div>
              </div>
              <p className="mt-8 text-xs font-bold text-red-500 uppercase tracking-widest">
                * Nota: El precio NO incluye mano de obra, acabados, carga ni transporte.
              </p>
            </div>

            {/* Muros y Ventajas */}
            <div className="space-y-12">
              <div className="bg-[#11406C] p-12 text-white rounded-2xl shadow-xl">
                <h3 className="text-3xl font-moderniz font-bold uppercase mb-6">Muros Perimetrales</h3>
                <p className="opacity-80 mb-8">También ofrecemos soluciones integrales para seguridad perimetral.</p>
                <div className="flex flex-wrap gap-4">
                  {['2.0m', '2.5m', '3.0m', '3.25m'].map(h => (
                    <span key={h} className="bg-white/10 px-4 py-2 rounded-lg font-bold text-sm">Alturas: {h}</span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6">
                  <h4 className="font-moderniz text-[#96C121] text-xl mb-4">Seguridad</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Sistema antisísmico certificado, resistente a vientos y con materiales de alta calidad.</p>
                </div>
                <div className="p-6">
                  <h4 className="font-moderniz text-[#96C121] text-xl mb-4">Confort</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">Excelente aislamiento acústico y un acabado estético moderno que valoriza tu propiedad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
