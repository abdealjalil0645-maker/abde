import { AMENITIES, TRANSLATIONS } from '../data';
import { Presentation, Award, Compass, Leaf, Wifi, Car, Flame, LucideIcon } from 'lucide-react';
import { Language } from '../types';

interface AmenitiesProps {
  currentLang: Language;
}

const iconMap: Record<string, LucideIcon> = {
  Presentation: Presentation,
  Award: Award,
  Compass: Compass,
  Leaf: Leaf,
  Wifi: Wifi,
  Car: Car,
  Flame: Flame,
};

export default function Amenities({ currentLang }: AmenitiesProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="my-8 max-w-7xl mx-auto px-1">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mb-2">
          {t.services}
        </h3>
        <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
          {currentLang === 'ar' 
            ? 'نقدم لضيوفنا الكرام باقة متميزة من الخدمات والتجهيزات لضمان إقامة مريحة واجتماعات عمل مثالية ومناسبات لا تُنسى في شيشاوة.'
            : 'Explore the high-end amenities designed to support your work conferences, celebrations, tours, and relaxation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {AMENITIES.map((amenity) => {
          const IconComponent = iconMap[amenity.iconName] || Compass;
          const animTitle = currentLang === 'ar' ? amenity.titleAr : amenity.titleEn;
          const animDesc = currentLang === 'ar' ? amenity.descriptionAr : amenity.descriptionEn;

          return (
            <div
              key={amenity.id}
              className="bg-white rounded-2xl p-5 border border-stone-200/60 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-800 mb-4 border border-amber-100/40">
                  <IconComponent className="w-6 h-6 text-amber-700" />
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-2 font-serif">
                  {animTitle}
                </h4>
                <p className="text-stone-600 text-[11px] sm:text-sm leading-relaxed">
                  {animDesc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
