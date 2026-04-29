import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] bg-[#11406C] flex items-center overflow-hidden">
        {/* Placeholder para una imagen o video de fondo arquitectónico de alta calidad */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-epilogue text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[1.1] mb-6">
              El Futuro de la Construcción <span className="text-[#96C121]">Comienza Aquí.</span>
            </h1>
            <p className="font-inter text-lg md:text-xl text-white/80 mb-10 max-w-xl">
              Sistemas estructurales inteligentes, diseño vanguardista y kits de viviendas listos para ensamblar. Construye más rápido, más fuerte y con precisión milimétrica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/kits" className="bg-[#96C121] text-[#11406C] px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all text-center">
                Explorar Kits
              </Link>
              <Link href="/proyectos" className="bg-transparent border border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-[#11406C] transition-all text-center">
                Ver Proyectos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <h2 className="font-epilogue text-4xl font-bold uppercase tracking-tighter text-[#11406C] border-l-4 border-[#96C121] pl-6">
                Ingeniería Modular
              </h2>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 font-inter">
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-[#1a1c1c]">Eficiencia Estructural</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reducimos los tiempos de obra hasta en un 40% mediante sistemas pre-calculados y materiales de última generación, sin sacrificar la estética premium.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-[#1a1c1c]">Sostenibilidad Activa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menor desperdicio de material en sitio, huella de carbono optimizada y aislamiento térmico superior. Cada bloque cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Kits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-epilogue text-4xl font-bold uppercase tracking-tighter text-[#11406C]">
              Kits de Viviendas
            </h2>
            <Link href="/kits" className="hidden md:inline-block border-b-2 border-[#96C121] font-bold uppercase tracking-widest text-sm pb-1 hover:text-[#96C121] transition-colors">
              Ver Catálogo Completo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kit Card Mock */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#11406C]/10 group-hover:bg-transparent transition-all z-10"></div>
                  {/* Imagen Placeholder */}
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"></div>
                </div>
                <div className="p-8">
                  <p className="text-[#96C121] font-bold text-xs uppercase tracking-widest mb-2">Modelo Minimal</p>
                  <h3 className="font-epilogue text-2xl font-bold uppercase tracking-tight text-[#1a1c1c] mb-4">Vivienda Tipo {i}</h3>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="font-bold text-lg">C$ 45,000</span>
                    <button className="text-sm font-bold uppercase tracking-widest text-[#11406C] hover:text-[#96C121] transition-colors">
                      Cotizar +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/kits" className="md:hidden block text-center mt-12 border border-[#11406C] text-[#11406C] py-4 font-bold uppercase tracking-widest">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>
    </main>
  );
}
