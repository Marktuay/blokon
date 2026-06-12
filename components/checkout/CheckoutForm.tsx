'use client';

import React, { useState } from 'react';
import { useCheckout } from '@/hooks/useCheckout';
import { useCart } from '@/hooks/useCart';

export const CheckoutForm = () => {
  const { processCheckout, loading, error } = useCheckout();
  const { cart, loading: cartLoading } = useCart();
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [hasExoneration, setHasExoneration] = useState(false);

  const cartItems = cart?.contents?.nodes || [];
  
  const totalNum = cart?.total ? parseFloat(cart.total.replace(/[^0-9.]/g, '')) : 0;
  const subtotalNum = cart?.subtotal ? parseFloat(cart.subtotal.replace(/[^0-9.]/g, '')) : 0;
  const discountNum = cart?.discountTotal ? parseFloat(cart.discountTotal.replace(/[^0-9.]/g, '')) : 0;
  // Retain calculation references for backward compatibility if needed

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones de venta.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    // Extraemos nombre y apellidos
    const fullName = formData.get('billing_name') as string || '';
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'N/A';

    // Construcción del objeto compatible con WooCommerce REST API
    const data = {
      billing: {
        first_name: firstName,
        last_name: lastName,
        company: '',
        address_1: 'N/A',
        address_2: '',
        city: 'Managua',
        state: 'Managua',
        postcode: '10000',
        country: 'NI',
        email: 'ventas@blok-on.com', // Correo por defecto ya que no se solicitó
        phone: formData.get('billing_phone'),
      },
      meta_data: [
        { key: 'ruc_cedula', value: formData.get('billing_ruc_cedula') },
        { key: 'exoneracion', value: hasExoneration ? 'Sí' : 'No' }
      ],
      customer_note: formData.get('order_comments'),
      paymentMethod: paymentMethod,
      coupon: discountCode,
      total: totalNum.toFixed(2),
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
            Información del Cliente
          </h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Nombre Completo *</label>
              <input name="billing_name" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">RUC o Cédula *</label>
              <input name="billing_ruc_cedula" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60 text-[#1a1c1c]">Número de Celular *</label>
              <input name="billing_phone" type="tel" required className="border-b-2 border-gray-200 focus:border-[#11406C] p-3 outline-none transition-colors bg-white text-[#1a1c1c]" />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <input 
                type="checkbox" 
                id="hasExoneration" 
                checked={hasExoneration}
                onChange={(e) => setHasExoneration(e.target.checked)}
                className="w-5 h-5 accent-[#96C121] cursor-pointer" 
              />
              <label htmlFor="hasExoneration" className="text-sm font-bold cursor-pointer">
                Aplica para recibir exoneraciones
              </label>
            </div>

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
            {cartItems.map((item: any) => {
              const product = item.product?.node;
              const cleanTotal = item.total ? item.total.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim() : '';
              return (
                <div key={item.key} className="flex justify-between items-center pb-4 border-b border-white/10">
                  <p className="opacity-80 truncate max-w-[70%]">{product?.name || 'Producto'} (x{item.quantity})</p>
                  <p className="font-bold">{cleanTotal}</p>
                </div>
              );
            })}
            
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
              {discountNum > 0 && (
                <p className="text-[#96C121] text-xs mt-2">¡Descuento aplicado: -{cart?.discountTotal?.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim()}!</p>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 text-xl">
              <p className="font-moderniz font-bold uppercase">Inversion Total</p>
              <p className="font-moderniz font-bold text-[#96C121] text-3xl">
                {cart?.total ? cart.total.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim() : '$0.00'}
              </p>
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
