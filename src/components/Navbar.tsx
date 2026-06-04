import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Globe, Calendar, Phone, MapPin } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalBookings: number;
}

export default function Navbar({
  currentLang,
  onLanguageChange,
  activeTab,
  setActiveTab,
  totalBookings,
}: NavbarProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const menuItems = [
    { id: 'overview', label: t.overview },
    { id: 'rooms', label: t.rooms },
    { id: 'services', label: t.services },
    { id: 'reviews', label: t.reviews },
    { id: 'location', label: t.location },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center gap-1 sm:gap-4">
          
          {/* Logo Branding */}
          <div className="flex-shrink-0 flex flex-col justify-center cursor-pointer min-w-0" onClick={() => setActiveTab('overview')}>
            <h1 className="text-base xs:text-lg sm:text-2xl font-black tracking-tight text-stone-950 font-serif truncate">
              {currentLang === 'ar' ? 'مجمع أباينو' : 'Abaynou'}
            </h1>
            <span className="text-[10px] sm:text-xs text-amber-800 tracking-wider font-bold truncate hidden xs:block">
              {currentLang === 'ar' ? 'شيشاوة ● مجمع سياحي' : 'Chichaoua ● Complex'}
            </span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex space-x-1 items-center rtl:space-x-reverse mx-4">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ${
                    isActive
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-900 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Quick Contact Badge */}
            <a 
              href="tel:0666132685" 
              className="hidden md:flex items-center text-xs bg-amber-50 hover:bg-amber-100/80 text-amber-900 px-3 py-1.5 rounded-full font-mono transition-colors border border-amber-900/10"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0 text-amber-700" />
              06 66 13 26 85
            </a>

            {/* Language Switcher */}
            <button
              id="lang-toggler"
              onClick={() => onLanguageChange(currentLang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              title={currentLang === 'en' ? 'تغيير اللغة إلى العربية' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>
                <span className="hidden xs:inline">{currentLang === 'en' ? 'العربية' : 'English'}</span>
                <span className="xs:hidden font-bold">{currentLang === 'en' ? 'عربي' : 'EN'}</span>
              </span>
            </button>

            {/* Book Now Button */}
            <button
              id="nav-book-btn"
              onClick={() => setActiveTab('book')}
              className={`relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-amber-800 text-white hover:bg-amber-900 transition-all shadow-md hover:shadow-lg font-bold text-xs sm:text-sm cursor-pointer`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>
                <span className="hidden xs:inline">{t.bookTab}</span>
                <span className="xs:hidden font-bold">{currentLang === 'ar' ? 'حجز' : 'Book'}</span>
              </span>
              {totalBookings > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center text-[10px] animate-pulse">
                  {totalBookings}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links - Mobile (Horizontal Scrollable Strip) */}
        <div className="lg:hidden flex overflow-x-auto px-1 pb-3 pt-1.5 gap-1.5 rtl:space-x-reverse scrollbar-none border-t border-stone-100 bg-white select-none">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-mob-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-900 text-white'
                    : 'bg-stone-55 text-stone-700 hover:text-amber-900 border border-stone-200/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            key="bookings-dashboard"
            id="nav-mob-bookings-btn"
            onClick={() => setActiveTab('mybookings')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === 'mybookings'
                ? 'bg-amber-900 text-white'
                : 'bg-stone-55 text-stone-700 hover:text-amber-900 border border-stone-200/50'
            }`}
          >
            {t.myBookings} {totalBookings > 0 ? `(${totalBookings})` : ''}
          </button>
        </div>

      </div>
    </nav>
  );
}
