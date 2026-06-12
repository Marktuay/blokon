'use client';

import React, { useEffect } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11406C]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
            <p className="text-[#96C121] font-bold uppercase tracking-[0.3em] text-sm mb-2">Finalizar Transacción</p>
            <h1 className="font-moderniz text-5xl md:text-6xl font-bold uppercase tracking-tighter text-[#11406C]">
              Caja de Salida
            </h1>
        </header>
        
        <CheckoutForm />
      </div>
    </main>
  );
}
