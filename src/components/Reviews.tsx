import { useState, FormEvent } from 'react';
import { Review, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Star, MessageSquarePlus, MessageSquare, Plus, Check } from 'lucide-react';

interface ReviewsProps {
  currentLang: Language;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function Reviews({ currentLang, reviews, onAddReview }: ReviewsProps) {
  const t = TRANSLATIONS[currentLang];
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    onAddReview({ author, rating, comment });
    setAuthor('');
    setRating(5);
    setComment('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="my-8 max-w-7xl mx-auto px-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Rating Breakdown Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-md">
          <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">
            {t.overallRating}
          </h3>

          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <span className="text-5xl font-extrabold text-stone-950 font-mono">3.9</span>
            <div>
              <div className="flex text-amber-500">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
                <Star className="w-5 h-5 fill-amber-500 text-amber-500 opacity-40" />
              </div>
              <span className="text-xs text-stone-500 select-none">
                {t.ratingReviews}
              </span>
            </div>
          </div>

          {/* Rating visual lines */}
          <div className="space-y-2 border-t border-stone-100 pt-4">
            <div className="flex items-center text-xs text-stone-600 gap-2">
              <span className="w-3 font-semibold">5</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '48%' }}></div>
              </div>
              <span className="w-8 text-right font-mono">48%</span>
            </div>
            <div className="flex items-center text-xs text-stone-600 gap-2">
              <span className="w-3 font-semibold">4</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
              <span className="w-8 text-right font-mono">28%</span>
            </div>
            <div className="flex items-center text-xs text-stone-600 gap-2">
              <span className="w-3 font-semibold">3</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <span className="w-8 text-right font-mono">12%</span>
            </div>
            <div className="flex items-center text-xs text-stone-600 gap-2">
              <span className="w-3 font-semibold">2</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '8%' }}></div>
              </div>
              <span className="w-8 text-right font-mono">8%</span>
            </div>
            <div className="flex items-center text-xs text-stone-600 gap-2">
              <span className="w-3 font-semibold">1</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '4%' }}></div>
              </div>
              <span className="w-8 text-right font-mono">4%</span>
            </div>
          </div>
        </div>

        {/* Middle/Main Area: Existing Review Comments Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200/50">
            <h4 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-200/50 pb-3 mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-800" />
                {t.readReviews}
              </span>
              <span className="text-xs bg-white py-1 px-3 rounded-full border text-stone-500">
                {reviews.length} {currentLang === 'ar' ? 'آراء ومراجعات' : 'Verified Reviews'}
              </span>
            </h4>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-stone-100 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm sm:text-base font-serif">
                        {rev.author}
                      </h5>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {rev.date}
                      </span>
                    </div>
                    
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-200 fill-stone-150'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Feedback Insertion Form */}
          <div className="bg-white rounded-3xl p-6 border border-stone-150 shadow-md">
            <h4 className="text-base sm:text-lg font-bold font-serif text-stone-900 mb-4 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-amber-800" />
              {t.writeReview}
            </h4>

            {success && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-pulse">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{currentLang === 'ar' ? 'شكراً! تم نشر التقييم بنجاح وهو قيد التدقيق.' : 'Thank you! Your feedback has been posted successfully.'}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'ar' ? 'مثال: كريم شيشاوي' : 'e.g. Karim Chichaou'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-800 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                    {t.yourRating}
                  </label>
                  <div className="flex space-x-1.5 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setRating(stars)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            stars <= rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
                  {t.yourComment}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={currentLang === 'ar' ? 'اكتب رأيك هنا بكل صراحة وموضوعية...' : 'Write your honest experience here...'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-800 text-xs sm:text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                id="submit-review-btn"
                className="inline-flex items-center justify-center space-x-1.5 rtl:space-x-reverse bg-stone-900 text-white hover:bg-stone-950 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.submitReview}</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
