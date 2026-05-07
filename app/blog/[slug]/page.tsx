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
    const { data } = await client.query<any>({
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
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-acumin text-center p-8">
        <p>Error al cargar el artículo: {error}</p>
        <Link href="/blog" className="mt-4 text-[#11406C] underline">Volver al Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-acumin text-center p-8">
        <p>Artículo no encontrado.</p>
        <Link href="/blog" className="mt-4 text-[#11406C] underline block">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="relative w-full h-[70vh] bg-[#11406C] overflow-hidden">
        {post.featuredImage?.node?.sourceUrl ? (
          <Image 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#11406C] to-[#0a253f]" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#11406C] via-[#11406C]/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full pb-20 px-6 md:px-12">
          <div className="container mx-auto max-w-5xl">
            <Link href="/blog" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#96C121] mb-12 hover:translate-x-[-10px] transition-transform">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Volver al Blog
            </Link>

            {post.categories?.nodes?.length > 0 && (
              <span className="block font-tt-drugs text-[#96C121] text-xs font-bold uppercase tracking-[0.3em] mb-6">
                {post.categories.nodes[0].name}
              </span>
            )}
            
            <h1 className="font-moderniz text-3xl md:text-6xl font-bold text-white mb-10 leading-[1.1] uppercase tracking-tight max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4">
                {post.author?.node?.avatar?.url ? (
                  <Image 
                    src={post.author.node.avatar.url} 
                    alt={post.author.node.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full border border-white/20 grayscale"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-bold">
                    {post.author?.node?.name?.charAt(0) || 'A'}
                  </div>
                )}
                <div>
                  <p className="font-moderniz text-xs text-white uppercase tracking-widest">{post.author?.node?.name || 'Admin Blok-On'}</p>
                  <p className="font-acumin text-[10px] text-[#96C121] uppercase tracking-[0.2em] mt-1">
                    {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto px-6 md:px-12 max-w-4xl py-24">
        <div 
          className="prose prose-lg max-w-none text-gray-600
                     prose-headings:font-moderniz prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#11406C]
                     prose-p:font-acumin prose-p:leading-relaxed prose-p:text-lg
                     prose-a:text-[#96C121] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-none prose-img:shadow-2xl
                     prose-strong:text-[#11406C] prose-strong:font-bold
                     prose-blockquote:border-l-[#96C121] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:font-tt-drugs prose-blockquote:italic
                     selection:bg-[#96C121] selection:text-[#11406C]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Footer Call to Action */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <div className="space-y-8">
            <div className="w-16 h-1 bg-[#96C121] mx-auto"></div>
            <h3 className="font-moderniz text-2xl md:text-3xl text-[#11406C] uppercase tracking-tight">¿LISTO PARA CONSTRUIR EL FUTURO?</h3>
            <p className="font-acumin text-gray-500 max-w-xl mx-auto">Nuestros kits modulares ofrecen la solucion perfecta para tu proximo proyecto. Rapido, seguro y eficiente.</p>
            <Link href="/kits" className="inline-block bg-[#11406C] text-white font-bold py-5 px-10 uppercase tracking-[0.2em] text-xs hover:bg-[#96C121] hover:text-[#11406C] transition-all duration-300">
              Explorar Kits Modulares
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
