'use client';

import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_POSTS_QUERY } from '@/lib/graphql/queries';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const { data, loading, error } = useQuery<any>(GET_POSTS_QUERY, {
    variables: { first: 12 }
  });

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
        <p>Error al cargar el blog desde la API: {error.message}</p>
      </div>
    );
  }

  const posts = data?.posts?.nodes || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#11406C] overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <p className="text-[#96C121] font-tt-drugs font-bold tracking-[0.3em] uppercase text-xs mb-4">Ingenieria & Modularidad</p>
          <h1 className="font-moderniz text-4xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6">
            Blog <span className="text-[#96C121]">Blok-On</span>
          </h1>
          <p className="font-acumin text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Ultimas noticias, avances arquitectonicos y articulos de opinion sobre el futuro de la construccion eficiente.
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <div className="text-center p-20 bg-gray-50 border border-gray-100 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-moderniz text-2xl text-[#11406C] mb-4 uppercase">No hay articulos publicados.</h2>
                <p className="font-acumin text-gray-500">Pronto compartiremos novedades en nuestro blog.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post: any) => (
                <article key={post.id} className="group cursor-pointer flex flex-col bg-white">
                  <div className="relative h-72 overflow-hidden bg-gray-100 mb-8">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image 
                        src={post.featuredImage.node.sourceUrl} 
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#11406C]/5 text-[#11406C]/20">
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"></path></svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#11406C]/20 group-hover:bg-transparent transition-all duration-500" />
                    
                    {post.categories?.nodes?.length > 0 && (
                      <div className="absolute top-0 right-0 bg-[#96C121] px-4 py-2 text-[10px] font-moderniz uppercase tracking-widest text-[#11406C]">
                        {post.categories.nodes[0].name}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col flex-1 px-2">
                    <span className="font-tt-drugs text-[10px] text-[#96C121] uppercase tracking-[0.3em] mb-4">
                      {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    
                    <h2 className="font-moderniz text-xl md:text-2xl font-bold tracking-tight text-[#11406C] mb-4 group-hover:text-[#96C121] transition-colors leading-tight uppercase">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <div 
                      className="font-acumin text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                    />

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        {post.author?.node?.avatar?.url ? (
                          <Image 
                            src={post.author.node.avatar.url} 
                            alt={post.author.node.name} 
                            width={32} 
                            height={32} 
                            className="rounded-full grayscale group-hover:grayscale-0 transition-all"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#11406C] text-white flex items-center justify-center text-[10px] font-bold">
                            {post.author?.node?.name?.charAt(0) || 'A'}
                          </div>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#11406C]">{post.author?.node?.name || 'Admin Blok-On'}</span>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`} className="text-[#96C121] transition-transform group-hover:translate-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
