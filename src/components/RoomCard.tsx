import { Room, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Users, Sparkles, MoveRight, Maximize2 } from 'lucide-react';

interface RoomCardProps {
  key?: string;
  room: Room;
  currentLang: Language;
  onBookRoom: (roomId: string) => void;
  isSelected?: boolean;
}

export default function RoomCard({ room, currentLang, onBookRoom, isSelected = false }: RoomCardProps) {
  const t = TRANSLATIONS[currentLang];
  const title = currentLang === 'ar' ? room.nameAr : room.nameEn;
  const description = currentLang === 'ar' ? room.descriptionAr : room.descriptionEn;
  const features = currentLang === 'ar' ? room.featuresAr : room.featuresEn;

  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col h-full ${
        isSelected 
          ? 'ring-4 ring-amber-800 border-transparent shadow-xl translate-y-[-4px]' 
          : 'border-stone-200 hover:border-amber-700/40 hover:shadow-lg'
      }`}
    >
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={room.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{room.sizeSqM} m²</span>
        </div>
        
        {/* Price tag */}
        <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto bg-amber-900 text-white font-semibold text-sm sm:text-base px-3.5 py-1.5 rounded-xl shadow-md font-mono">
          {room.pricePerNight} {t.moroccoDirham} <span className="text-xs font-light font-sans">/ {t.night}</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-800">
              {title}
            </h4>
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-stone-600 bg-stone-50 border border-stone-200/60 px-2 py-0.5 rounded-md text-xs">
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span>x{room.capacity}</span>
            </div>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
            {description}
          </p>

          {/* Features Checklist */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] sm:text-xs bg-stone-50 text-stone-700 border border-stone-100 rounded-md px-2.5 py-1"
              >
                <Sparkles className="w-3 h-3 text-amber-600 mr-1.5 rtl:ml-1.5 rtl:mr-0 inline" />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => onBookRoom(room.id)}
            className={`w-full py-3 px-4 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer ${
              isSelected
                ? 'bg-amber-900 text-white hover:bg-amber-950'
                : 'bg-stone-100 text-stone-800 hover:bg-amber-800 hover:text-white border border-stone-200'
            }`}
          >
            <span>{isSelected ? t.selected : t.selectRoomBtn}</span>
            <MoveRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
