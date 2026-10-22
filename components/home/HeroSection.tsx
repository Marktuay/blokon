"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const VIDEOS = [
  { id: "rF-uyP2mSKk", title: "Video Introductorio Blok-On 1" },
  { id: "MCTTEprwnS4", title: "Video Introductorio Blok-On 2" }
];

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  const currentVideo = VIDEOS[currentVideoIndex];

  // Mantener referencia al índice actual para usar dentro de callbacks de eventos de YT
  const currentVideoIndexRef = useRef(currentVideoIndex);
  useEffect(() => {
    currentVideoIndexRef.current = currentVideoIndex;
  }, [currentVideoIndex]);

  useEffect(() => {
    if (!showVideo) return;

    const initPlayer = () => {
      if (iframeRef.current && (window as any).YT && (window as any).YT.Player) {
        playerRef.current = new (window as any).YT.Player(iframeRef.current, {
          events: {
            'onStateChange': (event: any) => {
              // 0 = ENDED
              if (event.data === 0) {
                const nextIndex = currentVideoIndexRef.current + 1;
                if (nextIndex < VIDEOS.length) {
                  setCurrentVideoIndex(nextIndex);
                } else {
                  setShowVideo(false);
                }
              }
            }
          }
        });
      }
    };

    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [showVideo, currentVideoIndex]);

  const toggleMute = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
      setIsMuted(!isMuted);
    }
  };

  const skipVideo = () => {
    setShowVideo(false);
  };

  const nextVideo = () => {
    if (currentVideoIndex + 1 < VIDEOS.length) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setShowVideo(false);
    }
  };

  const prevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const playSpecificVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setShowVideo(true);
  };

  return (
    <section className="relative w-full h-[85vh] bg-[#11406C] flex items-center overflow-hidden transition-all duration-1000">
      {showVideo ? (
        // VIDEO STATE
        <div className="absolute inset-0 w-full h-full z-20 bg-black animate-in fade-in duration-1000">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            <iframe
              key={currentVideo.id}
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&enablejsapi=1`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100"
              style={{ border: 'none', width: '100vw', height: '56.25vw', minHeight: '85vh', minWidth: '151.11vh' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={currentVideo.title}
            />
          </div>

          {/* Indicador de Video Actual en Carousel */}
          <div className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              Video {currentVideoIndex + 1} de {VIDEOS.length}
            </span>
            <div className="flex gap-1.5 ml-2">
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentVideoIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentVideoIndex ? 'bg-[#96C121] w-5' : 'bg-white/40 hover:bg-white'}`}
                  title={`Ir al video ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Controles de Navegación Anterior / Siguiente */}
          {currentVideoIndex > 0 && (
            <button
              onClick={prevVideo}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#96C121] text-white hover:text-[#11406C] p-3 rounded-full backdrop-blur-sm transition-all border border-white/20 cursor-pointer shadow-lg group"
              title="Video anterior"
            >
              <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <button
            onClick={nextVideo}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#96C121] text-white hover:text-[#11406C] p-3 rounded-full backdrop-blur-sm transition-all border border-white/20 cursor-pointer shadow-lg group"
            title={currentVideoIndex + 1 < VIDEOS.length ? "Siguiente video" : "Ir al inicio"}
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Mute Button */}
          <button 
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-30 bg-[#11406C]/80 hover:bg-[#96C121] text-white hover:text-[#11406C] p-3 rounded-full backdrop-blur-sm transition-colors border border-white/20 shadow-lg flex items-center justify-center cursor-pointer"
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
            title={isMuted ? "Activar sonido" : "Silenciar sonido"}
          >
            {isMuted ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.82L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.82L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Skip Button */}
          <button 
            onClick={skipVideo}
            className="absolute bottom-6 left-6 z-30 bg-black/50 hover:bg-white text-white hover:text-black px-4 py-2 rounded-full backdrop-blur-sm transition-colors border border-white/20 shadow-lg text-sm font-semibold uppercase tracking-wider"
          >
            Omitir Intro
          </button>
        </div>
      ) : (
        // NORMAL HERO STATE
        <div className="absolute inset-0 w-full h-full z-10 animate-in fade-in duration-1000">
          {/* Imagen de fondo arquitectónico Blok-On */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('/images/muro/home/1-D.png')] bg-cover bg-center"></div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex items-center">
            <div className="max-w-5xl">
              <h1 className="font-moderniz text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tight leading-[1.05] mb-6">
                El Futuro de la Construccion <br className="hidden md:block" />
                <span className="text-[#96C121]">Comienza Aqui.</span>
              </h1>
              <p className="font-acumin text-base md:text-xl text-white/80 mb-10 max-w-xl">
                Sistemas estructurales inteligentes, diseño vanguardista y kits de viviendas listos para ensamblar. Construye más rápido, más fuerte y con precisión milimétrica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kits" className="bg-[#96C121] text-[#11406C] px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all text-center">
                  Explorar Kits
                </Link>
                <Link href="/proyectos" className="bg-transparent border border-white text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-[#11406C] transition-all text-center">
                  Ver Proyectos
                </Link>
              </div>
            </div>
          </div>

          {/* Replay Video Thumbnails */}
          <div className="absolute bottom-6 right-6 z-30 flex gap-3">
            {VIDEOS.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => playSpecificVideo(idx)}
                className="w-28 sm:w-36 md:w-44 aspect-video rounded-lg overflow-hidden border-2 border-white/30 shadow-2xl group cursor-pointer hover:border-[#96C121] transition-all relative transform hover:-translate-y-1"
                title={`Reproducir ${vid.title}`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-10 flex flex-col items-center justify-center p-1">
                  <div className="bg-[#96C121] text-[#11406C] p-1.5 md:p-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform mb-1">
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-white text-[10px] md:text-xs font-bold tracking-wide uppercase drop-shadow">
                    Video {idx + 1}
                  </span>
                </div>
                <img 
                  src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`} 
                  alt={`Miniatura ${vid.title}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
