'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header className="w-full bg-white sticky top-0 z-50 py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12">
              <Image 
                src="/brand/logo.jpg" 
                alt="Blok-On Logo" 
                fill 
                sizes="(max-width: 768px) 160px, 160px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Capsule */}
        <nav className="hidden lg:flex items-center bg-white border border-gray-100 rounded-full px-8 py-3 shadow-sm gap-8">
          {['Proyectos', 'Muro', 'Kits de Viviendas', 'Blog', 'Sobre Nosotros', 'Contacto'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-inter text-[13px] font-medium text-gray-700 hover:text-[#96C121] transition-colors whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Info & Actions Capsule */}
        <div className="flex items-center bg-white border border-gray-100 rounded-full pl-8 pr-6 py-2 shadow-sm gap-6">
          {/* Contact Info */}
          <div className="hidden xl:flex flex-col border-r border-gray-100 pr-6 text-right">
            <span className="font-inter font-bold text-[#11406C] text-sm">+505 8692 - 7530</span>
            <span className="font-inter text-[11px] text-gray-500">ventas@blok-on.com</span>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 text-gray-600">
            <button className="hover:text-[#96C121] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button className="hover:text-[#96C121] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <Link href="/checkout" className="relative hover:text-[#96C121] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span className="absolute -top-2 -right-2 bg-[#96C121] text-[#11406C] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
};
