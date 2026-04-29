import React from 'react';
import { client } from '@/lib/apollo-client';
import { GET_POST_BY_SLUG_QUERY } from '@/lib/graphql/queries';
import Image from 'next/image';
import Link from 'next/link';

// Usamos App Router dinámico para obtener el post directamente en el servidor
export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  let post = null;
  let error = null;

  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG_QUERY,
      variables: { slug },
      fetchPolicy: 'no-cache', // Evitamos el cacheo estricto para ver cambios en tiempo real
    });
    post = data?.post;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-inter text-center p-8">
        <p>Error al cargar el artículo: {error}</p>
        <Link href="/blog" className="mt-4 text-[#11406C] underline">Volver al Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-inter text-center p-8">
        <p>Artículo no encontrado.</p>
        <Link href="/blog" className="mt-4 text-[#11406C] underline block">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-24 font-inter">
      {/* Cabecera del Artículo */}
      <header className="relative w-full h-[60vh] bg-[#11406C]">
        {post.featuredImage?.node?.sourceUrl ? (
          <Image 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-[#11406C] to-[#1a64a6]" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#11406C]/90 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-4xl">
            {post.categories?.nodes?.length > 0 && (
              <span className="inline-block bg-[#96C121] text-white px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
                {post.categories.nodes[0].name}
              </span>
            )}
            <h1 className="font-epilogue text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-3">
                {post.author?.node?.avatar?.url ? (
                  <Image 
                    src={post.author.node.avatar.url} 
                    alt={post.author.node.name} 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-sm font-bold">
                    {post.author?.node?.name?.charAt(0) || 'A'}
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{post.author?.node?.name || 'Admin Blok-On'}</p>
                  <p className="text-xs uppercase tracking-wider">{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido del Artículo */}
      <article className="container mx-auto px-6 md:px-12 max-w-4xl mt-16">
        <Link href="/blog" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-[#11406C] mb-12 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver al Blog
        </Link>
        
        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700
                     prose-headings:font-epilogue prose-headings:font-bold prose-headings:text-[#11406C]
                     prose-a:text-[#96C121] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-xl prose-img:shadow-lg
                     prose-strong:text-[#1a1c1c]
                     leading-loose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Footer de Compartir / Call to Action */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl mt-24 text-center">
        <div className="p-12 bg-gray-50 border border-gray-100 rounded-2xl">
          <h3 className="font-epilogue text-2xl font-bold text-[#11406C] mb-4">¿Listo para construir el futuro?</h3>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Nuestros kits modulares ofrecen la solución perfecta para tu próximo proyecto. Rápido, seguro y eficiente.</p>
          <Link href="/kits" className="inline-block bg-[#11406C] text-white font-bold py-4 px-8 uppercase tracking-widest text-sm hover:bg-[#96C121] transition-all duration-300 transform hover:-translate-y-1">
            Explorar Kits Modulares
          </Link>
        </div>
      </div>
    </main>
  );
}
