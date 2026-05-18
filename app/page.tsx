import Image from "next/image";
import Link from "next/link";
import { 
  IconAntisismico, 
  IconViento, 
  IconRapido, 
  IconEconomico, 
  IconAcustico, 
  IconBuenAspecto, 
  IconCertificado, 
  IconKits,
  IconMuro,
  IconFachadas
} from "@/components/ui/Icons";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] bg-[#11406C] flex items-center overflow-hidden">
        {/* Imagen de fondo arquitectónico Blok-On */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/images/muro/home/1-D.png')] bg-cover bg-center"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-moderniz text-3xl sm:text-4xl md:text-7xl font-bold text-white uppercase tracking-tight leading-[1.05] mb-6">
              El Futuro de la Construccion <span className="text-[#96C121]">Comienza Aqui.</span>
            </h1>
            <p className="font-acumin text-base md:text-xl text-white/80 mb-10 max-w-xl">
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
          <div className="text-center mb-20">
            <h2 className="font-moderniz text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#11406C] mb-4">
              Ventajas Estructurales
            </h2>
            <div className="w-24 h-1 bg-[#96C121] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8">
            {[
              { icon: <IconAntisismico size={64} />, title: "Antisísmico", color: "text-[#11406C]" },
              { icon: <IconViento size={64} />, title: "Resistente al viento", color: "text-[#11406C]" },
              { icon: <IconRapido size={64} />, title: "70% más rápido de construir", color: "text-[#11406C]" },
              { icon: <IconEconomico size={64} />, title: "25% más económico", color: "text-[#11406C]" },
              { icon: <IconAcustico size={64} />, title: "Aislamiento Acústico", color: "text-[#11406C]" },
              { icon: <IconBuenAspecto size={64} />, title: "Buen Aspecto", color: "text-[#11406C]" },
              { icon: <IconCertificado size={64} />, title: "Material certificado 100% seguro y resistente", color: "text-[#11406C]" },
              { icon: <IconKits size={64} />, title: "Kits de Viviendas", color: "text-[#11406C]" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className={`${item.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="font-tt-drugs text-[11px] sm:text-sm font-bold uppercase tracking-widest text-[#11406C] max-w-[150px] leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
            <div className="bg-[#11406C] p-10 flex flex-col md:flex-row items-center gap-8 text-white group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-[#96C121] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 z-0"></div>
              <div className="relative z-10 text-[#96C121] group-hover:text-[#11406C] transition-colors">
                <IconMuro size={80} />
              </div>
              <div className="relative z-10">
                <h3 className="font-moderniz text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#11406C] transition-colors">Muro Perimetral</h3>
                <p className="text-white/70 group-hover:text-[#11406C]/80 transition-colors font-acumin text-xs sm:text-sm mt-2">Seguridad y elegancia con precisión estructural.</p>
              </div>
            </div>
            <div className="bg-[#11406C] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 text-white group cursor-pointer overflow-hidden relative">
              <div className="absolute inset-0 bg-[#96C121] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 z-0"></div>
              <div className="relative z-10 text-[#96C121] group-hover:text-[#11406C] transition-colors">
                <IconFachadas size={80} />
              </div>
              <div className="relative z-10">
                <h3 className="font-moderniz text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-[#11406C] transition-colors">Fachadas Modernas</h3>
                <p className="text-white/70 group-hover:text-[#11406C]/80 transition-colors font-acumin text-xs sm:text-sm mt-2">Diseños vanguardistas que transforman el entorno.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros Summary */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight mb-6">
              Revolucionando la Construcción
            </h2>
            <div className="w-24 h-1 bg-[#96C121] mb-8"></div>
            <p className="font-acumin text-gray-600 text-lg leading-relaxed mb-8">
              Blok-On es un innovador sistema constructivo nicaragüense que combina velocidad, economía y seguridad estructural. Nuestra tecnología permite desarrollar proyectos habitacionales, comerciales y muros perimetrales con un acabado perfecto y resistencia antisísmica comprobada.
            </p>
            <Link href="/sobre-nosotros" className="inline-block border-b-2 border-[#11406C] font-bold uppercase tracking-widest text-[#11406C] pb-1 hover:text-[#96C121] hover:border-[#96C121] transition-colors">
              Conoce Más de Nosotros
            </Link>
          </div>
          <div className="md:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/muro/home/ESTRELLA-B-12-R-1.png" alt="Construcción Blok-On" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Proyectos Summary */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight mb-4">
            Proyectos Destacados
          </h2>
          <p className="font-acumin text-gray-500 max-w-2xl mx-auto mb-16">
            Grandes desarrollos ya confían en la eficiencia de Blok-On.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {['Ciudad El Doral', 'Residencial Monte Nebo', 'Praderas del Mombacho', 'Ciudad Campuzano'].map((proyecto, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center aspect-square hover:border-[#96C121] hover:shadow-lg transition-all">
                <span className="font-moderniz text-[10px] md:text-xs uppercase text-[#11406C]">{proyecto}</span>
              </div>
            ))}
          </div>
          <Link href="/proyectos" className="bg-[#11406C] text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#96C121] hover:text-[#11406C] transition-colors">
            Ver Todos los Proyectos
          </Link>
        </div>
      </section>

      {/* Highlighted Kits Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-moderniz text-3xl md:text-5xl uppercase tracking-tight text-[#11406C] mb-4">
                Kits de Viviendas
              </h2>
              <p className="font-acumin text-gray-500 max-w-xl">
                Modelos pre-diseñados listos para ensamblar. Tu casa construida en tiempo récord.
              </p>
            </div>
            <Link href="/kits" className="hidden md:inline-block border-b-2 border-[#96C121] font-bold uppercase tracking-widest text-sm pb-1 hover:text-[#11406C] hover:border-[#11406C] transition-colors text-[#96C121]">
              Ver Catálogo de Kits
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#11406C]/10 group-hover:bg-transparent transition-all z-10"></div>
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"></div>
                </div>
                <div className="p-8">
                  <p className="text-[#96C121] font-bold text-xs uppercase tracking-widest mb-2">Modelo Minimal</p>
                  <h3 className="font-tt-drugs text-2xl font-bold uppercase tracking-tight text-[#11406C] mb-4">Vivienda Tipo {i}</h3>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="font-bold text-lg text-gray-700">Cotizar ahora</span>
                    <button className="text-sm font-bold uppercase tracking-widest text-[#11406C] hover:text-[#96C121] transition-colors">
                      Ver Detalles →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link href="/kits" className="inline-block border border-[#11406C] text-[#11406C] px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#11406C] hover:text-white transition-colors">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Muro Perimetral Preview */}
      <section className="py-24 bg-[#11406C] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 md:opacity-30">
          <Image src="/images/muro/muro27.jpg" alt="Muro Perimetral" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11406C] to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-moderniz text-3xl md:text-5xl uppercase tracking-tight mb-6">
              Muros Perimetrales
            </h2>
            <div className="w-24 h-1 bg-[#96C121] mb-8"></div>
            <p className="font-acumin text-white/80 text-lg leading-relaxed mb-10">
              Seguridad total para tu propiedad con una estética inigualable. Nuestro sistema permite levantar metros lineales a una velocidad insuperable, con acabados listos y resistencia garantizada frente a cualquier adversidad.
            </p>
            <Link href="/muro" className="bg-[#96C121] text-[#11406C] px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all inline-block">
              Cotiza tu Muro
            </Link>
          </div>
        </div>
      </section>

      {/* Productos Summary */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight mb-4">
            Catálogo de Productos
          </h2>
          <p className="font-acumin text-gray-500 max-w-2xl mx-auto mb-16">
            Adquiere los bloques, vigas y materiales que conforman nuestro revolucionario sistema.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100 flex flex-col items-center">
                <div className="w-full aspect-square bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#11406C]/5"></div>
                  {/* Imagen Placeholder - Usaremos algo sutil */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                </div>
                <h4 className="font-moderniz text-[10px] md:text-xs text-[#11406C] uppercase tracking-tight mb-2">Bloque Tipo {item}</h4>
                <p className="font-acumin text-[#96C121] font-bold text-sm">Ver producto →</p>
              </div>
            ))}
          </div>
          <Link href="/productos" className="inline-block border-b-2 border-[#11406C] font-bold uppercase tracking-widest text-[#11406C] pb-1 hover:text-[#96C121] hover:border-[#96C121] transition-colors">
            Explorar Tienda
          </Link>
        </div>
      </section>
    </main>
  );
}
