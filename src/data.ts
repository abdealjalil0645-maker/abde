import { Room, Amenity, Review } from './types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHDZ8f2ko4-pobOK8z5Wz5b0ydXbkOb2FjAnlydaVfQ2lLGcoGUUygCOrnwATmYIIuyDbIb5BykxH4zY2jKcIQb3V8kBHLsSeQwwwdpQdZ_nDlc_SLK9Tb91hDYU8b1nKGr3WwH6A=w1200-h800-p-k-no';
export const ROOM_IMAGE_MAIN = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFk7BLbGDWRhfA5tX8_zTEHA9eM5gdqw7WF6Sd8h-EdESjF0mv75CNQuq87P67nrqWuUuEc1Ie5jIDYb_gfiqzDqTNVhMQsuX08TFSktFBLAeTsTHCTbwsTktZh4mN72A5NR-oORw=w1000-h800-p-k-no';

// real high quality images of the actual location from the user
export const CLASSIC_ROOM_IMAGE = ROOM_IMAGE_MAIN;
export const SUPERIOR_SUITE_IMAGE = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpQW04eTeSKju0XSGEh2NwvY6gazDK8KZsvLTPldmnbZOs6Ik1KcE15_o4lRuueh1TVB6kcFKAwcIpvEIA3-VoPfuh34LYE2nmZOtP35JG6Lw3voGaaV-Osp1cJwe2RyCU6kNj=w1000-h800-p-k-no';
export const FAMILY_SUITE_IMAGE = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLrZ5flK-WNgduihAeO1xPnVILYZzAF7VCmPQEZC_T_QBTgsRJk4Ux9RrOpH-rLY2wK3T5iBF0HGboB1Ntoa4u19FaNnzAR0eUpJ0u26mv-r25zlP_X7dkJJbfzsT39hkqA2o=w1000-h800-p-k-no';

// additional official photos for the gallery / hero slideshow list
export const MAPS_PHOTOS = [
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHDZ8f2ko4-pobOK8z5Wz5b0ydXbkOb2FjAnlydaVfQ2lLGcoGUUygCOrnwATmYIIuyDbIb5BykxH4zY2jKcIQb3V8kBHLsSeQwwwdpQdZ_nDlc_SLK9Tb91hDYU8b1nKGr3WwH6A=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFkm456fbWVKQE1E8Wv0RVSHfnf7RGHK7t94rmCIsKkYHsInpwplius-kgXoZvy2mf99Y_woO7BP_xGwefn0PTyU66vEsR7wxIAW03vlk5Gcv3HXTm5d2guyYfVoxxwSHN775U=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFk7BLbGDWRhfA5tX8_zTEHA9eM5gdqw7WF6Sd8h-EdESjF0mv75CNQuq87P67nrqWuUuEc1Ie5jIDYb_gfiqzDqTNVhMQsuX08TFSktFBLAeTsTHCTbwsTktZh4mN72A5NR-oORw=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAECv9dSqzLu_bEZooqOGsRPcs91X4LA_dWDclQTwM-AMMojFjM39f2u4I_Xp4KuZJSqKX3M9SZhYO4GqfKJ1ctofITM6g4XgPLQF-tN2wFISBHuvzHdsTPIZTgZM-4_KGNC13Le=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGj7BpyLpu646rCDDn5Jeyk-aa2kQelh31mzYRhDmTFSw0D62DwsnUlBFTekN8L12pRNWLWeYlJSV5VMNm4_o48je4T5F-xjAFJjCQZpxzUbxg8Hwcjt1TAbYxwZvylUhJGL9js=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLrZ5flK-WNgduihAeO1xPnVILYZzAF7VCmPQEZC_T_QBTgsRJk4Ux9RrOpH-rLY2wK3T5iBF0HGboB1Ntoa4u19FaNnzAR0eUpJ0u26mv-r25zlP_X7dkJJbfzsT39hkqA2o=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpQW04eTeSKju0XSGEh2NwvY6gazDK8KZsvLTPldmnbZOs6Ik1KcE15_o4lRuueh1TVB6kcFKAwcIpvEIA3-VoPfuh34LYE2nmZOtP35JG6Lw3voGaaV-Osp1cJwe2RyCU6kNj=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGnlsFYGWJVNF1oV4OiyZI6SOBUqKF9SJfOG8KCjxb8mfULFwi9yvYJSUs0LIJqqNXHEhZF8qnoOp-qGPcFZJ_pg0s8fTyLTXXwhOORFUGFMCs-1cn4sdFHGwUpmaE9fGpwQu0b5w=w1200-h800-p-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHccTzkny1R8CuZdsEmXjrcOQJPZ8ZsT2kp2M421SnTKXofL_GSanZm3HqC31vpLPcYiTHC-Q5Num5awWX7HK4t8SIUdNu7LCUII8QxfWNLS3sIngN-MqOsqW-OGD4WVxGeYLkqTQ=w1200-h800-p-k-no'
];

export const ROOMS: Room[] = [
  {
    id: 'classic-room',
    nameEn: 'Classic Room',
    nameAr: 'الغرفة الكلاسيكية الأنيقة',
    descriptionEn: 'A comfortable room decorated with authentic Moroccan touches. Features twin or king size layout, private bathroom, and direct garden access.',
    descriptionAr: 'غرفة مريحة مزينة بلمسات مغربية أصيلة. تتميز بأسرة مزدوجة أو سرير كبير، وحمام خاص، وإطلالة مباشرة على الحديقة.',
    pricePerNight: 400,
    capacity: 2,
    sizeSqM: 28,
    featuresEn: ['Free High-Speed Wi-Fi', 'En-suite Bathroom', 'Air Conditioning', 'Flat-screen TV', 'Garden View'],
    featuresAr: ['واي فاي مجاني سريع', 'حمام خاص متكامل', 'تكييف هواء ذكي', 'شاشة تلفزيون مسطحة', 'إطلالة على الحديقة'],
    image: CLASSIC_ROOM_IMAGE
  },
  {
    id: 'superior-suite',
    nameEn: 'Superior Moroccan Suite',
    nameAr: 'الجناح المغربي المميز',
    descriptionEn: 'Spacious suite designed with elegant Moroccan architecture, high ceilings, traditional woodwork, and a separate plush seating area.',
    descriptionAr: 'جناح فسيح مصمم على الطراز المعماري المغربي الفاخر، يتميز بأسقف عالية، أعمال خشبية تقليدية، ومنطقة جلوس مستقلة مريحة.',
    pricePerNight: 650,
    capacity: 3,
    sizeSqM: 45,
    featuresEn: ['Plush Seating Area', 'Premium Bedding', 'Traditional Tea Station', 'Air Conditioning', 'Valuable Safe Box'],
    featuresAr: ['صالة جلوس مغربية مريحة', 'أغطية أسرّة فاخرة كلاسيكية', 'جلسة شاي مغربي متكاملة', 'تكييف هواء فائق السرعة', 'خزنة ممتلكات رقمية آمنة'],
    image: SUPERIOR_SUITE_IMAGE
  },
  {
    id: 'family-suite',
    nameEn: 'Grand Family Villa Suite',
    nameAr: 'الجناح العائلي الملكي الكبير',
    descriptionEn: 'An expansive modern suite featuring two separate bedrooms, a traditional living room, and high-quality premium amenities ideal for families.',
    descriptionAr: 'جناح حديث واسع يضم غرفتي نوم منفصلتين، وصالة معيشة مغربية تقليدية، ومرافق ممتازة عالية الجودة مثالية للعائلات والوفود.',
    pricePerNight: 950,
    capacity: 5,
    sizeSqM: 70,
    featuresEn: ['Two Bedrooms', 'Spacious Living Room', 'Mini-Fridge & Pantry', 'Direct Terrace View', 'Extra Wide Parking Entry'],
    featuresAr: ['غرفتا نوم منفصلتان', 'صالة معيشة مغربية فسيحة', 'ثلاجة صغيرة وركن تحضير', 'إطلالة مباشرة على التراس والحديقة', 'مدخل مرآب عريض وسهل'],
    image: FAMILY_SUITE_IMAGE
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: 'conference',
    titleEn: 'Conference Hall',
    titleAr: 'قاعة مؤتمرات متطورة',
    descriptionEn: 'Fully equipped hall with high-end audio, visual displays, and climate control for business meetings, conferences, and workshops.',
    descriptionAr: 'قاعة مجهزة بالكامل بأحدث أنظمة الصوت والعرض والتحكم بالمناخ، مثالية للاجتماعات وورش العمل والندوات.',
    iconName: 'Presentation'
  },
  {
    id: 'ballroom',
    titleEn: 'Grand Ballroom',
    titleAr: 'قاعة احتفالات فخمة',
    descriptionEn: 'An elegant venue ideal for Moroccan weddings, family reunions, banquets, and grand community events.',
    descriptionAr: 'مكان فخم لإقامة المناسبات السعيدة والأعراس المغربية والولائم والاحتفالات الاجتماعية الكبرى.',
    iconName: 'Award'
  },
  {
    id: 'tours',
    titleEn: 'Tour Desk',
    titleAr: 'مكتب تنظيم الجولات السياحية',
    descriptionEn: 'Get assistances in booking unforgettable excursions around Chichaoua, local cultural sights, and the nearby High Atlas region.',
    descriptionAr: 'احصل على المساعدة في حجز رحلات سياحية ونزهات لا تُنسى في شيشاوة والحديقة الطبيعية ومناطق الأطلس الجذابة.',
    iconName: 'Compass'
  },
  {
    id: 'garden',
    titleEn: 'Relaxing Garden',
    titleAr: 'الحديقة والمنتزه الاسترخائي',
    descriptionEn: 'Lush open-air landscaped gardens offering a serene space to unwind, appreciate flowers, and enjoy traditional mint tea under Morocco’s skies.',
    descriptionAr: 'حدائق خضراء منسقة في الهواء الطلق تمنحك حيزاً مناسباً للاسترخاء، وتناول الشاي المغربي المنعش تحت أشعة الشمس الدافئة.',
    iconName: 'Leaf'
  },
  {
    id: 'wifi',
    titleEn: 'Free High-speed Wi-Fi',
    titleAr: 'واي فاي مجاني فائق السرعة',
    descriptionEn: 'Stay connected effortlessly with complimentary high-speed wireless internet access available across the entire complex.',
    descriptionAr: 'ابق على اتصال دائم مع شبكة الإنترنت اللاسلكي عالية السرعة المتوفرة مجاناً في جميع أركان وغرف المجمع.',
    iconName: 'Wifi'
  },
  {
    id: 'parking',
    titleEn: 'Free Indoor Parking',
    titleAr: 'مرآب سيارات مغطى ومجاني',
    descriptionEn: 'Rest assured with absolute security for your vehicle in our private, spacious, and free indoor garage with 24/7 access.',
    descriptionAr: 'استمتع براحة بال كاملة بفضل مرآب سيارات داخلي خاص ومغطى ومجاني، آمن بالكامل على مدار الساعة لجميع ضيوفنا.',
    iconName: 'Car'
  },
  {
    id: 'smoking',
    titleEn: 'Dedicated Smoking Area',
    titleAr: 'منطقة مخصصة للمدخنين',
    descriptionEn: 'A comfortable, well-ventilated, and clearly designated zone offering convenience to guests while ensuring a clean atmosphere elsewhere.',
    descriptionAr: 'منطقة مريحة وجيدة التهوية تضمن راحة الضيوف والمدخنين مع الحفاظ على الأجواء النقية والصحية في باقي أرجاء الفندق ولقوافل السياح.',
    iconName: 'Flame'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'عبد الحميد العلمي',
    rating: 5,
    comment: 'مجمع سياحي تبارك الله رائع وطاقم الاستقبال في غاية اللطف والمعاملة طيبة جداً. الحديقة واسعة والغرف نظيفة ومريحة وسعرها جد مناسب لمدينة شيشاوة. نوصي بزيارته بشدة.',
    date: '2026-05-18'
  },
  {
    id: 'rev-2',
    author: 'Sarah Jenkins',
    rating: 4,
    comment: 'A lovely traditional complex with peaceful gardens and highly attentive staff. Great spot to stop and recharge on the way from Marrakech to Essaouira. Free Wi-Fi and parking were excellent.',
    date: '2026-04-22'
  },
  {
    id: 'rev-3',
    author: 'يوسف تاجر',
    rating: 4,
    comment: 'الموقع ممتاز جداً في مركز شيشاوة والحديقة هادئة للاسترخاء. قاعة المؤتمرات كبيرة جداً ومجهزة بشكل متميز. الخدمة ممتازة والطاقم متعاون.',
    date: '2026-03-05'
  },
  {
    id: 'rev-4',
    author: 'Fatima-Zahra',
    rating: 3,
    comment: 'مجمع هادئ ومريح جداً للأسر والعائلات. مستوى النظافة مقبول والتعامل محترم. الحديقة ممتازة للأطفال ويتوفر مرآب مغطى للسيارات وهو أمر رائع لقاصدي المدينة في الصيف.',
    date: '2026-05-30'
  }
];

export const TRANSLATIONS = {
  en: {
    title: 'Complexe Touristique Abaynou',
    subtitle: 'Chichaoua, Morocco',
    tagline: 'Your Peaceful Moroccan Haven in the Heart of Chichaoua',
    hotelType: 'Tourist Complex & Hotel',
    checkAvailability: 'Check Availability',
    checkIn: 'Check-In Date',
    checkOut: 'Check-Out Date',
    guests: 'Guests',
    selectRoom: 'Select Room',
    selectRoomBtn: 'Select this Room',
    selected: 'Selected',
    availabilitySearch: 'Check Availability & Rates',
    bookNow: 'Book Your Stay',
    pricingCompare: 'Compare Best Available Rates',
    cancelFree: 'Free Cancellation Available',
    contactForRates: 'Direct Bookings & Reservations via 06 66 13 26 85',
    aboutUs: 'About Complexe Touristique',
    aboutText: 'Welcome to Complexe Touristique Abaynou in Chichaoua. Enjoy a wide range of services including a professional conference hall, beautiful ballroom, sprawling gardens, and hospitable reception staff waiting 24/7 to provide exceptional care during your stays, local tours, or professional corporate conferences.',
    overview: 'Overview',
    rooms: 'Our Rooms',
    services: 'Services & Amenities',
    reviews: 'Reviews',
    location: 'Location & Map',
    bookTab: 'Book & Register',
    myBookings: 'My Bookings',
    ratingReviews: '3.9 Star Google Rating (37 Reviews)',
    overallRating: 'Overall Guest Rating',
    readReviews: 'See Customer Reviews',
    writeReview: 'Write a Review',
    yourName: 'Your Name',
    yourRating: 'Your Rating',
    yourComment: 'Your Opinion / Comment',
    submitReview: 'Submit Review',
    addressLabel: 'Address & Coordinates',
    phoneLabel: 'Direct Contact Telephone',
    copyPhone: 'Copy Number',
    openInGoogleMaps: 'Show directions on Google Maps',
    transitLabel: 'Public Transit & Distances',
    transitText: 'Centrally located within Chichaoua town, easily accessible via regional express coaches, taxis, and within a quick highway connection from Marrakech Menara Airport (RAK).',
    bookSummary: 'Booking & Registration Summary',
    nights: 'nights',
    totalPrice: 'Total Price',
    confirmBooking: 'Register & Confirm Booking',
    noBookings: 'You have no registered bookings yet. Check room rates and book above!',
    bookingRegistered: 'Booking successfully registered!',
    bookingCode: 'Booking Code',
    bookingStatus: 'Status',
    bookingCreated: 'Date Registered',
    cancelBooking: 'Cancel Booking',
    backToExplore: 'Back to Exploring Rooms',
    successMsg: 'Thank you! Your stay registration is recorded. We are awaiting your arrive!',
    requiredFields: 'Please fill out all required fields marked with *',
    nationalIdLabel: 'National ID/Passport Number*',
    customerNameLabel: 'Full Guest Name*',
    customerEmailLabel: 'Email Address*',
    customerPhoneLabel: 'WhatsApp / Mobile Number*',
    searchRoomPlaceholder: 'Choose room category...',
    allRooms: 'All Rooms',
    moroccoDirham: 'MAD',
    moroccoDirhamAr: 'د.م.',
    night: 'night',
    adults: 'Adults',
    children: 'Children'
  },
  ar: {
    title: 'مجمع أباينو السياحي',
    subtitle: 'شيشاوة، المغرب',
    tagline: 'ملاذك المغربي الهادئ في قلب مدينة شيشاوة المضيافة',
    hotelType: 'مجمع سياحي وفندق مصنف',
    checkAvailability: 'التحقّق من توفّر الغرف',
    checkIn: 'تاريخ تسجيل الوصول',
    checkOut: 'تاريخ تسجيل المغادرة',
    guests: 'عدد النزلاء والضيوف',
    selectRoom: 'اختر الغرفة المناسبة',
    selectRoomBtn: 'اختر هذه الغرفة',
    selected: 'تم اختيار الغرفة',
    availabilitySearch: 'البحث عن التوفر والأسعار',
    bookNow: 'احجز مكان إقامتك الآن',
    pricingCompare: 'مقارنة الأسعار والعروض',
    cancelFree: 'إمكانية إلغاء الحجز مجاناً',
    contactForRates: 'للتواصل والاستفسار المباشر: 06 66 13 26 85',
    aboutUs: 'لمحة عن المجمع السياحي',
    aboutText: 'يسعد طاقم الموظفين المضياف عند قسم الاستقبال بمساعدتكم لدى وجود أي استفسار. نضع في خدمتكم العديد من التسهيلات المتميزة، مثل قاعة مؤتمرات مجهزة بأحدث الصوتيات، قاعة احتفالات فارهة، ومنطقة خضراء مشمسة وحديقة خلابة للاسترخاء، مع توفير شبكة واي فاي مجانية فائقة السرعة ومرآب سيارات مغطى آمن بالكامل.',
    overview: 'نظرة عامة',
    rooms: 'الغرف والأجنحة',
    services: 'وسائل الراحة والخدمات',
    reviews: 'المراجعات والآراء',
    location: 'الموقع والاتجاهات',
    bookTab: 'الحجز والتحقق',
    myBookings: 'سجل حجوزاتي',
    ratingReviews: 'تقييم 3.9 نجوم على Google (37 تعليق)',
    overallRating: 'التقييم العام للضيوف',
    readReviews: 'تصفح آراء الضيوف الآخرين',
    writeReview: 'إضافة تفاعل أو تقييم',
    yourName: 'اسمك الكريم',
    yourRating: 'تقييمك بالنجوم',
    yourComment: 'رأيك / تعليقك الشخصي',
    submitReview: 'نشر التقييم الآن',
    addressLabel: 'العنوان وإحداثيات الخريطة',
    phoneLabel: 'رقم الهاتف المباشر',
    copyPhone: 'نسخ رقم الهاتف',
    openInGoogleMaps: 'عرض الاتجاهات على خرائط Google',
    transitLabel: 'النقل العام والتنقلات',
    transitText: 'يقع المجمع جغرافياً في مركز شيشاوة، مما يجعله في غاية السهولة للوصول عبر الحافلات السريعة، وسيارات الأجرة الإقليمية، وعلى مقربة من الطريق السيار ومطار مراكش المنارة الدولي.',
    bookSummary: 'ملخص تفاصيل الحجز والتسجيل',
    nights: 'ليالي',
    totalPrice: 'القيمة الإجمالية المقدرة',
    confirmBooking: 'تأكيد وحفظ طلب الحجز النيابي',
    noBookings: 'ليس لديك أي حجوزات مسجلة حالياً. تفقد غرفنا المريحة واحجز الآن!',
    bookingRegistered: 'تم تسجيل وإيداع حجزك بنجاح تام!',
    bookingCode: 'رقم الحجز المرجعي',
    bookingStatus: 'الحالة الحالية',
    bookingCreated: 'تاريخ الإيداع والتسجيل',
    cancelBooking: 'إلغاء حجز الإقامة',
    backToExplore: 'العودة لاستعراض الغرف',
    successMsg: 'شكراً جزيلاً! تفاصيل حجزك تم حفظها على سجلاتنا. يسعدنا استقبالكم في المجمع قريباً!',
    requiredFields: 'يرجى مراجعة وتعبئة جميع الحقول المطلوبة المحددة بنجمة *',
    nationalIdLabel: 'رقم بطاقة الهوية الوطنية أو جواز السفر*',
    customerNameLabel: 'الاسم الكامل للنزيل الرئيسي*',
    customerEmailLabel: 'عنوان البريد الإلكتروني*',
    customerPhoneLabel: 'رقم الواتساب أو الهاتف الجوال*',
    searchRoomPlaceholder: 'اختر فئة الغرفة أولاً...',
    allRooms: 'جميع الغرف المتوفرة',
    moroccoDirham: 'د.م.',
    moroccoDirhamAr: 'د.م.',
    night: 'ليلة',
    adults: 'بالغين',
    children: 'أطفال'
  }
};
