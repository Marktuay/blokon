'use client';

import React from 'react';
import Image from 'next/image';
import { 
  IconCheckCircle, 
  IconRapido, 
  IconEconomico, 
  IconAntisismico, 
  IconAcustico,
  IconCertificado
} from "@/components/ui/Icons";

const ValueCard = ({ title }: { title: string }) => (
  <div className="bg-white p-6 border border-gray-100 hover:border-[#96C121] transition-all group shadow-sm">
    <h3 className="font-moderniz text-lg text-[#11406C] group-hover:text-[#96C121] transition-colors uppercase tracking-tight">
      {title}
    </h3>
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12">
    {subtitle && (
      <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
        {subtitle}
      </span>
    )}
    <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight leading-none">
      {children}
    </h2>
  </div>
);

export default function SobreNosotros() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Ingenieria Blok-On"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-4xl md:text-6xl text-white uppercase tracking-tight mb-4">
            Sobre <span className="text-[#96C121]">Nosotros</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Innovación y excelencia en sistemas constructivos prefabricados para el mercado nicaragüense.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="Nuestra Historia">ACERCA DE NOSOTROS</SectionTitle>
              <div className="space-y-6 font-acumin text-lg text-gray-600 leading-relaxed">
                <p>
                  <span className="font-bold text-[#11406C]">New Century Companies</span>, en su afán de hacer realidad el sueño de muchos nicaragüenses que anhelan tener una vivienda propia, incursionó en el mercado de los prefabricados de concreto, con la marca innovadora y versátil llamada <span className="text-[#11406C] font-bold">Blok-On</span>.
                </p>
                <p>
                  Blok-On es un eficiente sistema constructivo conformado por bloques de concreto y acero de alta resistencia. Gracias a sus muchos beneficios es la opción número 1 para la construcción de viviendas en todo el mundo.
                </p>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square bg-gray-100 overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop"
                alt="Arquitectura Moderna"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-24 bg-[#11406C] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionTitle subtitle="¿Por qué elegirnos?">BENEFICIOS BLOK-ON</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <IconRapido size={40} />, title: "Rapidez", desc: "Método integral de construcción sin necesidad de mano de obra especializada." },
              { icon: <IconEconomico size={40} />, title: "Ahorro Comprobado", desc: "Optimización de recursos y reducción de tiempos de entrega." },
              { icon: <IconAntisismico size={40} />, title: "Sismo Resistente", desc: "Estructuras diseñadas para soportar condiciones sísmicas extremas." },
              { icon: <IconAcustico size={40} />, title: "Aislamiento Acustico", desc: "Privacidad y confort térmico en cada espacio." },
              { icon: <IconCertificado size={40} />, title: "Resistente al Fuego", desc: "Materiales certificados que garantizan la seguridad de tu familia." },
              { icon: <IconCheckCircle size={40} />, title: "Anti Moho", desc: "Resistencia superior a la humedad y rayos UV con estuco especializado." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/10 hover:border-[#96C121] transition-all group">
                <div className="text-[#96C121] mb-6 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-moderniz text-xl mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="font-acumin text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión & Visión */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="w-16 h-1 bg-[#96C121]"></div>
              <h2 className="font-moderniz text-4xl text-[#11406C] uppercase tracking-tight">MISION</h2>
              <p className="font-acumin text-lg text-gray-600 leading-relaxed">
                Empresa innovadora con procesos eficientes y eficaces que cumplen todas las normas y seguridad impuesta por las autoridades competentes, mejorando cada día con el fin de producir materiales de alta calidad para el consumidor.
              </p>
            </div>
            <div className="space-y-8">
              <div className="w-16 h-1 bg-[#96C121]"></div>
              <h2 className="font-moderniz text-4xl text-[#11406C] uppercase tracking-tight">VISION</h2>
              <p className="font-acumin text-lg text-gray-600 leading-relaxed">
                Ser la empresa con mayor participación en el mercado de construcción de viviendas en serie a nivel nacional, ayudando a cumplir el sueño de los nicaragüenses en tener una vivienda segura y de calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <SectionTitle subtitle="Nuestro ADN">VALORES CORPORATIVOS</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {["Responsabilidad Social", "Innovacion", "Excelencia", "Lealtad", "Compromiso", "Pasion", "Productividad"].map((valor) => (
              <ValueCard key={valor} title={valor} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
