import { useState, useEffect, FormEvent } from 'react';
import { MAPS_PHOTOS, TRANSLATIONS } from '../data';
import { Calendar, Users, ArrowRight, ShieldCheck, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  currentLang: Language;
  onSearchAvailability: (searchParams: { checkIn: string; checkOut: string; guests: number }) => void;
}

export default function Hero({ currentLang, onSearchAvailability }: HeroProps) {
  const t = TRANSLATIONS[currentLang];

  const [photoIndex, setPhotoIndex] = useState(0);

  // Auto scroll images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % MAPS_PHOTOS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevPhoto = (e: any) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + MAPS_PHOTOS.length) % MAPS_PHOTOS.length);
  };

  const handleNextPhoto = (e: any) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % MAPS_PHOTOS.length);
  };

  return (
    <div className="relative">
      {/* Immersive Dark Banner Overlay */}
      <div className="relative h-[360px] xs:h-[400px] sm:h-[460px] md:h-[500px] overflow-hidden bg-stone-950">
        {MAPS_PHOTOS.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${t.title} - ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              photoIndex === index ? 'opacity-70 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          />
        ))}
        <div className="absolute inset-y-0 inset-x-0 bg-linear-to-t from-stone-950 via-stone-900/40 to-transparent"></div>

        {/* Slideshow Arrows */}
        <button
          onClick={handlePrevPhoto}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-black/35 hover:bg-black/60 text-white hover:scale-105 transition-all outline-hidden border border-white/10 hidden sm:flex cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextPhoto}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-25 p-2 rounded-full bg-black/35 hover:bg-black/60 text-white hover:scale-105 transition-all outline-hidden border border-white/10 hidden sm:flex cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Thumbnail Dots */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {MAPS_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPhotoIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                photoIndex === idx ? 'bg-amber-500 w-6' : 'bg-white/40 hover:bg-white/60'
              }`}
              title={`View image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto z-10 pointer-events-auto">
          
          {/* Stars visual */}
          <div className="inline-flex items-center space-x-1 rtl:space-x-reverse bg-white/10 backdrop-blur-md py-1.5 px-3 rounded-full mb-4 sm:mb-6 border border-white/20 animate-fade-in">
            <div className="flex text-amber-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
              ))}
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 opacity-60" />
            </div>
            <span className="text-white text-[11px] sm:text-xs font-mono font-bold pl-2 rtl:pr-2 rtl:pl-0 border-l border-white/25 rtl:border-r rtl:border-l-0">
              3.9 ★ (37)
            </span>
          </div>

          <h2 className="text-xl xs:text-3xl sm:text-5xl md:text-6xl font-black font-serif text-white tracking-tight leading-tight max-w-4xl">
            {t.title}
          </h2>
          
          <p className="mt-2.5 sm:mt-4 text-stone-200 text-xs xs:text-sm sm:text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {t.tagline}
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2.5 justify-center text-[10px] sm:text-xs text-stone-300">
            <span className="flex items-center bg-white/5 py-1 px-3 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-emerald-400" />
              {t.cancelFree}
            </span>
            <span className="flex items-center bg-white/5 py-1 px-3 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 rtl:ml-1.5 rtl:mr-0"></span>
              {currentLang === 'ar' ? 'تأكيد الحجز مباشر' : 'Instant Confirmation'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
