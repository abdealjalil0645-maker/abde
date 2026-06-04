import { Booking, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Calendar, Trash2, Phone, Smile, Compass, MapPin, Send } from 'lucide-react';

interface MyBookingsProps {
  currentLang: Language;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function MyBookings({
  currentLang,
  bookings,
  onCancelBooking,
  setActiveTab,
}: MyBookingsProps) {
  const t = TRANSLATIONS[currentLang];

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

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-100 shadow-xl text-center max-w-2xl mx-auto my-12">
        <div className="mx-auto w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 text-stone-300" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mb-2">
          {currentLang === 'ar' ? 'سجل الحجوزات فارغ' : 'No Bookings Registered'}
        </h3>
        <p className="text-stone-500 mb-8 text-sm">
          {t.noBookings}
        </p>
        <button
          onClick={() => setActiveTab('rooms')}
          className="bg-amber-800 hover:bg-amber-950 text-white font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer text-sm"
        >
          {t.backToExplore}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-6 px-1">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-stone-100 pb-4 mb-6 gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-black font-serif text-stone-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-800" />
            {t.myBookings}
          </h3>
          <p className="text-stone-500 text-xs sm:text-sm">
            {currentLang === 'ar' ? 'قم بإدارة ومراجعة حجوزاتك المسجلة محلياً في مجمع أباينو لشيشاوة' : 'Manage your stay reservations recorded locally on this browser'}
          </p>
        </div>
        <div className="bg-amber-100/60 text-amber-950 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
          {bookings.length} {currentLang === 'ar' ? 'حجوزات مسجلة' : 'Bookings'}
        </div>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-100 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden"
          >
            {/* Corner Status Badge */}
            <div className="absolute top-0 right-0 rtl:left-0 rtl:right-auto bg-emerald-500 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-bl-xl rtl:rounded-br-xl rtl:rounded-bl-none shadow-xs">
              {currentLang === 'ar' ? 'مؤكد جزئياً' : 'Confirmed'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <div>
                  <h4 className="text-lg font-bold font-serif text-stone-900">
                    {currentLang === 'ar' ? booking.roomNameAr : booking.roomNameEn}
                  </h4>
                  <p className="text-xs font-mono text-amber-800 font-bold mt-1">
                    {t.bookingCode}: {booking.bookingCode}
                  </p>
                </div>

                {/* Details list */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-mono">
                  <div>
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{currentLang === 'ar' ? 'النزيل باسم' : 'Guest Name'}</span>
                    <span className="font-semibold text-stone-800">{booking.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{t.checkIn}</span>
                    <span className="font-semibold text-stone-800">{booking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block uppercase font-sans text-[10px]">{t.checkOut}</span>
                    <span className="font-semibold text-stone-800">{booking.checkOut}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1.5">
                  <span className="bg-stone-50 border border-stone-100 rounded-md py-1 px-2.5 text-xs text-stone-600 font-medium">
                    {t.guests}: x{booking.guests}
                  </span>
                  <span className="bg-stone-50 border border-stone-100 rounded-md py-1 px-2.5 text-xs text-stone-600 font-mono font-semibold">
                    {t.totalPrice}: {booking.totalPrice} {t.moroccoDirham}
                  </span>
                </div>
              </div>

              {/* Action columns */}
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5 w-full justify-end sm:items-center md:items-stretch border-t md:border-t-0 border-stone-100 pt-4 md:pt-0">
                <a
                  href={getWhatsAppLink(booking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>{currentLang === 'ar' ? 'تأكيد عبر واتساب' : 'Confirm on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:0666132685`}
                  className="sm:flex-1 md:flex-initial bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold py-2.5 px-4 rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border border-stone-200"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>{currentLang === 'ar' ? 'مهاتفة الاستقبال' : 'Call Receptionist'}</span>
                </a>

                <button
                  onClick={() => {
                    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد من رغبتك في إلغاء حجز الإقامة هذا؟' : 'Are you sure you want to cancel this booking?')) {
                      onCancelBooking(booking.id);
                    }
                  }}
                  className="sm:flex-1 md:flex-initial bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border border-red-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.cancelBooking}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Helpful reminder */}
      <div className="mt-8 p-5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
        <Smile className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-1">
          <p className="font-bold text-amber-900 font-serif">
            {currentLang === 'ar' ? 'خدمة الضيافة في شيشاوة' : 'Hospitality in Chichaoua Center'}
          </p>
          <p>
            {currentLang === 'ar' 
              ? 'مجمع أباينو السياحي يرحب بكم ويبسط لكم خدمات حجز مميزة. بعد التسجيل هنا، يحبذ تزويد موظفي الاستقبال بنسخة من رقم الحجز عبر الهاتف لترتيب غرفتكم وتوفير مستلزمات عطلتكم.'
              : 'Our hospitable team welcomes you. After registering, we recommend presenting the booking code directly to reception desk or calling 06 66 13 26 85 for immediate preparation of your traditional Moroccan experience.'}
          </p>
        </div>
      </div>
    </div>
  );
}
