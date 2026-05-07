'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS_QUERY } from '@/lib/graphql/queries';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';

export default function KitsPage() {
  const { data, loading, error } = useQuery<any>(GET_PRODUCTS_QUERY, {
    variables: { first: 12 }
  });
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11406C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-8 text-center font-acumin">
        <p>Error al cargar el catálogo desde la API: {error.message}</p>
      </div>
    );
  }

  const products = data?.products?.nodes || [];

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24 font-acumin text-[#1a1c1c]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-moderniz text-5xl font-bold uppercase tracking-tighter text-[#11406C] mb-6">
            Catálogo de <span className="text-[#96C121]">Kits</span>
          </h1>
          <p className="text-lg text-gray-600">
            Nuestros sistemas constructivos listos para ensamblar. Desde estructuras básicas hasta proyectos complejos de rápida ejecución en Nicaragua.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center p-12 bg-white border border-gray-200">
            <h2 className="text-2xl font-bold mb-2">No hay productos disponibles.</h2>
            <p className="text-gray-500">Asegúrate de haber creado productos en el panel de WordPress.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white group overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-64 relative bg-gray-100 overflow-hidden">
                  {product.image?.sourceUrl ? (
                    <Image 
                      src={product.image.sourceUrl} 
                      alt={product.image.altText || product.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-[#11406C]/5">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  {product.productCategories?.nodes?.length > 0 && (
                    <p className="text-[#96C121] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                      {product.productCategories.nodes[0].name}
                    </p>
                  )}
                  
                  <h3 className="font-tt-drugs text-xl font-bold uppercase tracking-tight text-[#1a1c1c] mb-2">
                    {product.name}
                  </h3>
                  
                  <div 
                    className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription || product.description || '' }}
                  />

                  <div className="flex items-end justify-between mt-auto pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Inversión Base</p>
                      <p className="font-bold text-xl">{product.price || 'Consultar'}</p>
                    </div>
                    <button 
                      onClick={() => {
                        addToCart(product.databaseId, 1);
                        alert(`¡${product.name} agregado al carrito de cotización!`);
                      }}
                      className="w-12 h-12 rounded-full bg-[#11406C] text-white flex items-center justify-center hover:bg-[#96C121] transition-colors"
                      title="Agregar a cotización"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
