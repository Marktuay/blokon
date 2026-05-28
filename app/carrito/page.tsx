'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

const formatPrice = (rawPrice?: string) => {
  if (!rawPrice) return '';
  return rawPrice.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
};

export default function CarritoPage() {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

  const cartItems = cart?.contents?.nodes || [];
  const isEmpty = cartItems.length === 0;

  const handleQuantityChange = async (key: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    await updateQuantity(key, newQty);
  };

  const handleRemove = async (key: string) => {
    await removeFromCart([key]);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4 md:px-8 font-acumin text-[#1a1c1c]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <p className="text-[#96C121] font-bold uppercase tracking-[0.3em] text-sm mb-2">Resumen de Cotización</p>
          <h1 className="font-moderniz text-4xl md:text-5xl font-bold uppercase tracking-tighter text-[#11406C]">
            Tu Cesta
          </h1>
        </header>

        {loading && cartItems.length === 0 ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11406C]"></div>
          </div>
        ) : isEmpty ? (
          <div className="bg-white p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto rounded-xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="font-moderniz text-xl text-[#11406C] uppercase mb-4">Tu cesta está vacía</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Aún no has agregado productos a tu cotización. Explora nuestro catálogo de prefabricados y sistemas estructurales.
            </p>
            <Link 
              href="/productos"
              className="inline-block px-8 py-4 bg-[#11406C] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#96C121] hover:text-[#11406C] transition-all rounded-lg"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Listado de Productos */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item: any) => {
                const product = item.product?.node;
                const imageSrc = product?.image?.sourceUrl || product?.parent?.node?.image?.sourceUrl;
                const formattedTotal = formatPrice(item.total);
                const formattedPrice = formatPrice(product?.price || item.subtotal);
                const attributes = product?.attributes?.nodes || [];

                return (
                  <div 
                    key={item.key} 
                    className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-6 flex-1 w-full">
                      {/* Imagen */}
                      <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden rounded border border-gray-100">
                        {imageSrc ? (
                          <Image 
                            src={imageSrc} 
                            alt={product.name || 'Producto'} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Detalles */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#11406C] text-lg uppercase tracking-tight truncate">
                          {product?.name || 'Producto'}
                        </h3>
                        
                        {/* Atributos / Tamaño de la Variación */}
                        {attributes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {attributes.map((attr: any, idx: number) => {
                              if (!attr.value) return null;
                              const cleanName = attr.name
                                .replace('attribute_pa_', '')
                                .replace('attribute_', '')
                                .replace(/-/g, ' ')
                                .trim();
                              const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
                              return (
                                <span key={idx} className="inline-block bg-[#96C121]/15 text-[#11406C] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest border border-[#96C121]/20">
                                  {displayName}: {attr.value}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <p className="text-xs text-gray-500 mt-2 font-medium">
                          Precio Unitario: {formattedPrice || 'Consultar'}
                        </p>
                      </div>
                    </div>

                    {/* Controles de Cantidad y Totales */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                      {/* Selector de Cantidad */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                        <button 
                          onClick={() => handleQuantityChange(item.key, item.quantity, -1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors font-bold"
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-center text-sm font-bold min-w-[3rem] bg-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => handleQuantityChange(item.key, item.quantity, 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors font-bold"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal del Item */}
                      <div className="text-right min-w-[8rem]">
                        <p className="font-moderniz font-bold text-lg text-[#11406C]">
                          {formattedTotal}
                        </p>
                      </div>

                      {/* Botón Eliminar */}
                      <button 
                        onClick={() => handleRemove(item.key)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel de Resumen */}
            <div className="lg:col-span-4">
              <div className="bg-[#11406C] p-8 text-white shadow-2xl rounded-xl sticky top-8">
                <h3 className="font-tt-drugs text-2xl font-bold uppercase tracking-tight mb-8">
                  Resumen Estructural
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <p className="opacity-80">Subtotal</p>
                    <p className="font-bold text-lg">{formatPrice(cart?.subtotal)}</p>
                  </div>
                  {cart?.discountTotal && parseFloat(cart.discountTotal) > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-white/10 text-[#96C121]">
                      <p>Descuento</p>
                      <p className="font-bold">-{formatPrice(cart?.discountTotal)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4">
                    <p className="font-moderniz font-bold uppercase">Total Estimado</p>
                    <p className="font-moderniz font-bold text-[#96C121] text-3xl">
                      {formatPrice(cart?.total)}
                    </p>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="block w-full py-5 bg-[#96C121] text-[#11406C] font-bold text-center uppercase tracking-widest text-sm hover:bg-white hover:text-[#11406C] transition-all rounded-lg shadow-lg"
                >
                  Proceder al Pago
                </Link>

                <div className="mt-8 text-center">
                  <Link 
                    href="/productos"
                    className="text-xs text-white/60 hover:text-white transition-colors uppercase tracking-widest font-bold"
                  >
                    ← Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
