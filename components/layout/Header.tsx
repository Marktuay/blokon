'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const MENU_ITEMS = [
  { name: 'Inicio', href: '/' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Muro', href: '/muro' },
  { name: 'Kits', href: '/kits' },
  { name: 'Productos', href: '/productos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { cart } = useCart();
  const { isAuthenticated, user, openAuthModal, logout } = useAuth();
  
  const itemCount = typeof cart?.contents?.itemCount === 'number'
    ? cart.contents.itemCount
    : typeof cart?.contents?.itemCount === 'string'
      ? parseInt(cart.contents.itemCount, 10) || 0
      : cart?.contents?.nodes?.reduce((sum: number, node: any) => sum + (node.quantity || 0), 0) || 0;

  return (
    <header className="w-full bg-white sticky top-0 z-50 py-6 border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <div className="relative w-32 md:w-40 h-10 md:h-12">
              <Image 
                src="/brand/logo.jpg" 
                alt="Blok-On Logo" 
                fill 
                sizes="(max-width: 768px) 128px, 160px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-white border border-gray-100 rounded-full px-8 py-3 shadow-sm gap-8">
          {MENU_ITEMS.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="font-acumin text-[13px] font-medium text-gray-700 hover:text-[#96C121] transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Icons & Cart Capsule (Desktop/Tablets) */}
          <div className="flex items-center bg-white border border-gray-100 rounded-full pl-4 md:pl-8 pr-4 md:pr-6 py-2 shadow-sm gap-3 md:gap-6">
            <div className="hidden xl:flex flex-col border-r border-gray-100 pr-6 text-right">
              <span className="font-acumin font-bold text-[#11406C] text-sm">+505 8692 - 7530</span>
              <span className="font-acumin text-[11px] text-gray-500">ventas@blok-on.com</span>
            </div>

            <div className="flex items-center gap-4 md:gap-5 text-gray-600 relative">
              <div className="relative flex items-center">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:text-[#96C121] transition-colors hidden sm:block z-10 relative"
                  aria-label="Buscar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                {isSearchOpen && (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        router.push(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
                        setIsSearchOpen(false);
                      }
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 mr-8 flex items-center animate-in fade-in slide-in-from-right-4 duration-200 z-20"
                  >
                    <input 
                      type="text" 
                      autoFocus
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-200 rounded-full py-1.5 px-4 text-xs w-48 focus:outline-none focus:border-[#96C121] font-acumin pr-8 bg-white shadow-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </form>
                )}
              </div>
              
              {/* Profile User Icon & Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => isAuthenticated ? setIsProfileDropdownOpen(!isProfileDropdownOpen) : openAuthModal()}
                  className="hover:text-[#96C121] transition-colors flex items-center gap-1 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {isAuthenticated && (
                    <span className="w-2 h-2 bg-[#96C121] rounded-full border border-white absolute top-0 right-0"></span>
                  )}
                </button>

                {isAuthenticated && isProfileDropdownOpen && (
                  <>
                    <div 
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="fixed inset-0 z-10"
                    ></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl p-4 z-20 flex flex-col font-acumin text-[#1a1c1c] animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="pb-3 border-b border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#96C121]">Sesión Activa</p>
                        <p className="font-bold text-[#11406C] truncate mt-1">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/mi-cuenta"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="text-left text-xs text-gray-700 hover:text-[#11406C] hover:bg-gray-50 font-bold uppercase tracking-wider py-2 pt-3 flex items-center gap-2 -mx-4 px-4 transition-colors border-b border-gray-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Mi Cuenta
                      </Link>
                      <button 
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          logout();
                        }}
                        className="text-left text-xs text-red-600 hover:text-red-800 font-bold uppercase tracking-wider pt-3 flex items-center gap-2 hover:bg-red-50/50 -mx-4 px-4 py-2 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>

              <Link href="/carrito" className="relative hover:text-[#96C121] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#96C121] text-[#11406C] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 bg-[#11406C] text-white rounded-full hover:bg-[#96C121] hover:text-[#11406C] transition-all shadow-lg"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-[#11406C] transition-all duration-500 transform
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full pt-32 px-10">
          <div className="space-y-6">
            {MENU_ITEMS.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block font-moderniz text-3xl text-white uppercase tracking-tighter hover:text-[#96C121] transition-all
                  transform transition-all duration-500 delay-[${index * 100}ms]
                  ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto mb-16 space-y-6 border-t border-white/10 pt-10">
            <div className="flex flex-col gap-1">
              <span className="font-acumin text-white/50 text-xs uppercase tracking-widest">Atencion Directa</span>
              <span className="font-moderniz text-xl text-[#96C121]">+505 8692 - 7530</span>
            </div>
            <div className="flex gap-4">
               {/* Social placeholders could go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
