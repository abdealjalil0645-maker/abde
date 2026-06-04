import { useState, useEffect, FormEvent } from 'react';
import { Room, Booking, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Calculator, Calendar, User, Mail, Phone, BookOpen, AlertCircle, Sparkles, CheckCircle2, Send } from 'lucide-react';

interface BookingFormProps {
  currentLang: Language;
  rooms: Room[];
  selectedRoomId: string;
  onRoomSelect: (roomId: string) => void;
  initialCheckIn: string;
  initialCheckOut: string;
  initialGuests: number;
  onBookingComplete: (booking: Booking) => void;
}

export default function BookingForm({
  currentLang,
  rooms,
  selectedRoomId,
  onRoomSelect,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onBookingComplete,
}: BookingFormProps) {
  const t = TRANSLATIONS[currentLang];
  
  // Form fields
  const [roomId, setRoomId] = useState(selectedRoomId || rooms[0]?.id || '');
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [nationalId, setNationalId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState<Booking | null>(null);

  // Sync inputs with parent state updates
  useEffect(() => {
    if (selectedRoomId) setRoomId(selectedRoomId);
  }, [selectedRoomId]);

  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
  }, [initialCheckIn]);

  useEffect(() => {
    if (initialCheckOut) setCheckOut(initialCheckOut);
  }, [initialCheckOut]);

  useEffect(() => {
    if (initialGuests) setGuests(initialGuests);
  }, [initialGuests]);

  const activeRoom = rooms.find((r) => r.id === roomId) || rooms[0];

  // Price calculations
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 0;
  };

  const nights = calculateNights();
  const totalPrice = activeRoom ? activeRoom.pricePerNight * (nights || 1) : 0;

  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ABY-${code}`;
  };

  const getWhatsAppLink = (booking: Booking) => {
    const isArabic = currentLang === 'ar';
    const roomName = isArabic ? booking.roomNameAr : booking.roomNameEn;
    const message = isArabic 
      ? `السلام عليكم، أود تأكيد حجزي في مجمع أباينو السياحي (شيشاوة):\n\n` +
        `• رقم الحجز: *${booking.bookingCode}*\n` +
        `• الاسم الكامل: ${booking.customerName}\n` +
        `• نوع الغرفة: ${roomName}\n` +
        `• تاريخ الوصول: ${booking.checkIn}\n` +
        `• تاريخ المغادرة: ${booking.checkOut}\n` +
        `• عدد الضيوف: ${booking.guests}\n` +
        `• السعر الإجمالي: *${booking.totalPrice} د.م.*\n\n` +
        `يرجى تأكيد الحجز وإفادتي بالخطوات التالية. شكراً لكم!`
      : `Hello, I would like to confirm my booking at Complexe Touristique Abaynou (Chichaoua):\n\n` +
        `• Booking Reference: *${booking.bookingCode}*\n` +
        `• Guest Name: ${booking.customerName}\n` +
        `• Room: ${roomName}\n` +
        `• Check-In: ${booking.checkIn}\n` +
        `• Check-Out: ${booking.checkOut}\n` +
        `• Guests: x${booking.guests}\n` +
        `• Total Price: *${booking.totalPrice} MAD*\n\n` +
        `Please confirm my reservation and advise on the next steps. Thank you!`;
    return `https://wa.me/212666132685?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName || !customerEmail || !customerPhone || !nationalId) {
      setErrorMessage(t.requiredFields);
      return;
    }

    if (nights <= 0) {
      setErrorMessage(
        currentLang === 'ar'
          ? 'يرجى مراجعة تاريخ مغادرتك، الذي يجب أن يكون بعد تاريخ وصولك'
          : 'Please review your dates. Check-out must be after check-in date.'
      );
      return;
    }

    const booking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      bookingCode: generateBookingCode(),
      customerName,
      customerEmail,
      customerPhone: `${customerPhone} (ID: ${nationalId})`,
      roomId: activeRoom.id,
      roomNameEn: activeRoom.nameEn,
      roomNameAr: activeRoom.nameAr,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    onBookingComplete(booking);
    setSuccess(booking);

    // Reset inputs
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setNationalId('');

    // Auto-redirect to WhatsApp
    const waLink = getWhatsAppLink(booking);
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 150);
  };

  if (success) {
    const waLink = getWhatsAppLink(success);
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl max-w-2xl mx-auto text-center animate-fade-in my-8">
        <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black font-serif text-stone-900 mb-2">
          {t.bookingRegistered}
        </h3>
        <p className="text-stone-600 mb-6 text-sm sm:text-base">
          {currentLang === 'ar' 
            ? 'تم حفظ الحجز بنجاح! نقوم الآن بتوجيهكم إلى واتساب لتأكيد الغرفة والموعد.' 
            : 'Booking registered successfully! Redirecting you to WhatsApp to finalize with the hotel receptionist.'}
        </p>

        {/* WhatsApp primary attention call to action card */}
        <div className="mb-6 p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-center space-y-3">
          <p className="text-stone-700 text-xs sm:text-sm font-medium">
            {currentLang === 'ar'
              ? 'إذا لم يتم توجيهك تلقائياً، يرجى النقر على الزر الأخضر أدناه لإرسال تفاصيل الإقامة:'
              : 'If the auto-redirection did not trigger, please click the button below to send details via WhatsApp:'}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-emerald-200/50 hover:scale-[1.01] text-sm animate-pulse cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            <span>
              {currentLang === 'ar' ? 'إرسال الفاتورة عبر واتساب للتأكيد' : 'Send voucher to WhatsApp now'}
            </span>
          </a>
        </div>

        {/* Recipe voucher layout */}
        <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-5 mb-8 text-left rtl:text-right font-mono text-sm space-y-3">
          <div className="flex justify-between border-b border-stone-200/60 pb-2">
            <span className="text-stone-500">{t.bookingCode}:</span>
            <span className="font-bold text-amber-900">{success.bookingCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{currentLang === 'ar' ? 'الاسم الكامل' : 'Guest Name'}:</span>
            <span className="text-stone-800 font-medium">{success.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{currentLang === 'ar' ? 'نوع الإقامة' : 'Room Category'}:</span>
            <span className="text-stone-800 font-medium">
              {currentLang === 'ar' ? success.roomNameAr : success.roomNameEn}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{currentLang === 'ar' ? 'تاريخ الإقامة' : 'Dates'}:</span>
            <span className="text-stone-800 font-medium">
              {success.checkIn} ➔ {success.checkOut}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">{t.guests}:</span>
            <span className="text-stone-800 font-medium">x{success.guests}</span>
          </div>
          <div className="flex justify-between border-t border-stone-200/60 pt-2 font-sans font-bold text-base text-stone-900">
            <span>{t.totalPrice}:</span>
            <span className="text-amber-900">{success.totalPrice} {t.moroccoDirham}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setSuccess(null);
            }}
            className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 px-6 rounded-xl font-semibold transition-colors cursor-pointer text-sm border border-stone-200"
          >
            {currentLang === 'ar' ? 'تسجيل حجز جديد' : 'Register Another Booking'}
          </button>
          
          <a
            href={`tel:0666132685`}
            className="bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-stone-700 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4 text-amber-800" />
            <span>{currentLang === 'ar' ? 'اتصل الموظف لتأكيد الحجز' : 'Call receptionist to confirm'}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 px-1">
      
      {/* Form Interface (Left/Right depending on dir) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-100 shadow-xl orders-last lg:order-first">
        <h3 className="text-xl sm:text-2xl font-black font-serif text-stone-900 border-b border-stone-100 pb-3 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-800" />
          {t.bookNow}
        </h3>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
              {t.selectRoom}
            </label>
            <select
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                onRoomSelect(e.target.value);
              }}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:ring-2 focus:ring-amber-800 focus:outline-hidden text-sm"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {currentLang === 'ar' ? r.nameAr : r.nameEn} ({r.pricePerNight} {t.moroccoDirham}/{t.night})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {t.checkIn}
              </label>
              <input
                type="date"
                min={getTodayString()}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {t.checkOut}
              </label>
              <input
                type="date"
                min={checkIn || getTodayString(1)}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {t.guests}
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm font-medium focus:ring-2 focus:ring-amber-800"
              >
                <option value={1}>1 {currentLang === 'ar' ? 'فرد' : 'Guest'}</option>
                <option value={2}>2 {currentLang === 'ar' ? 'أفراد' : 'Guests'}</option>
                <option value={3}>3 {currentLang === 'ar' ? 'أفراد' : 'Guests'}</option>
                <option value={4}>4 {currentLang === 'ar' ? 'أفراد' : 'Guests'}</option>
                <option value={5}>5 {currentLang === 'ar' ? 'أفراد' : 'Guests'}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {t.nationalIdLabel}
              </label>
              <input
                type="text"
                placeholder={currentLang === 'ar' ? 'مثال: C654321' : 'e.g., C654321'}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800"
                required
              />
            </div>
          </div>

          {/* Guest Personal fields */}
          <div className="border-t border-stone-100 pt-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {t.customerNameLabel}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-3.5 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder={currentLang === 'ar' ? 'عبد الرحمن الكيلاني' : 'John Doe'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800 font-serif"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  {t.customerEmailLabel}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-3.5 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800 font-mono"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  {t.customerPhoneLabel}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-3.5 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    placeholder="e.g. 06 66 13 26 85"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 text-sm focus:ring-2 focus:ring-amber-800 font-mono"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="submit-register-btn"
            className="w-full py-4 text-white font-bold bg-amber-850 hover:bg-amber-950 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer text-base"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{t.confirmBooking}</span>
          </button>
        </form>
      </div>

      {/* Visual Live Breakdown (Right/Left depending on dir) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Room Premium Preview Card */}
        <div className="bg-stone-900 text-stone-100 rounded-3xl overflow-hidden shadow-xl border border-stone-800">
          <div className="relative h-44">
            <img
              src={activeRoom.image}
              alt={activeRoom.nameEn}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent"></div>
            <div className="absolute bottom-3 left-4 rtl:right-4 rtl:left-auto">
              <span className="bg-amber-850 text-white font-semibold text-[10px] sm:text-xs uppercase px-2.5 py-1 rounded-full border border-amber-700/30">
                {t.hotelType}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-xl font-bold font-serif text-white">
                {currentLang === 'ar' ? activeRoom.nameAr : activeRoom.nameEn}
              </h4>
              <p className="text-xs text-stone-400 mt-1 select-none">
                {currentLang === 'ar' ? activeRoom.descriptionAr : activeRoom.descriptionEn}
              </p>
            </div>

            {/* Quick specifications */}
            <div className="grid grid-cols-2 gap-3 text-xs border-y border-stone-800/80 py-3.5">
              <div className="flex flex-col">
                <span className="text-stone-500 font-semibold uppercase">{currentLang === 'ar' ? 'المساحة' : 'Size'}</span>
                <span className="font-semibold text-stone-200 mt-1">{activeRoom.sizeSqM} sq meters</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-500 font-semibold uppercase">{currentLang === 'ar' ? 'الأقصى' : 'Max Capacity'}</span>
                <span className="font-semibold text-stone-200 mt-1">x{activeRoom.capacity} {currentLang === 'ar' ? 'أشخاص' : 'Guests'}</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-sm pt-2">
              <h5 className="font-serif font-semibold text-amber-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                {t.bookSummary}
              </h5>

              <div className="flex justify-between text-stone-400">
                <span>
                  {activeRoom.pricePerNight} {t.moroccoDirham} × {nights || 1} {t.nights}
                </span>
                <span className="font-semibold text-stone-200 font-mono">
                  {activeRoom.pricePerNight * (nights || 1)} {t.moroccoDirham}
                </span>
              </div>

              <div className="flex justify-between text-stone-400">
                <span>{currentLang === 'ar' ? 'رسوم الضيافة والخدمات' : 'Service Charges'}</span>
                <span className="text-emerald-400 font-semibold font-mono">
                  {currentLang === 'ar' ? 'مجاناً' : 'FREE'}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-stone-800 text-base font-bold">
                <span className="text-white">{t.totalPrice}</span>
                <span className="text-amber-400 text-lg font-mono">
                  {totalPrice} {t.moroccoDirham}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Help Badge */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 space-y-3">
          <h4 className="text-amber-900 font-bold font-serif text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-700" />
            {currentLang === 'ar' ? 'مرفق إلغاء حجز مرن' : 'Flexible Hospitality Policy'}
          </h4>
          <p className="text-stone-600 text-xs leading-relaxed">
            {t.cancelFree}. {t.contactForRates}
          </p>
        </div>

      </div>

    </div>
  );
}
