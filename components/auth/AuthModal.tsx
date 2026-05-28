'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLoginTab) {
        const res = await login(formData.email, formData.password);
        if (!res.success) {
          setError(res.error || 'Credenciales incorrectas.');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Las contraseñas no coinciden.');
          setLoading(false);
          return;
        }
        const res = await register(formData.name, formData.email, formData.password, formData.phone);
        if (!res.success) {
          setError(res.error || 'Error al crear la cuenta.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphic Backdrop */}
      <div 
        onClick={closeAuthModal} 
        className="absolute inset-0 bg-[#1a1c1c]/70 backdrop-blur-md transition-opacity duration-300"
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col font-acumin text-[#1a1c1c] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Color Accent Strip */}
        <div className="h-2 bg-[#96C121] w-full"></div>

        {/* Close Button */}
        <button 
          onClick={closeAuthModal} 
          className="absolute top-6 right-6 text-gray-400 hover:text-[#11406C] transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Cerrar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-8 md:p-10 flex flex-col">
          {/* Logo/Icon Area */}
          <div className="mb-8">
            <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.25em] text-xs font-bold block mb-1">
              Acceso Exclusivo
            </span>
            <h2 className="font-moderniz text-2xl md:text-3xl text-[#11406C] uppercase tracking-tighter">
              {isLoginTab ? 'Ingreso Cliente' : 'Registro Nuevo'}
            </h2>
            <p className="text-xs text-gray-500 mt-2">
              {isLoginTab 
                ? 'Ingresa tus credenciales para cotizar y comprar en línea.' 
                : 'Crea tu perfil en segundos para acceder al cotizador dinámico.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-xs text-red-700 font-bold animate-pulse">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginTab && (
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Nombre Completo *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                  className="border-b-2 border-gray-200 focus:border-[#11406C] py-2 outline-none transition-colors text-sm bg-white text-[#1a1c1c]"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Correo Electrónico *</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="juan.perez@ejemplo.com"
                className="border-b-2 border-gray-200 focus:border-[#11406C] py-2 outline-none transition-colors text-sm bg-white text-[#1a1c1c]"
              />
            </div>

            {!isLoginTab && (
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Teléfono (Opcional)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+505 8888 8888"
                  className="border-b-2 border-gray-200 focus:border-[#11406C] py-2 outline-none transition-colors text-sm bg-white text-[#1a1c1c]"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Contraseña *</label>
              <input 
                type="password" 
                name="password" 
                required 
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="border-b-2 border-gray-200 focus:border-[#11406C] py-2 outline-none transition-colors text-sm bg-white text-[#1a1c1c]"
              />
            </div>

            {!isLoginTab && (
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">Confirmar Contraseña *</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="border-b-2 border-gray-200 focus:border-[#11406C] py-2 outline-none transition-colors text-sm bg-white text-[#1a1c1c]"
                />
              </div>
            )}

            {/* Action CTA Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#11406C] text-white hover:bg-[#96C121] hover:text-[#11406C] font-bold uppercase tracking-widest py-4 transition-all duration-300 text-xs shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </>
              ) : isLoginTab ? (
                'Iniciar Sesión'
              ) : (
                'Registrarse y Continuar'
              )}
            </button>
          </form>

          {/* Toggle Tab Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            {isLoginTab ? (
              <p className="text-xs text-gray-500">
                ¿No tienes cuenta aún?{' '}
                <button 
                  onClick={() => { setIsLoginTab(false); setError(null); }} 
                  className="font-bold text-[#11406C] hover:text-[#96C121] underline transition-colors"
                >
                  Registrarse ahora
                </button>
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                ¿Ya eres cliente de Blok-On?{' '}
                <button 
                  onClick={() => { setIsLoginTab(true); setError(null); }} 
                  className="font-bold text-[#11406C] hover:text-[#96C121] underline transition-colors"
                >
                  Inicia sesión aquí
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
