import { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { MapPin, Phone, ExternalLink, Calendar, Copy, Check, Bus } from 'lucide-react';
import { Language } from '../types';

interface LocationProps {
  currentLang: Language;
}

export default function Location({ currentLang }: LocationProps) {
  const t = TRANSLATIONS[currentLang];
  const [copied, setCopied] = useState(false);

  const googleMapsUrl = 'https://www.google.com/maps/place/Complexe+Touristique+Abaynou/@31.5478262,-8.7583828,17z/data=!3m1!4b1!4m10!3m9!1s0xdae3c94bc4138ff:0xa5437d50ddbe46f3!5m2!4m1!1i2!8m2!3d31.5478262!4d-8.7583828!16s%2Fg%2F11ft03zb7s?entry=ttu';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0666132685');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 max-w-7xl mx-auto px-1 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-md space-y-6 flex-1">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-800 animate-bounce" />
              {t.location}
            </h3>

            {/* Address detail */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                {t.addressLabel}
              </p>
              <p className="text-stone-800 font-bold text-sm sm:text-base font-serif">
                Center, Chichaoua (شيشاوة), G6XR+4J, Morocco
              </p>
            </div>

            {/* Telephone detail */}
            <div className="space-y-3 pt-3 border-t border-stone-50">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                {t.phoneLabel}
              </p>
              <div className="flex items-center justify-between bg-stone-50 border border-stone-200/60 p-3 rounded-2xl">
                <a 
                  href="tel:0666132685" 
                  className="font-mono text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-amber-800" />
                  06 66 13 26 85
                </a>
                
                <button
                  onClick={handleCopyPhone}
                  className="p-2 hover:bg-stone-200/50 rounded-xl transition-all cursor-pointer text-stone-500 hover:text-amber-900"
                  title={t.copyPhone}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Map Launcher */}
            <div className="pt-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                id="maps-direction-btn"
                className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 rtl:space-x-reverse transition-all text-sm shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.openInGoogleMaps}</span>
              </a>
            </div>
          </div>

          {/* Transit Options */}
          <div className="bg-amber-50/40 border border-amber-100 rounded-3xl p-6 space-y-4">
            <h4 className="text-amber-900 font-black font-serif text-sm flex items-center gap-2">
              <Bus className="w-5 h-5 text-amber-800" />
              {t.transitLabel}
            </h4>
            <p className="text-stone-600 text-xs leading-relaxed">
              {t.transitText}
            </p>
          </div>
        </div>

        {/* Right Side: Beautiful mock map visual with precise landmarks */}
        <div className="lg:col-span-7 bg-stone-100 rounded-3xl overflow-hidden relative border border-stone-200 min-h-[380px] flex flex-col justify-between">
          
          {/* Mock Map Canvas (Stylized Minimalist Road network) */}
          <div className="absolute inset-0 bg-[#e4e2de] opacity-100 select-none flex flex-col justify-center items-center p-4 text-center">
            
            {/* Styled roads to make it look extremely high-fidelity! */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* National Route 8 and Local Chichaoua highways */}
              <div className="absolute top-[40%] left-0 w-full h-[32px] bg-white border-y-2 border-stone-300 transform -rotate-12 flex items-center justify-center">
                <span className="text-[9px] text-stone-500 uppercase tracking-widest font-mono font-bold bg-[#e4e2de] px-1 pb-0.5">Route Nationale N8</span>
              </div>
              <div className="absolute left-[30%] top-0 h-full w-[24px] bg-white border-x-2 border-stone-300 transform rotate-12 flex items-center justify-center"></div>
              
              {/* Surrounding landscape tags */}
              <div className="absolute top-[15%] right-[20%] text-[10px] text-emerald-800/80 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-serif">
                {currentLang === 'ar' ? 'الحديقة والمنتزه النباتي أباينو' : 'Abaynou Botanic Orchards'}
              </div>
              <div className="absolute bottom-[20%] left-[10%] text-[10px] text-stone-600 font-bold bg-white/75 border px-2 py-0.5 rounded-md">
                {currentLang === 'ar' ? 'بلدية شيشاوة' : 'Chichaoua Center'}
              </div>
            </div>

            {/* Flashing pin at center */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-amber-600 opacity-60 animate-ping"></div>
                <div className="relative w-12 h-12 bg-amber-900 rounded-full flex items-center justify-center border-2 border-white text-white shadow-xl">
                  <MapPin className="w-5 h-5 fill-amber-300 text-amber-900" />
                </div>
              </div>
              <div className="mt-3 bg-stone-900/90 text-white py-1.5 px-3.5 rounded-xl border border-stone-800 max-w-xs shadow-lg">
                <h5 className="font-bold text-xs font-serif text-amber-400">
                  {currentLang === 'ar' ? 'مجمع أباينو السياحي' : 'Complexe Abaynou'}
                </h5>
                <p className="text-[10px] text-stone-300 font-mono mt-0.5 font-bold">
                  G6XR+4J Chichaoua
                </p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between text-[11px] text-stone-500 font-mono">
              <span>© Google Maps Data</span>
              <span>GPS: 31.5478° N, 8.7583° W</span>
            </div>
          </div>

          {/* Prompt overlay action */}
          <div className="relative z-10 p-6 self-end w-full bg-linear-to-t from-stone-900 via-stone-900/80 to-transparent text-white flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left rtl:text-right">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{currentLang === 'ar' ? 'رحلات سعيدة وآمنة' : 'Safe Journeys'}</span>
              <p className="text-xs text-stone-200 mt-1">
                {currentLang === 'ar' ? 'اضغط لعرض المسار الدقيق عبر خرائط جوجل من موقعك الحالي' : 'Launch official map to navigate from Marrakech, Essaouira, or Agadir.'}
              </p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-800 hover:bg-amber-950 text-white font-semibold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{currentLang === 'ar' ? 'تحديد دقيق للموقع' : 'View Location'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
