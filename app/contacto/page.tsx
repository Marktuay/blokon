'use client';

import React, { useState } from 'react';
import { 
  IconWhatsApp, 
  IconCheckCircle 
} from "@/components/ui/Icons";

const ContactIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-12 h-12 rounded-full bg-[#11406C]/5 flex items-center justify-center text-[#11406C] group-hover:bg-[#96C121] group-hover:text-[#11406C] transition-all duration-300">
    {children}
  </div>
);

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    'your-name': '',
    'your-company': '',
    'your-email': '',
    'your-tel': '',
    'your-subject': '',
    'your-message': ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const FORM_ID = '14'; 
    // Usamos el proxy local para evitar problemas de CORS en producción
    const API_URL = typeof window !== 'undefined' 
      ? `/api/contact-proxy?id=${FORM_ID}`
      : `https://api.blok-on.com/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`;

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    // Campos técnicos requeridos por la API de Contact Form 7
    body.append('_wpcf7_unit_tag', `wpcf7-f${FORM_ID}-p1-o1`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: body,
      });

      const data = await response.json();

      if (data.status === 'mail_sent') {
        setStatus('success');
        setFormData({
          'your-name': '',
          'your-company': '',
          'your-email': '',
          'your-tel': '',
          'your-subject': '',
          'your-message': ''
        });
      } else {
        console.error('Detalles del error de validación de CF7:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Error crítico al enviar el formulario:', error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="font-moderniz text-3xl sm:text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-4">
            Contacto <span className="text-[#96C121]">Directo</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Estamos listos para materializar tu proyecto con precisión industrial y diseño de vanguardia.
          </p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="font-moderniz text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#11406C] mb-8 border-l-4 border-[#96C121] pl-6">
                  Canales de Atencion
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6 group cursor-pointer">
                    <ContactIcon>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </ContactIcon>
                    <div>
                      <h3 className="font-tt-drugs font-bold uppercase tracking-widest text-[#11406C] text-xs sm:text-sm mb-1">Telefono</h3>
                      <p className="font-acumin text-base sm:text-lg text-gray-600">+505 8692 - 7530</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group cursor-pointer">
                    <ContactIcon>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </ContactIcon>
                    <div>
                      <h3 className="font-tt-drugs font-bold uppercase tracking-widest text-[#11406C] text-xs sm:text-sm mb-1">Correo Electronico</h3>
                      <p className="font-acumin text-base sm:text-lg text-gray-600">ventas@blok-on.com</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group cursor-pointer">
                    <ContactIcon>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </ContactIcon>
                    <div>
                      <h3 className="font-tt-drugs font-bold uppercase tracking-widest text-[#11406C] text-xs sm:text-sm mb-1">Ubicacion</h3>
                      <p className="font-acumin text-base sm:text-lg text-gray-600 leading-relaxed">Km 18.5 carretera nueva a León,<br/>Mateare, Nicaragua</p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <a 
                      href="https://wa.me/50586927530" 
                      target="_blank" 
                      className="inline-flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <IconWhatsApp size={20} />
                      WhatsApp Business
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 border-l-4 border-[#11406C]">
                <h3 className="font-tt-drugs font-bold uppercase tracking-widest text-[#11406C] text-sm mb-6 flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Horario de Operaciones
                </h3>
                <div className="space-y-3 font-acumin text-sm text-gray-600">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Lunes a Viernes:</span>
                    <span className="font-bold text-[#11406C]">9:00 am - 18:00 pm</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span>Sábados:</span>
                    <span className="font-bold text-[#11406C]">9:00 am - 14:00 pm</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Domingos:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-white shadow-2xl p-10 md:p-16 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <IconCheckCircle size={120} />
              </div>
              
              <h2 className="font-moderniz text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#11406C] mb-10">
                Envia tu Mensaje
              </h2>

              {status === 'success' ? (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-[#96C121]/20 rounded-full flex items-center justify-center mx-auto text-[#96C121]">
                    <IconCheckCircle size={48} />
                  </div>
                  <h3 className="font-tt-drugs text-2xl font-bold uppercase text-[#11406C]">¡Mensaje Enviado!</h3>
                  <p className="font-acumin text-gray-600 max-w-sm mx-auto">Gracias por contactarnos. Un especialista se pondrá en contacto contigo a la brevedad.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="font-bold text-[#11406C] uppercase tracking-widest text-xs border-b-2 border-[#96C121]"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        name="your-name"
                        value={formData['your-name']}
                        onChange={handleChange}
                        required
                        className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Empresa (Opcional)</label>
                      <input 
                        type="text" 
                        name="your-company"
                        value={formData['your-company']}
                        onChange={handleChange}
                        className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                      <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="your-email"
                        value={formData['your-email']}
                        onChange={handleChange}
                        required
                        className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Teléfono</label>
                      <input 
                        type="tel" 
                        name="your-tel"
                        value={formData['your-tel']}
                        onChange={handleChange}
                        required
                        className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Asunto del Proyecto</label>
                    <select 
                      name="your-subject"
                      value={formData['your-subject']}
                      onChange={handleChange}
                      required
                      className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent cursor-pointer"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Kits de Vivienda">Kits de Vivienda</option>
                      <option value="Muro Perimetral">Muro Perimetral</option>
                      <option value="Fachada Moderna">Fachada Moderna</option>
                      <option value="Consultoría Estructural">Consultoría Estructural</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-tt-drugs text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Mensaje</label>
                    <textarea 
                      name="your-message"
                      value={formData['your-message']}
                      onChange={handleChange}
                      required
                      rows={4} 
                      className="border-b-2 border-gray-200 focus:border-[#96C121] py-3 outline-none transition-all font-acumin text-lg bg-transparent resize-none" 
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 font-acumin text-sm">Hubo un error al enviar el mensaje. Por favor intenta de nuevo.</p>
                  )}

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#11406C] text-white py-6 font-bold uppercase tracking-[0.3em] text-sm hover:bg-[#96C121] hover:text-[#11406C] transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Enviando...' : 'Enviar Requerimiento'}
                    {status !== 'loading' && (
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative group">
        <div className="absolute top-10 left-10 z-10 pointer-events-none">
            <div className="bg-white p-8 shadow-2xl border-l-4 border-[#96C121] text-left max-w-sm pointer-events-auto transform group-hover:-translate-y-2 transition-transform duration-500">
                <svg className="text-[#11406C] w-10 h-10 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <h3 className="font-tt-drugs font-bold uppercase tracking-widest text-[#11406C] mb-2">Nuestra Planta</h3>
                <p className="font-acumin text-sm text-gray-600">Km 18.5 carretera nueva a León,<br/>Mateare, Nicaragua</p>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=12.204124,-86.385327" 
                    target="_blank" 
                    className="mt-6 inline-block font-bold text-xs uppercase tracking-widest text-[#96C121] hover:text-[#11406C] transition-colors"
                >
                    Ver en Google Maps →
                </a>
            </div>
        </div>
        
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://maps.google.com/maps?q=12.204124,-86.385327&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="transition-all duration-700"
        ></iframe>
      </section>
    </main>
  );
}
