"use client";

import { useState, useRef } from "react";

export function HeroVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          src="/media/general/BLOKONIN.mp4" 
          autoPlay 
          loop 
          muted={isMuted}
          playsInline 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <button 
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-30 bg-[#11406C]/80 hover:bg-[#96C121] text-white hover:text-[#11406C] p-3 rounded-full backdrop-blur-sm transition-colors border border-white/20 shadow-lg flex items-center justify-center cursor-pointer"
        aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
        title={isMuted ? "Activar sonido" : "Silenciar sonido"}
      >
        {isMuted ? (
          /* Muted Icon */
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.82L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          /* Volume Up Icon */
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.82L5.586 15z" />
          </svg>
        )}
      </button>
    </>
  );
}
