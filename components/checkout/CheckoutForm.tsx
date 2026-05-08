'use client';

import React, { useState } from 'react';
import { useCheckout } from '@/hooks/useCheckout';

export const CheckoutForm = () => {
  const { processCheckout, loading, error } = useCheckout();
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  // Simulación de datos del carrito (se reemplazará por context/estado global)
  const mockCartItems = [
    { id: '1', name: 'Bloque Estándar x 150', price: 1800.00 },
    { id: '2', name: 'Logística de Carga', price: 450.00 }
  ];
  const subtotal = mockCartItems.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = discountCode === 'PROMO2026' ? 200 : 0;
  const finalTotal = subtotal - discountAmount;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones de venta.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    // Construcción del objeto compatible con WooCommerce REST API
    const data = {
      billing: {
        first_name: formData.get('billing_first_name'),
        last_name: formData.get('billing_last_name'),
        company: formData.get('billing_company'),
        address_1: formData.get('billing_address_1'),
        address_2: formData.get('billing_address_2'),
        city: formData.get('billing_city'),
        state: formData.get('billing_state'),
        postcode: formData.get('billing_postcode'),
        country: formData.get('billing_country') || 'NI',
        email: formData.get('billing_email'),
        phone: formData.get('billing_phone'),
      },
      meta_data: needsInvoice ? [
        { key: 'billing_rfc', value: formData.get('billing_rfc') },
        { key: 'billing_cfdi_use', value: formData.get('billing_cfdi_use') }
      ] : [],
      customer_note: formData.get('order_comments'),
      paymentMethod: paymentMethod,
      coupon: discountCode,
      total: finalTotal.toFixed(2),
    };

    const result = await processCheckout(data);
    if (result?.success) {
        // Redireccionar o mostrar éxito
        window.location.href = '/checkout/success';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-acumin text-[#1a1c1c]">
      {/* Columna Izquierda: Formulario */}
      <div className="lg:col-span-7 space-y-12">
        <section>
          <h2 className="font-tt-drugs text-3xl font-bold uppercase tracking-tighter mb-8 border-b-4 border-[#11406C] inline-block">
            Información de Envío
          </h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Nombre y Apellidos */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Nombre *</label>
              <input name="billing_first_name" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Apellidos *</label>
              <input name="billing_last_name" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 2. Empresa */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Nombre de la empresa (Opcional)</label>
              <input name="billing_company" className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 3. País */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">País / Región *</label>
              <select name="billing_country" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c] cursor-pointer">
                <option value="NI">Nicaragua</option>
              </select>
            </div>

            {/* 4. Dirección */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Dirección de la calle *</label>
              <input name="billing_address_1" required placeholder="Número de la casa y nombre de la calle" className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c] mb-2" />
              <input name="billing_address_2" placeholder="Apartamento, habitación, etc. (Opcional)" className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 5. Localidad / Ciudad */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Localidad / Ciudad *</label>
              <input name="billing_city" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 6. Región / Estado */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Estado / Provincia *</label>
              <input name="billing_state" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 7. Código Postal */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Código Postal *</label>
              <input name="billing_postcode" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>
            
            {/* Espaciador para grid */}
            <div className="hidden md:block"></div>

            {/* 8. Teléfono */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Teléfono *</label>
              <input name="billing_phone" type="tel" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 9. Correo */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Dirección de correo electrónico *</label>
              <input name="billing_email" type="email" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            {/* 10. Notas del pedido */}
            <div className="md:col-span-2 flex flex-col mt-4">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Información Adicional</h3>
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Notas del pedido (Opcional)</label>
              <textarea name="order_comments" rows={3} placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega." className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c] resize-none" />
            </div>
            
            {/* Facturación Toggle (Campos Custom México) */}
            <div className="md:col-span-2 flex items-center gap-3 mt-4">
              <input 
                type="checkbox" 
                id="needsInvoice" 
                checked={needsInvoice}
                onChange={(e) => setNeedsInvoice(e.target.checked)}
                className="w-4 h-4 accent-[#96C121]" 
              />
              <label htmlFor="needsInvoice" className="text-sm font-bold cursor-pointer">Requiero Factura (CFDI)</label>
            </div>

            {needsInvoice && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-200 rounded mt-2">
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">RFC *</label>
                  <input name="billing_rfc" required={needsInvoice} className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c] uppercase" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Uso de CFDI *</label>
                  <select name="billing_cfdi_use" required={needsInvoice} className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c] cursor-pointer">
                    <option value="">Selecciona el uso</option>
                    <option value="G01">G01 - Adquisición de mercancias</option>
                    <option value="G03">G03 - Gastos en general</option>
                    <option value="I01">I01 - Construcciones</option>
                  </select>
                </div>
              </div>
            )}
          </form>
        </section>

        <section>
          <h2 className="font-tt-drugs text-3xl font-bold uppercase tracking-tighter mb-8 border-b-4 border-[#11406C] inline-block">
            Método de Pago
          </h2>
          <div className="space-y-4">
            {/* Opción Tarjeta */}
            <div 
              className={`border-2 p-6 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-[#11406C] bg-white' : 'border-gray-200 bg-gray-50'}`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 border-4 rounded-full flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#11406C]' : 'border-gray-300'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 bg-[#11406C] rounded-full"></div>}
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-tight">Tarjeta de Crédito / Débito</p>
                    <p className="text-sm opacity-60">Procesado de forma segura con 3D Secure 2.0</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white border border-gray-100 px-2 py-1 text-[10px] font-bold text-gray-400">VISA</div>
                  <div className="bg-white border border-gray-100 px-2 py-1 text-[10px] font-bold text-gray-400">MC</div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="col-span-2 flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Número de Tarjeta</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="border border-gray-200 focus:border-[#11406C] p-3 outline-none tracking-widest" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Fecha de Expiración</label>
                    <input type="text" placeholder="MM/YY" className="border border-gray-200 focus:border-[#11406C] p-3 outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">CVC</label>
                    <input type="text" placeholder="123" className="border border-gray-200 focus:border-[#11406C] p-3 outline-none" />
                  </div>
                </div>
              )}
            </div>

            {/* Opción Transferencia */}
            <div 
              className={`border-2 p-6 transition-all cursor-pointer ${paymentMethod === 'transfer' ? 'border-[#11406C] bg-white' : 'border-gray-200 bg-gray-50'}`}
              onClick={() => setPaymentMethod('transfer')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 border-4 rounded-full flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-[#11406C]' : 'border-gray-300'}`}>
                  {paymentMethod === 'transfer' && <div className="w-2 h-2 bg-[#11406C] rounded-full"></div>}
                </div>
                <div>
                  <p className="font-bold uppercase tracking-tight">Transferencia Bancaria (SPEI)</p>
                  <p className="text-sm opacity-60">Recibirás las instrucciones de pago al confirmar el pedido.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Columna Derecha: Resumen */}
      <div className="lg:col-span-5">
        <div className="bg-[#11406C] p-8 text-white sticky top-8 shadow-2xl">
          <h3 className="font-tt-drugs text-2xl font-bold uppercase tracking-tight mb-8">Resumen Estructural</h3>
          
          <div className="space-y-4 mb-6">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b border-white/10">
                <p className="opacity-80">{item.name}</p>
                <p className="font-bold">${item.price.toFixed(2)}</p>
              </div>
            ))}
            
            {/* Input de Descuento */}
            <div className="pt-2 pb-4 border-b border-white/10">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 block mb-2">Código de Descuento</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ej: PROMO2026"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="w-full bg-white/10 border border-white/20 p-2 outline-none uppercase text-sm focus:border-[#96C121] transition-colors"
                />
              </div>
              {discountAmount > 0 && (
                <p className="text-[#96C121] text-xs mt-2">¡Descuento aplicado: -${discountAmount.toFixed(2)}!</p>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 text-xl">
              <p className="font-moderniz font-bold uppercase">Inversion Total</p>
              <p className="font-moderniz font-bold text-[#96C121] text-3xl">${finalTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-6 flex items-start gap-3">
            <input 
              type="checkbox" 
              id="terms" 
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#96C121]" 
            />
            <label htmlFor="terms" className="text-xs opacity-80 cursor-pointer">
              He leído y acepto las <a href="/terms" className="underline hover:text-[#96C121] transition-colors">condiciones de venta</a>, la política de privacidad y la política de devoluciones de Blok-On. *
            </label>
          </div>

          <button
            form="checkout-form"
            type="submit"
            disabled={loading || !termsAccepted}
            className={`w-full py-5 text-xl font-bold uppercase tracking-widest transition-all ${
              (loading || !termsAccepted)
                ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                : 'bg-[#96C121] text-[#11406C] hover:bg-white hover:text-[#11406C]'
            }`}
          >
            {loading ? 'Validando...' : 'Confirmar Pedido'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border-l-4 border-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest opacity-40 text-center">
            Protección de datos garantizada por Cardinal Commerce y SSL de 256 bits.
          </div>
        </div>
      </div>
    </div>
  );
};
