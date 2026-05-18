'use client';

import React from 'react';
import Image from 'next/image';

const ProductCard = ({ name, price, regularPrice, desc, category }: { name: string, price: string, regularPrice?: string, desc?: string, category: string }) => (
  <div className="bg-white group overflow-hidden border border-gray-200 hover:border-[#96C121] transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl">
    {/* Image Placeholder */}
    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div className="absolute top-4 left-4 bg-[#11406C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
        {category}
      </div>
      {regularPrice && (
        <div className="absolute top-4 right-4 bg-[#96C121] text-[#11406C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Oferta
        </div>
      )}
    </div>

    <div className="p-6 flex flex-col flex-1">
      <div className="mb-4">
        <h3 className="font-moderniz text-lg font-bold uppercase tracking-tight text-[#11406C] group-hover:text-[#96C121] transition-colors leading-tight min-h-[3rem] flex items-center">
          {name}
        </h3>
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-2">
          {desc || 'Material de alta resistencia'}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-end gap-3 mb-6">
          <p className="font-bold text-2xl text-[#1a1c1c]">{price}</p>
          {regularPrice && (
            <p className="text-sm font-bold text-gray-400 line-through pb-1">{regularPrice}</p>
          )}
        </div>
        <button 
          onClick={() => alert(`Agregado a la cotización: ${name}`)}
          className="w-full py-3 bg-[#11406C] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#96C121] hover:text-[#11406C] transition-all"
        >
          Agregar a Cotización
        </button>
      </div>
    </div>
  </div>
);

const CategorySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-24">
    <div className="flex items-center gap-4 mb-12">
      <h2 className="font-moderniz text-2xl md:text-3xl text-[#11406C] uppercase tracking-tight whitespace-nowrap">
        {title}
      </h2>
      <div className="h-px bg-gray-100 w-full"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {children}
    </div>
  </div>
);

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section Estandarizado */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop" 
          alt="Catálogo Productos BLOKON"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Catalogo de <span className="text-[#96C121]">Productos</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Sistemas prefabricados, bloques estructurales y soluciones para ingeniería vial. Calidad certificada 2025.
          </p>
        </div>
      </section>

      {/* Intro Stats Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Ahorro", title: "Tiempo y Dinero" },
              { label: "Instalación", title: "Facil y Rapida" },
              { label: "Seguridad", title: "Resistente y Antisismico" },
              { label: "Estética", title: "Estilo y Gran Aspecto" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.2em] text-[10px] font-bold">{stat.label}</span>
                <span className="font-moderniz text-sm text-[#11406C] uppercase tracking-tight">{stat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* 1. Elementos del Sistema Blok-On */}
          <CategorySection title="Sistema Blok-On">
            <ProductCard category="Postes" name="Poste 2.60 m" price="C$ 480.00" regularPrice="C$ 550.00" desc="Concreto Pretensado" />
            <ProductCard category="Postes" name="Poste 3.10 m" price="C$ 600.00" desc="Concreto Pretensado" />
            <ProductCard category="Postes" name="Poste 3.80 m" price="C$ 750.00" desc="Concreto Pretensado" />
            <ProductCard category="Bloques" name="Blok-On Entero 12 cm" price="C$ 92.00" desc="12 x 25 x 96 cm" />
            <ProductCard category="Bloques" name="Blok-On Entero 15 cm" price="C$ 101.00" regularPrice="C$ 115.00" desc="15 x 25 x 96 cm" />
            <ProductCard category="Bloques" name="Blok-On Mitad 12 cm" price="C$ 58.00" desc="12 x 25 x 48 cm" />
            <ProductCard category="Bloques" name="Blok-On Mitad 15 cm" price="C$ 60.00" desc="15 x 25 x 48 cm" />
            <ProductCard category="Vigas" name="Viga Corona (VC-C-2)" price="C$ 675.00" />
            <ProductCard category="Vigas" name="Viga Asísmica (VA-C-23)" price="C$ 675.00" />
            <ProductCard category="Accesorios" name="Accesorio C" price="C$ 32.00" desc="Pieza de Continuidad" />
          </CategorySection>

          {/* 2. Bloques Estructurales */}
          <CategorySection title="Bloques Estructurales">
            <ProductCard category="Estructural" name='Bloque de 4"' price="C$ 18.00" />
            <ProductCard category="Estructural" name='Bloque de 6"' price="C$ 21.00" />
            <ProductCard category="Estructural" name='Bloque de 8"' price="C$ 27.00" />
          </CategorySection>

          {/* 3. Elementos de Jardín */}
          <CategorySection title="Jardín (Eblokon)">
            <ProductCard category="Eblokon" name="Banca de Concreto" price="C$ 875.00" />
            <ProductCard category="Eblokon" name="Cuadrante Decorativo" price="C$ 190.00" />
            <ProductCard category="Eblokon" name="Huella Forma de Tortuga" price="C$ 190.00" />
            <ProductCard category="Eblokon" name="Huella Flor de 6 Piezas" price="C$ 450.00" />
          </CategorySection>

          {/* 4. Proyectos Viales */}
          <CategorySection title="Ingeniería Vial">
            <ProductCard category="Viales" name="Adoquín Cruz Convencional (10 cm)" price="C$ 16.00" />
            <ProductCard category="Viales" name="Medio Adoquín Cruz (10 cm)" price="C$ 9.00" />
            <ProductCard category="Viales" name="Adoquín Tipo S (Gris)" price="C$ 9.50" />
            <ProductCard category="Viales" name="Adoquín Tipo S (Rojo)" price="C$ 17.00" />
            <ProductCard category="Viales" name="Bordillo (30x50x15 cm)" price="C$ 195.00" />
          </CategorySection>

          {/* 5. Productos Varios */}
          <CategorySection title="Productos Varios">
            <ProductCard category="Varios" name="Lavanderos Sencillos" price="C$ 1,675.00" />
            <ProductCard category="Varios" name="Lavanderos Dobles" price="C$ 2,250.00" />
            <ProductCard category="Varios" name="Poste Agricon (2.13 m)" price="C$ 360.00" />
            <ProductCard category="Varios" name="Cajas de Registro (0.50m³)" price="C$ 1,500.00" />
          </CategorySection>

        </div>
      </section>

      {/* Ventajas Estandarizadas */}
      <section className="py-24 bg-[#11406C] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-3xl md:text-5xl uppercase tracking-tight mb-12">
            Construcción de <span className="text-[#96C121]">Clase Mundial</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {[
              { t: "Economía", d: "Ahorro significativo de tiempo y dinero frente a sistemas tradicionales." },
              { t: "Facilidad", d: "Procesos optimizados para una instalación fácil sin mano de obra especializada." },
              { t: "Estética", d: "Estilo moderno y excelente aspecto visual desde el primer momento." },
              { t: "Seguridad", d: "Estructuras altamente resistentes y certificadas como antisísmicas." }
            ].map((v, i) => (
              <div key={i} className="space-y-4">
                <h4 className="font-moderniz text-[#96C121] text-xl uppercase tracking-tighter">{v.t}</h4>
                <p className="font-acumin text-white/60 text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
