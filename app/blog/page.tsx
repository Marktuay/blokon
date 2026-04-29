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
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-8 text-center font-inter">
        <p>Error al cargar el blog desde la API: {error.message}</p>
      </div>
    );
  }

  const posts = data?.posts?.nodes || [];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 font-inter">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#96C121] font-bold tracking-[0.2em] uppercase text-xs mb-4">Ingeniería & Modularidad</p>
          <h1 className="font-epilogue text-5xl font-bold uppercase tracking-tighter text-[#11406C] mb-6">
            Blog Blok-On
          </h1>
          <p className="text-lg text-gray-500">
            Últimas noticias, avances arquitectónicos y artículos de opinión sobre el futuro de la construcción eficiente.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center p-12 bg-gray-50 border border-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">No hay artículos publicados.</h2>
            <p className="text-gray-500 text-sm">Pronto compartiremos novedades en nuestro blog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => (
              <article key={post.id} className="group cursor-pointer flex flex-col">
                <div className="relative h-64 overflow-hidden bg-gray-100 rounded-lg mb-6">
                  {post.featuredImage?.node?.sourceUrl ? (
                    <Image 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#11406C]/5">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"></path></svg>
                    </div>
                  )}
                  {post.categories?.nodes?.length > 0 && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#11406C]">
                      {post.categories.nodes[0].name}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 uppercase tracking-wider">
                    <span>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  
                  <h2 className="font-epilogue text-2xl font-bold tracking-tight text-[#1a1c1c] mb-3 group-hover:text-[#96C121] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div 
                    className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                  />

                  <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-100">
                    {post.author?.node?.avatar?.url ? (
                      <Image 
                        src={post.author.node.avatar.url} 
                        alt={post.author.node.name} 
                        width={32} 
                        height={32} 
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#11406C] text-white flex items-center justify-center text-xs font-bold">
                        {post.author?.node?.name?.charAt(0) || 'A'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-[#11406C]">{post.author?.node?.name || 'Admin Blok-On'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
