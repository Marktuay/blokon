'use client';

import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
            <p className="text-[#96C121] font-bold uppercase tracking-[0.3em] text-sm mb-2">Finalizar Transacción</p>
            <h1 className="font-epilogue text-5xl md:text-6xl font-bold uppercase tracking-tighter text-[#11406C]">
              Caja de Salida
            </h1>
        </header>
        
        <CheckoutForm />
      </div>
    </main>
  );
}
