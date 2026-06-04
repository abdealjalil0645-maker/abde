import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoomCard from './components/RoomCard';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Amenities from './components/Amenities';
import Reviews from './components/Reviews';
import Location from './components/Location';
import { Room, Booking, Review, Language } from './types';
import { ROOMS, INITIAL_REVIEWS, TRANSLATIONS, HERO_IMAGE, ROOM_IMAGE_MAIN } from './data';
import { Star, ShieldCheck, Compass, Heart, Phone, ArrowUpRight, HelpCircle } from 'lucide-react';
import FloatingContact from './components/FloatingContact';

export default function App() {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic for authenticity
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Storage states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // User pre-selections
  const [selectedRoomId, setSelectedRoomId] = useState<string>('classic-room');
  
  // Fast check-in dates
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };
  const [checkIn, setCheckIn] = useState<string>(getTodayString(2)); // Saturday June 6
  const [checkOut, setCheckOut] = useState<string>(getTodayString(3)); // Sunday June 7
  const [guests, setGuests] = useState<number>(2);

  // Load from local storage
  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('abaynou_bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }

      const storedReviews = localStorage.getItem('abaynou_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        setReviews(INITIAL_REVIEWS);
      }
    } catch (e) {
      console.error('Failed to load local storage data:', e);
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const t = TRANSLATIONS[lang];

  // Callback for quick search from Hero banner
  const handleQuickSearch = (params: { checkIn: string; checkOut: string; guests: number }) => {
    setCheckIn(params.checkIn);
    setCheckOut(params.checkOut);
    setGuests(params.guests);
    setActiveTab('book');
  };

  // Callback to choose room and proceed to book form
  const handleBookRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveTab('book');
  };

  // Adds a reservation to local list
  const handleBookingComplete = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    try {
      localStorage.setItem('abaynou_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write local storage:', e);
    }
  };

  // Cancels a booking
  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    try {
      localStorage.setItem('abaynou_bookings', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write local storage:', e);
    }
  };

  // Injects custom review
  const handleAddReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const freshReview: Review = {
      ...newRev,
      id: `custom-${Math.random().toString(36).substring(2, 9)}`,
      date: new Date().toISOString().split('T')[0],
      isCustom: true,
    };
    const updated = [freshReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('abaynou_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write local storage:', e);
    }
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-stone-50/60 text-stone-900 font-sans selection:bg-amber-900 selection:text-white antialiased pb-16 md:pb-0">
      
      {/* Top Banner Accent */}
      <div className="bg-amber-900 text-stone-100 text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-serif text-center sm:text-left rtl:text-right">
          <p className="w-full text-center sm:text-left rtl:text-right font-medium">
            {lang === 'ar' 
              ? '✦ مرحبا بكم في إقليم شيشاوة المضياف ● إلغاء حجز مجاني ومرن للغاية'
              : '✦ Welcome to Chichaoua ● Fully flexible free cancellations with 24/7 staff reception'}
          </p>
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]">
            <span className="opacity-70">{lang === 'ar' ? 'للتواصل المباشر:' : 'Call Recp:'}</span>
            <a href="tel:0666132685" className="hover:underline font-bold text-amber-300">06 66 13 26 85</a>
          </div>
        </div>
      </div>

      {/* Persistent Elegant Header */}
      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalBookings={bookings.length}
      />

      {/* Conditionally Render Banner only on Primary Overview */}
      {activeTab === 'overview' && (
        <Hero
          currentLang={lang}
          onSearchAvailability={handleQuickSearch}
        />
      )}

      {/* Content wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-300">
        
        {/* OVERVIEW INTRO TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-16 animate-fade-in">
            
            {/* Elegant Welcome Intro Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-amber-800 text-xs sm:text-sm font-bold tracking-widest uppercase block font-serif">
                  {lang === 'ar' ? 'جوهرة شيشاوة السياحية' : 'The Gateway Oasis of Chichaoua'}
                </span>
                
                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-stone-900 tracking-tight leading-tight">
                  {lang === 'ar'
                    ? 'أصالة الضيافة المغربية وراحة المسافر في قلب مجمع أباينو'
                    : 'Comfort, tradition, and warm desert breeze converge at Complexe Abaynou'}
                </h3>
                
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {t.aboutText}
                </p>

                {/* Local highlight blocks */}
                <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono">
                  <div className="bg-white p-3 border border-stone-200/50 rounded-xl">
                    <span className="text-amber-900 font-bold block text-base">37</span>
                    <span className="text-stone-500 font-sans block mt-1">{lang === 'ar' ? 'تعليقات حصرية' : 'Google Reviews'}</span>
                  </div>
                  <div className="bg-white p-3 border border-stone-200/50 rounded-xl">
                    <span className="text-amber-900 font-bold block text-base">3.9 ★</span>
                    <span className="text-stone-500 font-sans block mt-1">{lang === 'ar' ? 'التقييم الأصلي' : 'Overall rating'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('rooms')}
                    id="intro-view-rooms-btn"
                    className="bg-amber-850 hover:bg-amber-950 text-white font-semibold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? 'استكشف غرف المجمع والأسعار' : 'Browse Rooms & Special Offers'}
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    id="intro-view-services-btn"
                    className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-semibold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all"
                  >
                    {t.services}
                  </button>
                </div>
              </div>

              {/* Side image widget with traditional frames */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-4/3 sm:aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-stone-200">
                  <img
                    src={ROOM_IMAGE_MAIN}
                    alt="Interior at Abaynou Complexe"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative absolute badge */}
                <div className="absolute -bottom-4 -left-4 rtl:-left-auto rtl:-right-4 bg-amber-900 text-stone-100 p-4 rounded-2xl shadow-lg border border-amber-850 max-w-[210px] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                    {lang === 'ar' ? 'استراحة وراحة' : 'Comfort Stopover'}
                  </span>
                  <p className="text-[11px] leading-snug font-sans">
                    {lang === 'ar' 
                      ? 'موقع مثالي في مركز شيشاوة للراحة وتناول الشاي والوجبات الخفيفة.' 
                      : 'Centrally located stopover between Marrakech and Essaouira coastline.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Micro grid divider */}
            <div className="border-t border-stone-200/60 pt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                    {lang === 'ar' ? 'أفضل غرفنا وأجنحتنا الفندقية' : 'Featured Rooms & Rates'}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500">
                    {lang === 'ar' ? 'حجوزات مباشرة مع إمكانية الدفع نقداً عند الوصول للمجمع.' : 'Secure reservations with simple cash payment at arrival.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className="text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 mt-2 sm:mt-0"
                >
                  <span>{lang === 'ar' ? 'تصفح جميع الغرف' : 'View all rooms'}</span>
                  <ArrowUpRight className="w-4 h-4 rtl:scale-x-[-1]" />
                </button>
              </div>

              {/* Featured rooms grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ROOMS.slice(0, 3).map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    currentLang={lang}
                    onBookRoom={handleBookRoom}
                    isSelected={selectedRoomId === room.id}
                  />
                ))}
              </div>
            </div>

            {/* Quick Summary of Map Location in Overview */}
            <div className="border-t border-stone-200/60 pt-12 space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                  {t.location}
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  {lang === 'ar' ? 'يسهل العثور على مجمعنا على الطريق الإقليمية بشيشاوة.' : 'Easily search or navigate directly to our complex on the main Chichaoua route.'}
                </p>
              </div>
              <Location currentLang={lang} />
            </div>

          </div>
        )}

        {/* ROOMS AND RATES VIEW */}
        {activeTab === 'rooms' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mb-2">
                {t.rooms}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'ar'
                  ? 'اختر الفئة التي تلائم رغباتك، وقم بالتسجيل فوراً لتوفير مكان إقامتك ووفدك وعائلتك الكريمة.'
                  : 'Choose the room type matching your requirements. Enjoy high equipment standards, air conditioning, and garden layouts.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
              {ROOMS.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  currentLang={lang}
                  onBookRoom={handleBookRoom}
                  isSelected={selectedRoomId === room.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* SERVICES AND AMENITIES VIEW */}
        {activeTab === 'services' && (
          <div className="animate-fade-in">
            <Amenities currentLang={lang} />
          </div>
        )}

        {/* REVIEWS VIEW */}
        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            <Reviews
              currentLang={lang}
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          </div>
        )}

        {/* DIRECTIONS AND LOCATION VIEW */}
        {activeTab === 'location' && (
          <div className="animate-fade-in">
            <Location currentLang={lang} />
          </div>
        )}

        {/* REGISTER AND BOOKING FORM TAB */}
        {activeTab === 'book' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center max-w-2xl mx-auto border-b border-stone-200/55 pb-4">
              <span className="text-amber-800 text-xs font-bold uppercase select-none">{t.bookingCompare}</span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mt-1">
                {t.bookNow}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
                {lang === 'ar'
                  ? 'سجل معلومات حجز غرفتك الكلاسيكية أو جناحك الفاخر ليقوم فريق الاستقبال بمجمع أباينو السياحي بتأكيد وحجز غرفتك فوراً.'
                  : 'Register details for your room or suites so that our hospitality assistants compile your details upon arrival.'}
              </p>
            </div>
            
            <BookingForm
              currentLang={lang}
              rooms={ROOMS}
              selectedRoomId={selectedRoomId}
              onRoomSelect={setSelectedRoomId}
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              initialGuests={guests}
              onBookingComplete={handleBookingComplete}
            />
          </div>
        )}

        {/* MY REGISTERED BOOKINGS TAB */}
        {activeTab === 'mybookings' && (
          <div className="animate-fade-in">
            <MyBookings
              currentLang={lang}
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

      </main>

      {/* Elegant Aesthetic Footer */}
      <footer className="border-t border-stone-200 bg-white/80 py-12 text-stone-600 mt-16 font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div className="space-y-3">
            <h4 className="text-lg font-bold font-serif text-stone-950">
              {lang === 'ar' ? 'مجمع أباينو السياحي' : 'Complexe Abaynou'}
            </h4>
            <p className="text-xs leading-relaxed text-stone-500 font-sans">
              {lang === 'ar'
                ? 'مجمع سياحي ترفيهي وفندق في شيشاوة بجهة مراكش آسفي. يتميز بحديقة خلابة للاسترخاء وطاقم معطاء لراحة الزوار.'
                : 'Lush tourist complex, boutique rooms and services in Chichaoua town, Marrakech-Safi region. Known for hospitable staff.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold font-serif tracking-wider text-stone-900 uppercase">
              {lang === 'ar' ? 'الاتصال والمواقع' : 'Direct Contacts'}
            </h4>
            <ul className="text-xs space-y-2 font-mono text-stone-500 font-sans">
              <li className="flex items-center gap-1.5">
                <span className="w-5 text-amber-800 font-bold font-serif">📍</span>
                <span>Center, Chichaoua, Morocco</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-5 text-amber-800 font-bold font-serif">📞</span>
                <a href="tel:0666132685" className="hover:underline">06 66 13 26 85</a>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-5 text-amber-800 font-bold font-serif">⭐</span>
                <span>Google Rating: 3.9 / 5 (37 Reviews)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold font-serif tracking-wider text-stone-900 uppercase">
              {lang === 'ar' ? 'إجراءات ترحيبية مرنة' : 'Hospitality Pledge'}
            </h4>
            <p className="text-xs leading-relaxed text-stone-500">
              {lang === 'ar' 
                ? 'الحجز عبر موقع المجمع غير ملزم تماماً ببطاقات الائتمان؛ نحن نتفهم تغير مخططات السفر. يسعد فندقنا بخدمتكم وتوفير مستلزمات الراحة.' 
                : 'Registration through this portal guarantees room retention without mandatory credit pre-auth. Cancellations are free and seamless.'}
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs select-none">
          <p className="text-stone-400">
            &copy; {new Date().getFullYear()} {t.title}. {lang === 'ar' ? 'جميع الحقوق مكفولة.' : 'All rights reserved.'}
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse text-stone-400 font-mono">
            <button onClick={() => setActiveTab('overview')} className="hover:text-amber-900">{t.overview}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('rooms')} className="hover:text-amber-900">{t.rooms}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('location')} className="hover:text-amber-900">{t.location}</button>
          </div>
        </div>
      </footer>

      {/* Persistent floating utility bar & desktop triggers */}
      <FloatingContact currentLang={lang} />

    </div>
  );
}
