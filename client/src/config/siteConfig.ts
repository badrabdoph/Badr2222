/**
 * =====================================================
 * ملف إعدادات الموقع المركزي
 * =====================================================
 */

export const externalPortfolioUrl = "https://badrabdoph.pixells.co";

// =====================================================
// معلومات المصور الأساسية
// =====================================================
export const photographerInfo = {
  name: "Badr Bado",
  brandName: "BADR ABDO PH",
  title: "صديقك بدر",
  taglineAr: "توثيق المشاعر واللحظات الحقيقية",
  descriptionAr:
    "النتيجة اللي بسلمها دايمًا أعلى من المتوقع.",
};

// =====================================================
// معلومات التواصل
// =====================================================
export const contactInfo = {
  phone: "+2 01011511561",
  whatsappNumber: "201011511561",
  email: "Badrabdoph@icloud.com",
  location: "مصر (متاح للسفر للمحافظات)",
};

// =====================================================
// روابط السوشيال ميديا
// =====================================================
export const socialLinks = {
  instagram: "https://www.instagram.com/badr_abdo_ph",
  facebook: "https://www.facebook.com/badrabdophoto",
  tiktok: "https://www.tiktok.com/@badr_abdo_ph?_r=1&_t=ZS-93VLFDPD2cH",
};

// =====================================================
// قائمة التنقل (Navbar)
// =====================================================
export const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الخدمات", href: "/services" },
  { label: "من أنا", href: "/about" },
  { label: "أعمالي", href: externalPortfolioUrl }, // ✅ خارجي
  { label: "تواصل معي", href: "/contact" },
  { label: "الأسئلة الشائعة", href: "/faq" },
];

// =====================================================
// نصوص الهوم - Hero
// =====================================================
export const homeHero = {
  headlineAr: {
    line1Prefix: "مش مجرد",
    highlight: "صور",
    line2: "دي ذكريات متعاشة",
  },
  subTextAr: photographerInfo.descriptionAr,
  primaryCta: "احجز جلستك",
  secondaryCta: "شوف الباقات",
};

// =====================================================
// قسم الخدمات في الهوم (٣ كروت preview)
// =====================================================
type HomeServicePreviewCard = {
  id: string;
  title: string;
  description: string;
  note: string;
  bullets: string[];
  featured: boolean;
  vipLabel?: string;
  badge?: string;
};

export const homeServicesPreview: HomeServicePreviewCard[] = [
  {
    id: "home-service-sessions",
    title: "جلسات تصوير",
    description:
      "كل صورة ليها توقيع خاص",
    note: "مصور يعكس شخصيتك",
    bullets: [
      "عدد غير محدود من الصور",
      "تنظيم ريلز واستوريهات السوشيال ميديا",
      "تصوير حفل الزفاف في القاعة",
      "أولوية تسليم سريع",
      "وقت مفتوح",
    ],
    featured: false,
  },
  {
    id: "home-service-wedding",
    title: "باقات زفاف",
    description:
      "مطبوعات متنوعة وألبومات فاخرة مطبوعة مع فريق مصورين احترافي.",
    note: "",
    bullets: [
      "مطبوعات متنوعة",
      "ألبومات فاخرة مطبوعة",
      "فريق مصورين محترف",
      "تنسيق كامل مع تفاصيل اليوم",
    ],
    featured: false,
  },
  {
    id: "home-service-vip",
    title: "تصوير اليوم الكامل (VIP Plus)",
    description:
      "تجربة أقوى وتغطية أوسع + مفاجآت أثناء الفرح.",
    note: "",
    bullets: [
      "فريق محترف (4–5 مصورين) لتغطية كاملة",
      "تصوير فوتوغرافي غير محدود + وقت مفتوح",
      "برومو سينمائي يلخص اليوم بالكامل",
      "توثيق عفوي بالكاميرا والموبايل",
      "سيشن كاجوال + سيشن أساسي",
      "ترتيب مسبق واهتمام بكل التفاصيل",
    ],
    featured: true,
    vipLabel: "VIP PLUS",
  },
];

// =====================================================
// صور الموقع
// =====================================================
export const siteImages = {
  heroImage: "/images/opt/hero-1.jpg",
  heroImageMobile: "/images/opt/hero-1-mobile.jpg",
  heroImage2: "/images/opt/hero-2.jpg",
  aboutImage: "/images/opt/portrait-1.jpg",

  portfolioPreview: [
    { src: "/images/opt/wedding-1.jpg", title: "لحظات الزفاف" },
    { src: "/images/opt/outdoor-1.jpg", title: "جلسات خارجية" },
    { src: "/images/opt/bw-1.jpg", title: "بورتريه كلاسيكي" },
    { src: "/images/opt/golden-1.jpg", title: "ساعة ذهبية" },
    { src: "/images/opt/wedding-2.jpg", title: "تفاصيل دقيقة" },
  ],

  portfolioGallery: [
    { src: "/images/opt/wedding-1.jpg", category: "wedding", title: "لحظة الزفاف" },
    { src: "/images/opt/wedding-2.jpg", category: "wedding", title: "تفاصيل الفرح" },
    { src: "/images/opt/outdoor-1.jpg", category: "outdoor", title: "جلسة خارجية" },
    { src: "/images/opt/bw-1.jpg", category: "portrait", title: "بورتريه أبيض وأسود" },
    { src: "/images/opt/golden-1.jpg", category: "outdoor", title: "الساعة الذهبية" },
    { src: "/images/opt/portrait-1.jpg", category: "portrait", title: "بورتريه فني" },
    { src: "/images/opt/hero-1.jpg", category: "wedding", title: "لحظة رومانسية" },
    { src: "/images/opt/hero-2.jpg", category: "outdoor", title: "جلسة مميزة" },
  ],
};

// =====================================================
// About
// =====================================================
export const aboutContent = {
  title: "BADR ABDO PH",
  subtitle: "من أنا",
  description: `‏My name is Badr Abdo, I am 26 years old and I hold a bachelor’s degree from Al-Azhar University. I chose to work as a photographer because I believe in doing what I truly love.`,

  fullStory: `‏Photography is something I truly love, and I see it as more than just a job — it’s a real passion and something I genuinely enjoy. What I love most is portrait photography, because I enjoy capturing people’s personalities and emotions, not just their appearance.
‏I also really enjoy photographing parties, weddings, and spontaneous moments, as these moments are natural, honest, and full of real emotions. I always focus on capturing the small details and genuine feelings in a simple yet artistic way.
‏My goal is for every photo to tell a story and become a beautiful memory that lasts for years, especially during important occasions and VIP events‏  philosophy.`,

  philosophy:
    "أجمل صورة هي اللي بتطلع لوحدها، من غير تصنّع، لما الإحساس يكون صادق والضحكة حقيقية .",

  stats: [
    { number: "+1750", label: "عميل" },
    { number: "+7", label: "سنوات خبرة" },
    { number: "+2500", label: "جلسة" },
  ],
};

// =====================================================
// Testimonials
// =====================================================
export const testimonials = [
  {
    quote:
      "بجد احلي فوتوغرافر اتعاملنا معاه في خطوبتنا والصور مشاء الله طالعه احلي مما كنا عايزين كمان وانشاء الله مش اخر تعامل ♥️",
    name: "Mohamed & Heba",
  },
  {
    quote:
      "الصور احنا مش مصدقين حلاوتها بجد ولا الألوان خطيره اكيد مش اخر مره ما بينا انشاء الله ♥️",
    name: "Basent & Abdo",
  },
  {
    quote:
      "صور الفرح مشاء الله جميله اوي اوي عجبت كل صحابنا وأهلنا دا غير البرومو التحفه اللي اتعرض في الفرح كلو انبهر بيه ♥️",
    name: "Norhan & Hossam",
  },
  {
    quote: "سيشن عيد ميلادي كان خطير بجد متصورتش صور بالحلاوه دي قبل كد تسلم ايدك ❤️",
    name: "Shahd",
  },
];

// =====================================================
// FAQs (أسئلة شائعة)
// =====================================================
export const faqItems = [
  {
    question: "إمتى أحجز؟",
    answer:
      "يفضّل الحجز بدري قدر الإمكان عشان تضمن يومك، خصوصًا في مواسم الزفاف والويك إند.",
  },
  {
    question: "التسليم بياخد وقت قد إيه؟",
    answer:
      "التسليم بيكون مرتب وواضح، وغالبًا خلال الفترة المتفق عليها حسب نوع الباقة.",
  },
  {
    question: "هل في تعديل على الباقات؟",
    answer:
      "أيوه، تقدر تختار إضافات أو تعدّل تفاصيل الباقة حسب احتياجك.",
  },
];

// =====================================================
// Packages + Addons (كما هي)
// =====================================================
export const sessionPackages = [
  {
    id: "session-1",
    name: "سيشن بيزك",
    price: "1500",
    description: "تصوير فقط",
    features: ["عدد غير محدود من الصور", "شامل REELS & TIKTOK", "وقت محدد"],
    popular: false,
  },
  {
    id: "session-2",
    name: "سيشن برو",
    price: "4000",
    description: "سيشن PRO",
    badge: "PRO",
    features: [
      "عدد غير محدود من الصور",
      "MEDIA COVERAGE REELS",
      "تنظيم ريلز واستوريهات السوشيال ميديا",
      "أولوية تسليم سريع",
      "وقت مفتوح",
    ],
    popular: false,
  },
];

export const sessionPackagesWithPrints = [
  {
    id: "special-montage-design",
    name: "خصص باقتك حسب ذوقك واختار اللي يناسبك",
    price: "أنت من تحدد السعر لنفسك",
    description: "",
    features: [],
    popular: false,
  },
];

export const weddingPackages = [
  {
    id: "full-day-vip-plus",
    name: "تصوير اليوم الكامل (VIP Plus)",
    price: "12000",
    priceNote: "قد ينقص السعر او يزيد حسب اختياركم وتفاصيل اليوم ❤️",
    description: "تجربة أقوى وتغطية أوسع + مفاجآت أثناء الفرح",
    features: [
      "فريق محترف (5  مصورين) لتغطية كاملة من التجهيزات حتى آخر لحظة في الفرح",
      "تصوير فوتوغرافي احترافي بعدد غير محدود من الصور ووقت مفتوح",
      "برومو سينمائي يلخص اليوم بالكامل (مشاهد فنية + ترند/كوميدي/رومانسي حسب اختيارك)",
      "توثيق عفوي بالكاميرا والموبايل لأجمل اللحظات والكواليس",
      "MEDIA COVERAGE REELS",
      "سيشن كاجوال + سيشن أساسي",
      "جلسة خاصة لتجهيزات العروسين بكل التفاصيل",
      "اختيار ستايل الإيديت حسب ذوقك",
      "ترتيب مسبق قبل يوم الزفاف والاهتمام الكامل بتفاصيل اليوم",
      "تواجد من الساعة 10 صباحًا حتى نهاية الحفل",
      "أولوية التسليم السريع أو الفوري",
      "مفاجأة اليوم الكبير: عرض البرومو وجزء من الصور على شاشة القاعة أثناء الفرح",
    ],
    popular: true,
    featured: true,
  },
];

export const additionalServices = [
  {
    id: "wedding-party",
    name: "بارتي القاعة",
    price: "1100",
    emoji: "🎉",
    priceNote: "غير شامل رسوم اللوكيشن",
    description: "تغطية حفل الزفاف في القاعة",
    features: [
      "عدد غير محدد من الصور دائماً",
      "صور جماعية مع الأصدقاء والأقارب",
      "توثيق كل لحظة حتى نهاية الحفل",
      "لقطات عفوية تخلد فرحتك",
    ],
    popular: false,
  },
  {
    id: "media-coverage",
    name: "MEDIA COVERAGE",
    price: "1200",
    emoji: "📱",
    description: "تغطية سوشيال ميديا متكاملة",
    features: [
      "توثيق كامل اليوم من كل التفاصيل بشكل سينمائي مختصر",
      "توثيق كامل لليوم بالهاتف",
      "تنظيم ريلز واستوريهات السوشيال ميديا",
    ],
    popular: false,
  },
  {
    id: "promo-video",
    name: "PROMO VIDEO",
    price: "2500",
    emoji: "🎬",
    description: "فيديو ترويجي سينمائي احترافي",
    features: ["مونتاج احترافي", "افكار كريتف", "تسليم سريع"],
  },
];

export const customPrintGroups = [
  {
    id: "albums",
    title: "الألبومات",
    items: [
      { id: "album-economy", label: "ألبوم اقتصادي 20×30 18ل25صور", price: "650ج" },
      { id: "album-classic", label: "ألبوم كلاسيك 25×35 20ل30صور", price: "850ج" },
      { id: "album-panorama", label: "ألبوم بانوراما 30×40 25ل35صوره", price: "1200ج" },
      { id: "album-window", label: "ألبوم شباك 30×80 20ل40صوره", price: "1300ج" },
      { id: "album-vip", label: "ألبوم VIP لارج هاندميد", price: "3500ج" },
    ],
  },
  {
    id: "frames",
    title: "التابلوهات",
    items: [
      { id: "frame-30x40", label: "تابلوه 30×40", price: "150ج" },
      { id: "frame-40x50", label: "تابلوه 40×50", price: "200ج" },
      { id: "frame-50x70", label: "تابلوه 50×70", price: "400ج" },
      { id: "frame-60x90", label: "تابلوه 60×90", price: "750ج" },
    ],
  },
  {
    id: "vip-bags",
    title: "شنط مطبوعات هاندميد",
    items: [
      {
        id: "bag-classic",
        label: "شنطه كلاسك اللبوم+اللبوم مني+ تابلوه 40×50",
        price: "1900ج",
      },
      {
        id: "bag-panorama",
        label: "شنطه بانوراما اللبوم لارج + 2 تابلوه + اكسس + كروت او اللبوم مني",
        price: "2600ج",
      },
      { id: "bag-vip", label: "شنطه VIP ( تفاصيل خاصه )", price: "5000ج" },
    ],
  },
  {
    id: "accessories",
    title: "اكسسوارات",
    items: [
      { id: "mini-album", label: "البوم مني صغير", price: "120ج" },
      { id: "mini-frame", label: "تابلوه او برواز 15×25", price: "60ج" },
      { id: "necklace", label: "سلسله رقبه بصوره", price: "250ج" },
      { id: "small-cards", label: "كروت صغيره 10×15 كل 20 كارت", price: "70ج" },
    ],
  },
];

export const ctaTexts = {
  bookSession: "احجز جلستك",
  viewPortfolio: "شاهد أعمالي",
  contactNow: "تواصل معنا الآن",
  bookNow: "احجز الآن",
  viewDetails: "عرض التفاصيل والأسعار",
  readMore: "اقرأ قصتي",
  sendRequest: "إرسال الطلب",
};

export const pageTexts = {
  contact: {
    title: "لحظاتك تستاهل اهتمام خاص",
    subtitle: "سيب بياناتك أو تواصل معانا مباشرة، وإحنا نهتم بالباقي.",
    formTitle: "احجز موعدك",
    infoTitle: "معلومات الاتصال",
    infoDescription:
      "يمكنكم التواصل معنا عبر الهاتف أو الواتساب، أو متابعتنا على منصات التواصل الاجتماعي لرؤية أحدث أعمالنا.",
  },
  services: {
    title: "اختر باقتك ✨",
    subtitle: "",
    sessionsTitle: "فوتوسيشن",
    weddingTitle: "Full Day",
    addonsTitle: "خدمات إضافية (اختياري)",
  },
  portfolio: {
    title: "معرض الأعمال",
    subtitle: "مجموعة مختارة من أجمل اللحظات التي وثقناها",
    categories: [
      { id: "all", label: "الكل" },
      { id: "wedding", label: "زفاف" },
      { id: "outdoor", label: "جلسات خارجية" },
      { id: "portrait", label: "بورتريه" },
    ],
  },
};
