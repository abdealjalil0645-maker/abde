import { Phone, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FloatingContactProps {
  currentLang: Language;
}

export default function FloatingContact({ currentLang }: FloatingContactProps) {
  const isArabic = currentLang === 'ar';
  
  const googleMapsUrl = 'https://www.google.com/maps/place/Complexe+Touristique+Abaynou/@31.5478262,-8.7583828,17z/data=!3m1!4b1!4m10!3m9!1s0xdae3c94bc4138ff:0xa5437d50ddbe46f3!5m2!4m1!1i2!8m2!3d31.5478262!4d-8.7583828!16s%2Fg%2F11ft03zb7s?entry=ttu';
  const whatsappUrl = 'https://wa.me/212666132685?text=' + encodeURIComponent(
    isArabic 
      ? 'مرحباً مجمع أباينو، أود الاستفسار عن الغرف المتوفرة والأسعار من فضلك.'
      : 'Hello Complexe Abaynou, I would like to inquire about room availability and rates please.'
  );

  return (
    <>
      {/* Mobile Sticky Bottom Bar (Visible on screens smaller than md) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/60 p-3 flex items-center justify-between gap-2.5 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] md:hidden">
        
        {/* Call button */}
        <a
          href="tel:0666132685"
          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-900 text-white font-bold py-3 px-3.5 rounded-2xl text-xs active:bg-amber-950 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isArabic ? 'اتصل بنا' : 'Call Staff'}</span>
        </a>

        {/* WhatsApp button with color styling */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 text-white font-bold py-3 px-3.5 rounded-2xl text-xs active:bg-emerald-700 transition-colors"
        >
          {/* Custom high fidelity WhatsApp logo SVG */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.989-1.874-1.875-4.351-2.906-6.986-2.907-5.435 0-9.863 4.418-9.866 9.862-.001 1.762.478 3.483 1.383 5.01L1.887 21.8l4.76-1.246zM17.521 14.3c-.324-.162-1.917-.946-2.21-.1052-.293-.105-.507-.263-.733-.502-.228-.238-.853-.87-1.472-1.422-.49-.438-.936-.884-1.129-1.062-.193-.178-.041-.267.106-.414.133-.133.293-.344.44-.515.146-.172.195-.287.293-.477.098-.191.049-.359-.024-.505-.073-.146-.664-1.6-.91-2.193-.24-.58-.504-.5-.69-.508-.17-.004-.367-.004-.564-.004-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.077 2.872 1.225 3.07c.149.198 2.118 3.23 5.129 4.532.716.311 1.275.497 1.71.636.72.229 1.375.196 1.892.119.577-.086 1.917-.783 2.185-1.538.269-.754.269-1.402.189-1.538-.08-.137-.294-.2-.618-.362z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* GPS location map link */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-stone-900 text-white font-bold py-3 px-3.5 rounded-2xl text-xs active:bg-stone-950 transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{isArabic ? 'خريطة مجمعنا' : 'Get Route'}</span>
        </a>
      </div>

      {/* Floating Widget Action on Desktop (Bottom side) */}
      <div className="hidden md:flex fixed bottom-6 right-6 lg:right-10 z-30 flex-col gap-3">
        {/* Floating WhatsApp Bubble */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/20 group relative"
          title={isArabic ? 'تواصل معنا على واتساب' : 'Chat on WhatsApp'}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.989-1.874-1.875-4.351-2.906-6.986-2.907-5.435 0-9.863 4.418-9.866 9.862-.001 1.762.478 3.483 1.383 5.01L1.887 21.8l4.76-1.246zM17.521 14.3c-.324-.162-1.917-.946-2.21-.1052-.293-.105-.507-.263-.733-.502-.228-.238-.853-.87-1.472-1.422-.49-.438-.936-.884-1.129-1.062-.193-.178-.041-.267.106-.414.133-.133.293-.344.44-.515.146-.172.195-.287.293-.477.098-.191.049-.359-.024-.505-.073-.146-.664-1.6-.91-2.193-.24-.58-.504-.5-.69-.508-.17-.004-.367-.004-.564-.004-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.077 2.872 1.225 3.07c.149.198 2.118 3.23 5.129 4.532.716.311 1.275.497 1.71.636.72.229 1.375.196 1.892.119.577-.086 1.917-.783 2.185-1.538.269-.754.269-1.402.189-1.538-.08-.137-.294-.2-.618-.362z" />
          </svg>
          
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-250">
            {isArabic ? 'تواصل معنا واتساب مباشر' : 'Quick Chat on WhatsApp'}
          </span>
        </a>

        {/* Floating Google Maps directions */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-900 hover:bg-amber-950 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/20 group relative"
          title={isArabic ? 'موقعنا على خرائط جوجل' : 'Open in Google Maps'}
        >
          <MapPin className="w-6 h-6 text-amber-300" />
          
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-250">
            {isArabic ? 'فتح الاتجاهات بالخرائط' : 'Get GPS Directions'}
          </span>
        </a>
      </div>
    </>
  );
}
