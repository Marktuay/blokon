'use client';

import React from 'react';
export const dynamic = 'force-dynamic';
import Image from 'next/image';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS_QUERY } from '@/lib/graphql/queries';

const formatPrice = (rawPrice?: string) => {
  if (!rawPrice) return '';
  return rawPrice.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
};

const ProductCard = ({ name, price, regularPrice, desc, category, image, variations = [] }: { name: string, price: string, regularPrice?: string, desc?: string, category: string, image?: string, variations?: any[] }) => {
  // Estado para la variación seleccionada
  const [selectedVariationId, setSelectedVariationId] = React.useState<string>(
    variations.length > 0 ? variations[0].id : ''
  );

  // Encontrar la variación seleccionada
  const selectedVariation = React.useMemo(() => {
    return variations.find(v => v.id === selectedVariationId);
  }, [selectedVariationId, variations]);

  // Si hay una variación seleccionada, usamos sus precios; si no, los del producto padre
  const activePrice = selectedVariation ? selectedVariation.price : price;
  const activeRegularPrice = selectedVariation ? selectedVariation.regularPrice : regularPrice;

  const formattedPrice = formatPrice(activePrice);
  const formattedRegularPrice = formatPrice(activeRegularPrice);
  // Hay oferta si existe precio regular, precio de oferta y son distintos
  const isSale = formattedRegularPrice && formattedPrice && formattedPrice !== formattedRegularPrice;

  // Obtener el valor del atributo (ej: "2.60 m") para mostrarlo en el select
  const getVariationLabel = (variation: any) => {
    const attrs = variation.attributes?.nodes || [];
    if (attrs.length > 0) {
      return attrs.map((a: any) => a.value).join(' - ');
    }
    // Si no tiene atributos definidos, usamos el nombre de la variación completo limpiando el nombre base del producto
    return variation.name.replace(`${name} - `, '').replace(`${name} `, '');
  };

  return (
    <div className="bg-white group overflow-hidden border border-gray-200 hover:border-[#96C121] transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl">
      {/* Image Placeholder or Dynamic Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {image ? (
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-[#11406C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          {category}
        </div>
        {isSale && (
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

        {/* Variaciones (Botones de opción de tamaño) */}
        {variations.length > 0 && (
          <div className="mb-6">
            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">
              Seleccionar tamaño
            </label>
            <div className="inline-flex p-1 bg-gray-100 rounded-lg w-full gap-1">
              {variations.map((v: any) => {
                const isActive = v.id === selectedVariationId;
                let label = getVariationLabel(v);
                // Limpiar la palabra "Poste" para que quede solo la medida y quepa perfectamente en los botones
                label = label.replace(/poste\s+/gi, '').trim();

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariationId(v.id)}
                    className={`flex-1 py-2 px-3 text-center text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-[#11406C] text-white shadow-sm'
                        : 'text-gray-500 hover:text-[#11406C] hover:bg-white/50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-end gap-3 mb-6">
            <p className="font-bold text-2xl text-[#1a1c1c]">{formattedPrice}</p>
            {isSale && (
              <p className="text-sm font-bold text-gray-400 line-through pb-1">{formattedRegularPrice}</p>
            )}
          </div>
        <button 
          onClick={() => alert(`Agregado a la cotización: ${name}${selectedVariation ? ` - ${getVariationLabel(selectedVariation)}` : ''}`)}
          className="w-full py-3 bg-[#11406C] text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#96C121] hover:text-[#11406C] transition-all"
        >
          Agregar a Cotización
        </button>
      </div>
    </div>
  </div>
);
};

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

// Respaldo de productos estáticos
const STATIC_CATEGORIES = [
  {
    title: "Sistema Blok-On",
    products: [
      { name: "Poste 2.60 m", price: "C$ 480.00", regularPrice: "C$ 550.00", desc: "Concreto Pretensado" },
      { name: "Poste 3.10 m", price: "C$ 600.00", desc: "Concreto Pretensado" },
      { name: "Poste 3.80 m", price: "C$ 750.00", desc: "Concreto Pretensado" },
      { name: "Blok-On Entero 12 cm", price: "C$ 92.00", desc: "12 x 25 x 96 cm" },
      { name: "Blok-On Entero 15 cm", price: "C$ 101.00", regularPrice: "C$ 115.00", desc: "15 x 25 x 96 cm" },
      { name: "Blok-On Mitad 12 cm", price: "C$ 58.00", desc: "12 x 25 x 48 cm" },
      { name: "Blok-On Mitad 15 cm", price: "C$ 60.00", desc: "12 x 25 x 48 cm" },
      { name: "Viga Corona (VC-C-2)", price: "C$ 675.00" },
      { name: "Viga Asísmica (VA-C-23)", price: "C$ 675.00" },
      { name: "Accesorio C", price: "C$ 32.00", desc: "Pieza de Continuidad" }
    ]
  },
  {
    title: "Bloques Estructurales",
    products: [
      { name: 'Bloque de 4"', price: "C$ 18.00" },
      { name: 'Bloque de 6"', price: "C$ 21.00" },
      { name: 'Bloque de 8"', price: "C$ 27.00" }
    ]
  },
  {
    title: "Jardín (Eblokon)",
    products: [
      { name: "Banca de Concreto", price: "C$ 875.00" },
      { name: "Cuadrante Decorativo", price: "C$ 190.00" },
      { name: "Huella Forma de Tortuga", price: "C$ 190.00" },
      { name: "Huella Flor de 6 Piezas", price: "C$ 450.00" }
    ]
  },
  {
    title: "Ingeniería Vial",
    products: [
      { name: "Adoquín Cruz Convencional (10 cm)", price: "C$ 16.00" },
      { name: "Medio Adoquín Cruz (10 cm)", price: "C$ 9.00" },
      { name: "Adoquín Tipo S (Gris)", price: "C$ 9.50" },
      { name: "Adoquín Tipo S (Rojo)", price: "C$ 17.00" },
      { name: "Bordillo (30x50x15 cm)", price: "C$ 195.00" }
    ]
  },
  {
    title: "Productos Varios",
    products: [
      { name: "Lavanderos Sencillos", price: "C$ 1,675.00" },
      { name: "Lavanderos Dobles", price: "C$ 2,250.00" },
      { name: "Poste Agricon (2.13 m)", price: "C$ 360.00" },
      { name: "Cajas de Registro (0.50m³)", price: "C$ 1,500.00" }
    ]
  }
];

// Helper para clasificar productos de WooCommerce en las 5 secciones
const getSectionForWpCategory = (categories: { name: string }[]) => {
  if (!categories || categories.length === 0) return 'Productos Varios';
  
  const mainCat = categories[0].name.toLowerCase();
  
  if (mainCat.includes('sistema') || mainCat.includes('blok-on') || mainCat.includes('postes') || mainCat.includes('bloques') || mainCat.includes('vigas')) {
    return 'Sistema Blok-On';
  }
  if (mainCat.includes('estructural') || mainCat.includes('bloque')) {
    return 'Bloques Estructurales';
  }
  if (mainCat.includes('jardín') || mainCat.includes('jardin') || mainCat.includes('eblokon') || mainCat.includes('banca') || mainCat.includes('huella')) {
    return 'Jardín (Eblokon)';
  }
  if (mainCat.includes('vial') || mainCat.includes('adoquín') || mainCat.includes('adoquin') || mainCat.includes('bordillo')) {
    return 'Ingeniería Vial';
  }
  return 'Productos Varios';
};

export default function ProductosPage() {
  const { data, loading } = useQuery<any>(GET_PRODUCTS_QUERY, {
    variables: { first: 100 },
    fetchPolicy: 'no-cache'
  });

  const wpProducts = data?.products?.nodes || [];
  const hasWpProducts = wpProducts.length > 0;

  // Si hay productos en WooCommerce, los agrupamos
  const categoriesToRender = React.useMemo(() => {
    if (!hasWpProducts) return STATIC_CATEGORIES;

    // Inicializamos las secciones vacías
    const sections: Record<string, any[]> = {
      "Sistema Blok-On": [],
      "Bloques Estructurales": [],
      "Jardín (Eblokon)": [],
      "Ingeniería Vial": [],
      "Productos Varios": []
    };

    wpProducts.forEach((prod: any) => {
      const targetSection = getSectionForWpCategory(prod.productCategories?.nodes || []);
      
      let variations = prod.variations?.nodes || [];
      
      // Si el producto es variable pero no tiene variaciones reales configuradas en WooCommerce,
      // las generamos dinámicamente a partir de los atributos que se marcan "para variaciones".
      if (variations.length === 0 && prod.attributes?.nodes) {
        const variationAttrs = prod.attributes.nodes.filter((attr: any) => attr.variation);
        if (variationAttrs.length > 0) {
          variations = variationAttrs.map((attr: any, idx: number) => {
            const rawPriceVal = attr.options?.[0]; // Ejemplo: "480"
            const price = rawPriceVal ? `C$ ${rawPriceVal}.00` : '';
            
            // Limpiamos y formateamos el nombre (ej: "postes-2-60m" -> "Poste 2.60 m")
            let cleanAttrName = attr.name
              .replace(/-/g, ' ')
              .replace(/\b(postes)\b/gi, 'Poste')
              .replace(/(\d+)\s+(\d+)\s*m/gi, '$1.$2 m')
              .trim();
            
            // Capitalizar la primera letra
            cleanAttrName = cleanAttrName.charAt(0).toUpperCase() + cleanAttrName.slice(1);

            return {
              id: `virtual-${prod.id}-${idx}`,
              name: cleanAttrName,
              price: price,
              regularPrice: undefined,
              attributes: {
                nodes: [
                  {
                    name: attr.name,
                    value: cleanAttrName
                  }
                ]
              }
            };
          });
        }
      }

      // Si prod.price es nulo o 'Consultar', pero tenemos variaciones virtuales, usamos el precio de la primera.
      const displayPrice = prod.price && prod.price !== 'Consultar'
        ? prod.price
        : (variations.length > 0 ? variations[0].price : 'Consultar');

      sections[targetSection].push({
        name: prod.name,
        price: displayPrice,
        regularPrice: prod.regularPrice || undefined,
        desc: prod.shortDescription ? prod.shortDescription.replace(/<[^>]*>/g, '') : undefined, // Limpiamos HTML de WooCommerce
        image: prod.image?.sourceUrl || undefined,
        variations: variations
      });
    });

    // Convertimos a formato de renderizado
    return Object.keys(sections).map(title => ({
      title,
      products: sections[title]
    })).filter(sec => sec.products.length > 0); // Opcionalmente ocultar categorías vacías de WP
  }, [wpProducts, hasWpProducts]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section Estandarizado */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <Image 
          src="/images/muro/home/esperanza.png" 
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
          {loading && !hasWpProducts && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11406C]"></div>
            </div>
          )}

          {(!loading || hasWpProducts) && categoriesToRender.map((category, index) => (
            <CategorySection key={index} title={category.title}>
              {category.products.map((product, pIdx) => (
                <ProductCard 
                  key={pIdx}
                  category={category.title}
                  name={product.name}
                  price={product.price}
                  regularPrice={product.regularPrice}
                  desc={product.desc}
                  image={product.image}
                  variations={product.variations}
                />
              ))}
            </CategorySection>
          ))}
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
