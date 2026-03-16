import {
  aboutContent,
  ctaTexts,
  homeHero,
  homeServicesPreview,
  navLinks,
  pageTexts,
  photographerInfo,
  testimonials as fallbackTestimonials,
} from "@/config/siteConfig";

export type ContentCatalogItem = {
  key: string;
  label: string;
  category: string;
  fallback?: string;
};

type PackageLike = {
  id: string | number;
  name: string;
  price: string;
  description?: string | null;
  features?: string[] | null;
  badge?: string | null;
  priceNote?: string | null;
  featured?: boolean | null;
  popular?: boolean | null;
  category?: string | null;
};

type TestimonialLike = {
  quote: string;
  name: string;
};

type BuildOptions = {
  packages?: PackageLike[];
  testimonials?: TestimonialLike[];
};

type CatalogResult = {
  items: ContentCatalogItem[];
  fallbackMap: Record<string, string>;
};

const homeTestimonialsFallback: TestimonialLike[] = [
  {
    name: "Mohamed & Heba",
    quote:
      "بجد احلي فوتوغرافر اتعاملنا معاه في خطوبتنا والصور مشاء الله طالعه احلي مما كنا عايزين كمان وانشاء الله مش اخر تعامل ♥️",
  },
  {
    name: "Basent & Abdo",
    quote:
      "الصور احنا مش مصدقين حلاوتها بجد ولا الألوان خطيره اكيد مش اخر مره ما بينا انشاء الله ♥️",
  },
  {
    name: "Norhan & Hossam",
    quote:
      "صور الفرح مشاء الله جميله اوي اوي عجبت كل صحابنا وأهلنا دا غير البرومو التحفه اللي اتعرض في الفرح كلو انبهر بيه ♥️",
  },
  {
    name: "Shahd",
    quote: "سيشن عيد ميلادي كان خطير بجد متصورتش صور بالحلاوه دي قبل كد تسلم ايدك ❤️",
  },
];

const heroFallbackText = (() => {
  const h = homeHero?.headlineAr;
  if (h) {
    return `${h.line1Prefix} ${h.highlight}\n${h.line2}`.trim();
  }
  return "مش مجرد صور\nدي ذكريات متعاشة";
})();

const defaultCopyright = (() => {
  const year = new Date().getFullYear();
  const name = photographerInfo.name ?? "";
  return `© ${year} ${name}. All rights reserved.`;
})();

const navMobileFooterFallback = (() => {
  const name = photographerInfo.name ?? "";
  const title = photographerInfo.title ?? "";
  if (name && title) return `${name} • ${title}`;
  return name || title || "";
})();

const brandNameFallback =
  photographerInfo.brandName ?? photographerInfo.name ?? "";

const brandDescFallback =
  photographerInfo.descriptionAr ??
  "تصوير يركز على اللحظة… ويطلعها بأفضل شكل. ستايل سينمائي فاخر واهتمام بالتفاصيل.";

const aboutDescriptionFallback =
  aboutContent.description ||
  photographerInfo.descriptionAr ||
  "تصوير يركز على اللحظة… ويطلعها بأفضل شكل.";

const homeHeroDescriptionFallback =
  homeHero?.subTextAr || photographerInfo.descriptionAr || "";

const isCustomPackage = (pkg: PackageLike) => {
  if (!pkg) return false;
  const id = String(pkg.id ?? "");
  const name = String(pkg.name ?? "").trim();
  const price = String(pkg.price ?? "");
  const category = String(pkg.category ?? "");
  if (id === "special-montage-design") return true;
  if (category === "prints" && /خصص/.test(name)) return true;
  if (category === "prints" && /تحدد|تحدد السعر|أنت من تحدد/.test(price)) return true;
  return false;
};

const guessCategory = (key: string) => {
  if (key.startsWith("home_") || key.startsWith("hero_")) return "home";
  if (key.startsWith("about_")) return "about";
  if (key.startsWith("services_")) return "services";
  if (key.startsWith("contact_")) return "contact";
  if (key.startsWith("portfolio_")) return "portfolio";
  if (key.startsWith("nav_")) return "nav";
  if (key.startsWith("footer_")) return "footer";
  if (key.startsWith("cta_")) return "cta";
  if (key.startsWith("share_")) return "share";
  if (key.startsWith("package_") || key.startsWith("package_help_")) return "services";
  return "shared";
};

export function buildContentCatalog({ packages, testimonials }: BuildOptions = {}): CatalogResult {
  const catalog: Record<string, ContentCatalogItem> = {};
  const fallbackMap: Record<string, string> = {};

  const add = (input: {
    key: string;
    fallback?: string;
    category?: string;
    label?: string;
  }) => {
    const key = input.key?.trim();
    if (!key) return;
    const fallback = input.fallback ?? "";
    const category = input.category ?? guessCategory(key);
    const label = input.label ?? key;
    const existing = catalog[key];
    if (!existing) {
      catalog[key] = { key, label, category, fallback };
    } else {
      catalog[key] = {
        key,
        label: existing.label && existing.label !== existing.key ? existing.label : label,
        category: existing.category || category,
        fallback: existing.fallback ?? fallback,
      };
    }
    if (!(key in fallbackMap) || fallbackMap[key] === "") {
      fallbackMap[key] = fallback;
    }
  };

  // --------------------------------------------
  // Static core texts
  // --------------------------------------------
  add({ key: "nav_brand_primary", fallback: "BADR ABDO", category: "nav" });
  add({ key: "nav_brand_secondary", fallback: "Photography", category: "nav" });
  add({ key: "nav_brand_badge", fallback: "Luxury", category: "nav" });
  add({ key: "nav_mobile_title", fallback: "القائمة", category: "nav" });
  add({ key: "nav_mobile_subtitle", fallback: "اختر صفحة", category: "nav" });
  add({ key: "nav_mobile_footer", fallback: navMobileFooterFallback, category: "nav" });

  add({ key: "cta_book_now", fallback: ctaTexts.bookNow ?? "احجز الآن", category: "cta" });

  add({ key: "footer_badge_text", fallback: "رد سريع • تنظيم مواعيد • تسليم مرتب", category: "footer" });
  add({ key: "footer_cta_title", fallback: "جاهز نبدأ؟ ابعت التفاصيل وهنرتب كل حاجة", category: "footer" });
  add({ key: "footer_cta_primary", fallback: ctaTexts.bookNow ?? "احجز الآن", category: "cta" });
  add({ key: "footer_cta_secondary", fallback: "اعرف الأسعار والباقات المتاحة", category: "cta" });
  add({ key: "footer_brand_name", fallback: brandNameFallback, category: "footer" });
  add({ key: "footer_brand_desc", fallback: brandDescFallback, category: "footer" });
  add({
    key: "footer_brand_line",
    fallback: "حكاية زفافك تستحق لقطة سينمائية — نشتغل بأعلى جودة وتسليم مرتب.",
    category: "footer",
  });
  add({ key: "footer_links_title", fallback: "روابط سريعة", category: "footer" });
  add({ key: "footer_contact_title", fallback: "تواصل", category: "footer" });
  add({ key: "footer_contact_call_label", fallback: "مكالمة", category: "footer" });
  add({ key: "footer_contact_whatsapp_label", fallback: "واتساب", category: "footer" });
  add({ key: "footer_contact_email_label", fallback: "إيميل", category: "footer" });
  add({ key: "footer_contact_location_label", fallback: "الموقع", category: "footer" });
  add({ key: "footer_copyright", fallback: defaultCopyright, category: "footer" });
  add({ key: "footer_built_by", fallback: "Built with a cinematic touch ✨", category: "footer" });

  add({ key: "home_hero_overline", fallback: photographerInfo.title ?? "", category: "home" });
  add({ key: "hero_title", fallback: heroFallbackText, category: "home" });
  add({ key: "hero_description", fallback: homeHeroDescriptionFallback, category: "home" });
  add({ key: "home_follow_title", fallback: "تابعنا", category: "home" });
  add({ key: "home_services_kicker", fallback: "الخدمات", category: "home" });
  add({ key: "home_services_title", fallback: "باقات التصوير", category: "home" });
  add({
    key: "home_services_desc",
    fallback:
      "كلها بتتعمل بنفس الجودة والاهتمام بالتفاصيل لأن التزامي في المواعيد وجودة التسليم جزء من شغلي، مش ميزة إضافية.",
    category: "home",
  });
  add({ key: "home_services_button", fallback: "شوف الباقات", category: "home" });
  add({ key: "home_offer_badge", fallback: "خصم الشهر", category: "home" });
  add({
    key: "home_offer_ticker",
    fallback: "عرض الشهر: خصم خاص + هدايا مطبوعات لفترة محدودة — احجز باقتك الآن.",
    category: "home",
  });
  add({ key: "home_gallery_hint", fallback: "اسحب لمشاهدة المزيد", category: "home" });
  add({ key: "home_portfolio_kicker", fallback: "المعرض", category: "home" });
  add({
    key: "home_portfolio_title",
    fallback: "شوف جزء من تصويري بالكوالتي الكاملة",
    category: "home",
  });
  add({ key: "home_portfolio_button", fallback: "عرض المعرض كامل", category: "home" });
  add({ key: "home_testimonials_kicker", fallback: "آراء العملاء", category: "home" });
  add({ key: "home_testimonials_title", fallback: "عرساني🫶", category: "home" });
  add({
    key: "home_testimonials_desc",
    fallback: "أهم حاجة… الناس تطلع مبسوطة ومرتاحه من أول لحظة لحد التسليم ❤️",
    category: "home",
  });
  add({ key: "faq_kicker", fallback: "FAQs", category: "faq" });
  add({ key: "faq_title", fallback: "الأسئلة الشائعة", category: "faq" });
  add({
    key: "faq_subtitle",
    fallback: "كل إجابة واضحة وسريعة عشان تختار براحة.",
    category: "faq",
  });
  add({
    key: "faq_search_placeholder",
    fallback: "ابحث عن سؤالك هنا...",
    category: "faq",
  });
  add({ key: "faq_social_title", fallback: "تابعنا على السوشيال", category: "faq" });

  add({ key: "about_kicker", fallback: "ستايل سينمائي • تفاصيل • تسليم احترافي", category: "about" });
  add({ key: "about_title", fallback: aboutContent.title || "عن بدر", category: "about" });
  add({ key: "about_description", fallback: aboutDescriptionFallback, category: "about" });
  add({ key: "about_cta_primary", fallback: ctaTexts.bookNow ?? "احجز الآن", category: "about" });
  add({ key: "about_cta_secondary", fallback: "الأسعار والباقات", category: "about" });
  add({ key: "about_subtitle", fallback: aboutContent.subtitle ?? "الستايل", category: "about" });
  add({ key: "about_story_title", fallback: "تصوير يحافظ على الإحساس… قبل الشكل", category: "about" });
  add({
    key: "about_story_description",
    fallback:
      aboutContent.description ||
      "بحب أصوّر اللحظات الطبيعية من غير مبالغة… مع اهتمام بالتفاصيل والإضاءة واللون. الهدف إن الصور تحسّها حقيقية وفخمة في نفس الوقت.",
    category: "about",
  });
  add({ key: "about_portfolio_link", fallback: "شوف المعرض", category: "about" });
  add({ key: "about_work_button", fallback: "شوف الشغل", category: "about" });
  add({ key: "about_features_kicker", fallback: "ليه تختارني؟", category: "about" });
  add({ key: "about_features_title", fallback: "تفاصيل بتفرق", category: "about" });
  add({ key: "about_features_desc", fallback: "نفس الجودة… في كل باقة. ونفس الاهتمام… في كل لقطة.", category: "about" });
  add({ key: "about_feature_1_title", fallback: "إضاءة وستايل سينمائي", category: "about" });
  add({
    key: "about_feature_1_desc",
    fallback: "ألوان متزنة، Skin tones طبيعية، ولمسة فخمة من غير مبالغة.",
    category: "about",
  });
  add({ key: "about_feature_2_title", fallback: "لقطات إحساس مش “بوزات”", category: "about" });
  add({
    key: "about_feature_2_desc",
    fallback: "توجيه بسيط… ولقطات طبيعية حقيقية، عشان اليوم يفضل حي في الصور.",
    category: "about",
  });
  add({ key: "about_feature_3_title", fallback: "تفاصيل وتسليم مرتب", category: "about" });
  add({
    key: "about_feature_3_desc",
    fallback: "تنظيم قبل التصوير، اختيار أفضل لقطات، وتسليم بجودة عالية.",
    category: "about",
  });
  add({ key: "about_testimonials_kicker", fallback: "آراء العملاء", category: "about" });
  add({ key: "about_testimonials_title", fallback: "قصص سعيدة", category: "about" });
  add({ key: "about_cta_title", fallback: "جاهز نثبت يومك بصور تفضل معاك؟", category: "about" });
  add({
    key: "about_cta_desc",
    fallback: "ابعت التفاصيل بسرعة… وهنرتب كل حاجة بشكل مريح وواضح.",
    category: "about",
  });
  add({ key: "about_cta_primary_contact", fallback: ctaTexts.contactNow ?? "تواصل الآن", category: "about" });
  add({ key: "about_cta_secondary_packages", fallback: "شوف الباقات", category: "about" });

  add({ key: "services_kicker", fallback: "كلها بتتعمل بنفس الجودة والاهتمام بالتفاصيل", category: "services" });
  add({ key: "services_title", fallback: pageTexts.services.title ?? "", category: "services" });
  add({ key: "services_subtitle", fallback: pageTexts.services.subtitle ?? "", category: "services" });
  add({ key: "services_sessions_title", fallback: pageTexts.services.sessionsTitle ?? "", category: "services" });
  add({ key: "services_sessions_subtitle", fallback: "تفاصيل تستاهل وقتك", category: "services" });
  add({ key: "services_wedding_title", fallback: pageTexts.services.weddingTitle ?? "", category: "services" });
  add({ key: "services_wedding_subtitle", fallback: "تغطية يوم كامل • فريق • تفاصيل • تسليم سريع", category: "services" });
  add({ key: "services_addons_title", fallback: pageTexts.services.addonsTitle ?? "", category: "services" });
  add({ key: "services_addons_subtitle", fallback: "اختيارات إضافية تزود التجربة جمال", category: "services" });
  add({ key: "services_prints_title", fallback: "المطبوعات", category: "services" });
  add({ key: "services_prints_subtitle", fallback: "اختار العناصر اللي تناسبك واتحسب الإجمالي فوراً", category: "services" });
  add({
    key: "services_custom_prints_note",
    fallback: "المطبوعات ليست اجباري يمكن الاستغناء عنها والحجز بدونها",
    category: "services",
  });
  add({ key: "services_custom_cta", fallback: "احجز الآن", category: "services" });
  add({ key: "services_primary_cta", fallback: ctaTexts.bookNow ?? "احجز الآن", category: "services" });
  add({ key: "services_secondary_cta", fallback: "اسأل عن التفاصيل", category: "services" });
  add({
    key: "services_vip_note",
    fallback: "* تسعير VIP Plus بيتم تحديده حسب تفاصيل اليوم والمكان وعدد ساعات التغطية.",
    category: "services",
  });
  add({
    key: "services_vip_line_1",
    fallback: "- VIP بمجرد حجزك لليوم، مش بيتحجز لغيرك حتى لو سنة.",
    category: "services",
  });
  add({
    key: "services_vip_line_2",
    fallback: "بعد الحجز، تكون الأسعار نهائية كما في إيصال حجزك، بدون أي زيادات أو رسوم إضافية.",
    category: "services",
  });
  add({ key: "services_promo_badge", fallback: "هديّة", category: "services" });
  add({ key: "services_promo_text", fallback: "عند الحجز اسأل عن هديتك", category: "services" });
  add({ key: "services_pro_tag", fallback: "مصور خاص", category: "services" });
  add({ key: "services_media_tag", fallback: "مصور خاص", category: "services" });
  add({ key: "services_pro_note_text", fallback: "MEDIA COVERAGE REELS & TIKTOK", category: "services" });
  add({ key: "services_whatsapp_inquiry_text", fallback: "حابب استفسر ❤️", category: "services" });
  add({ key: "services_monthly_offer_badge", fallback: "خصم 🔥", category: "services" });
  add({ key: "services_monthly_offer_title", fallback: "العرض الحصري", category: "services" });
  add({ key: "services_monthly_offer_subtitle", fallback: "عرض حصري لفترة محدودة فقط", category: "services" });
  add({ key: "services_monthly_offer_price", fallback: "$4500", category: "services" });
  add({ key: "services_monthly_offer_price_label", fallback: "السعر الخاص", category: "services" });
  add({ key: "services_monthly_offer_cta", fallback: "احجز الآن", category: "services" });
  add({ key: "services_monthly_offer_hint", fallback: "اضغط هنا 👇", category: "services" });
  add({ key: "services_monthly_offer_button", fallback: "خصم🔥", category: "services" });
  add({
    key: "services_monthly_offer_feature_1",
    fallback: "ألبوم كبير مقاس 80x30 عدد من 20 ل 40 صورة",
    category: "services",
  });
  add({
    key: "services_monthly_offer_feature_2",
    fallback: "تابلوه أنيميشن كبير 70x50 جودة عالية مع طبقة حماية",
    category: "services",
  });
  add({
    key: "services_monthly_offer_feature_3",
    fallback: "ألبوم آخر مصغر أنيق او كروت صغيرة لصور السيشن",
    category: "services",
  });
  add({
    key: "services_monthly_offer_feature_4",
    fallback: "ساعة حائط كبيرة مصممة بصوركم الخاصة",
    category: "services",
  });
  add({ key: "services_monthly_offer_feature_5", fallback: "REELS & TIKTOK", category: "services" });
  add({ key: "services_monthly_offer_feature_6", fallback: "عدد غير محدود من الصور", category: "services" });
  add({ key: "services_monthly_offer_feature_7", fallback: "وقت مفتوح", category: "services" });
  add({
    key: "services_note_1",
    fallback: "اطمئن التزامي في المواعيد وجودة التسليم جزء من شغلي، مش ميزة إضافية.",
    category: "services",
  });
  add({
    key: "services_note_2",
    fallback: "* الأسعار قد تختلف حسب الموقع والتفاصيل الإضافية. غير شامل رسوم اللوكيشن.",
    category: "services",
  });
  add({
    key: "services_note_3",
    fallback: "حجز اليوم بالأسبقية — Full Day لو اليوم محجوز لعريس تاني قبلك بنعتذر.",
    category: "services",
  });
  add({
    key: "services_note_4",
    fallback: "الحجز يتم بتأكيد على واتساب + ديبوزيت تأكيد.",
    category: "services",
  });
  add({
    key: "services_note_5",
    fallback: "الاستفسار فقط لا يعتبر حجزًا ويتم إلغاؤه تلقائيًا بدون تأكيد.",
    category: "services",
  });
  add({
    key: "services_note_6",
    fallback: "أقدر أساعدك في أي شيء خارج التصوير يوم الزفاف (خدمات ونصائح مجانية).",
    category: "services",
  });
  add({ key: "package_help_kicker", fallback: "اختار اللي يناسبك", category: "services" });
  add({ key: "package_help_title", fallback: "تفاصيل الباقات", category: "services" });
  add({
    key: "package_help_subtitle",
    fallback: "اختر من الخيارات التالية علشان نوصل لأفضل قرار سريع وواضح.",
    category: "services",
  });
  add({ key: "package_help_socials_title", fallback: "تواصل معنا عبر السوشيال", category: "services" });
  add({ key: "package_help_option_1", fallback: "احجز ازاي", category: "services" });
  add({ key: "package_help_option_2", fallback: "عايز استفسر عن حاجه كمان 💁‍♂️", category: "services" });
  add({ key: "package_help_option_3", fallback: "هل اليوم بتاعي هيكون متاح ؟ 🙏", category: "services" });
  add({ key: "package_help_option_4", fallback: "عايز اشوف شكل الالبومات ❤️", category: "services" });

  add({ key: "contact_kicker", fallback: "رد سريع • تنظيم مواعيد • تفاصيل واضحة", category: "contact" });
  add({ key: "contact_title", fallback: pageTexts.contact.title ?? "", category: "contact" });
  add({ key: "contact_subtitle", fallback: pageTexts.contact.subtitle ?? "", category: "contact" });
  add({ key: "contact_quick_whatsapp", fallback: "واتساب", category: "contact" });
  add({ key: "contact_quick_call", fallback: "مكالمة", category: "contact" });
  add({ key: "contact_form_title", fallback: pageTexts.contact.formTitle ?? "", category: "contact" });
  add({ key: "contact_label_name", fallback: "الاسم بالكامل", category: "contact" });
  add({ key: "contact_label_phone", fallback: "رقم الهاتف", category: "contact" });
  add({ key: "contact_label_date", fallback: "تاريخ المناسبة", category: "contact" });
  add({ key: "contact_label_package", fallback: "اختر الباقة", category: "contact" });
  add({ key: "contact_label_addons", fallback: "اختيارات الإضافات (اختياري)", category: "contact" });
  add({ key: "contact_label_prints", fallback: "المطبوعات (اختياري)", category: "contact" });
  add({ key: "contact_label_price", fallback: "الإجمالي", category: "contact" });
  add({ key: "contact_reset_button", fallback: "إلغاء وارجع اختار من تاني", category: "contact" });
  add({ key: "contact_receipt_heading", fallback: "الإيصال", category: "contact" });
  add({ key: "contact_receipt_copy", fallback: "نسخ", category: "contact" });
  add({ key: "contact_submit_button", fallback: "تأكيد الحجز", category: "contact" });
  add({
    key: "contact_submit_helper",
    fallback: "بالضغط على تأكيد الحجز، سيتم فتح واتساب بإيصال جاهز حسب اختياراتك.",
    category: "contact",
  });
  add({ key: "contact_info_title", fallback: pageTexts.contact.infoTitle ?? "", category: "contact" });
  add({ key: "contact_info_desc", fallback: pageTexts.contact.infoDescription ?? "", category: "contact" });
  add({ key: "contact_info_phone_label", fallback: "الهاتف", category: "contact" });
  add({ key: "contact_info_whatsapp_label", fallback: "واتساب", category: "contact" });
  add({ key: "contact_info_email_label", fallback: "البريد الإلكتروني", category: "contact" });
  add({ key: "contact_info_location_label", fallback: "الموقع", category: "contact" });
  add({ key: "contact_follow_title", fallback: "تابعنا على", category: "contact" });
  add({ key: "contact_floating_label", fallback: "واتساب", category: "contact" });
  add({ key: "contact_placeholder_name", fallback: "أدخل اسمك", category: "contact" });
  add({ key: "contact_placeholder_phone", fallback: "01xxxxxxxxx", category: "contact" });
  add({ key: "contact_placeholder_date", fallback: "يوم / شهر / سنة", category: "contact" });
  add({ key: "contact_placeholder_package", fallback: "اختر الباقة المناسبة", category: "contact" });
  add({ key: "contact_placeholder_price", fallback: "سيظهر السعر تلقائياً", category: "contact" });
  add({ key: "contact_addons_empty", fallback: "—", category: "contact" });
  add({ key: "contact_addons_placeholder", fallback: "اختر الإضافات أو اتركها فارغة", category: "contact" });
  add({ key: "contact_prints_empty", fallback: "—", category: "contact" });
  add({ key: "contact_prints_placeholder", fallback: "اختر المطبوعات أو اتركها فارغة كما تشاء", category: "contact" });
  add({ key: "contact_receipt_empty", fallback: "—", category: "contact" });
  add({ key: "contact_receipt_none", fallback: "بدون", category: "contact" });
  add({ key: "contact_receipt_label_name", fallback: "الاسم", category: "contact" });
  add({ key: "contact_receipt_label_phone", fallback: "الهاتف", category: "contact" });
  add({ key: "contact_receipt_label_date", fallback: "التاريخ", category: "contact" });
  add({ key: "contact_receipt_label_package", fallback: "الباقة", category: "contact" });
  add({ key: "contact_receipt_label_addons", fallback: "الإضافات", category: "contact" });
  add({ key: "contact_receipt_label_prints", fallback: "المطبوعات", category: "contact" });
  add({ key: "contact_receipt_label_total", fallback: "الإجمالي", category: "contact" });
  add({ key: "contact_receipt_offer_heading", fallback: "تفاصيل العرض الحصري", category: "contact" });
  add({ key: "contact_receipt_offer_tag", fallback: "عرض", category: "contact" });
  add({ key: "contact_receipt_offer_price_label", fallback: "السعر", category: "contact" });
  add({ key: "contact_receipt_only_suffix", fallback: "فقط", category: "contact" });
  add({ key: "contact_receipt_title", fallback: "إيصال حجز ❤️", category: "contact" });

  add({ key: "portfolio_redirect_title", fallback: "جاري تحويلك للمعرض…", category: "portfolio" });
  add({ key: "portfolio_redirect_desc", fallback: "لو ما تمش التحويل تلقائيًا، اضغط الزر.", category: "portfolio" });
  add({ key: "portfolio_redirect_button", fallback: "فتح المعرض", category: "portfolio" });

  add({ key: "share_expired_badge", fallback: "انتهت صلاحية الرابط", category: "share" });
  add({ key: "share_expired_title", fallback: "الرابط مدته خلصت", category: "share" });
  add({ key: "share_expired_message", fallback: "اطلب رابط جديد من بدر وهيوصلك فورًا.", category: "share" });

  // --------------------------------------------
  // Dynamic content
  // --------------------------------------------
  navLinks.forEach((link, index) => {
    add({
      key: `nav_label_${index + 1}`,
      fallback: link.label,
      category: "nav",
      label: `عنوان القائمة ${index + 1}`,
    });
  });

  homeServicesPreview.forEach((card) => {
    const baseKey = `home_service_${card.id}`;
    add({
      key: `${baseKey}_title`,
      fallback: card.title,
      category: "home",
      label: `عنوان كارت ${card.title}`,
    });
    add({
      key: `${baseKey}_description`,
      fallback: card.description,
      category: "home",
      label: `وصف كارت ${card.title}`,
    });
    if (card.note) {
      add({
        key: `${baseKey}_note`,
        fallback: card.note,
        category: "home",
        label: `ملاحظة كارت ${card.title}`,
      });
    }
    if (card.badge) {
      add({
        key: `${baseKey}_badge`,
        fallback: card.badge,
        category: "home",
        label: `شارة ${card.title}`,
      });
    }
    if (card.vipLabel) {
      add({
        key: `${baseKey}_vip_label`,
        fallback: card.vipLabel,
        category: "home",
        label: `شارة VIP ${card.title}`,
      });
    }
    (card.bullets ?? []).forEach((bullet, index) => {
      add({
        key: `${baseKey}_bullet_${index + 1}`,
        fallback: bullet,
        category: "home",
        label: `نقطة ${index + 1} - ${card.title}`,
      });
    });
    add({
      key: `${baseKey}_cta`,
      fallback: "عرض التفاصيل",
      category: "home",
      label: `زر الكارت ${card.title}`,
    });
  });

  homeTestimonialsFallback.forEach((testimonial, index) => {
    const baseKey = `home_testimonial_${index + 1}`;
    add({
      key: `${baseKey}_quote`,
      fallback: testimonial.quote,
      category: "home",
      label: `نص رأي ${index + 1}`,
    });
    add({
      key: `${baseKey}_name`,
      fallback: testimonial.name,
      category: "home",
      label: `اسم رأي ${index + 1}`,
    });
  });

  (aboutContent.stats ?? []).forEach((stat, index) => {
    add({
      key: `about_stat_${index + 1}_number`,
      fallback: stat.number,
      category: "about",
      label: `رقم الإحصائية ${index + 1}`,
    });
    add({
      key: `about_stat_${index + 1}_label`,
      fallback: stat.label,
      category: "about",
      label: `عنوان الإحصائية ${index + 1}`,
    });
  });

  const testimonialSource = testimonials && testimonials.length ? testimonials : fallbackTestimonials;
  testimonialSource.slice(0, 2).forEach((t, index) => {
    add({
      key: `about_testimonial_${index + 1}_quote`,
      fallback: t.quote,
      category: "about",
      label: `رأي العميل ${index + 1}`,
    });
    add({
      key: `about_testimonial_${index + 1}_name`,
      fallback: t.name,
      category: "about",
      label: `اسم العميل ${index + 1}`,
    });
  });

  (packages ?? []).forEach((pkg) => {
    const baseKey = `package_${pkg.id}`;
    const name = pkg.name ?? "";
    add({
      key: `${baseKey}_name`,
      fallback: name,
      category: "services",
      label: `اسم الباقة ${name}`,
    });
    add({
      key: `${baseKey}_price`,
      fallback: String(pkg.price ?? ""),
      category: "services",
      label: `سعر الباقة ${name}`,
    });
    const descriptionFallback = isCustomPackage(pkg)
      ? "خصص باقتك علي زوقك"
      : String(pkg.description ?? "");
    add({
      key: `${baseKey}_description`,
      fallback: descriptionFallback,
      category: "services",
      label: `وصف الباقة ${name}`,
    });
    if (pkg.priceNote) {
      add({
        key: `${baseKey}_price_note`,
        fallback: String(pkg.priceNote ?? ""),
        category: "services",
        label: `ملاحظة السعر ${name}`,
      });
    }
    if (pkg.badge) {
      add({
        key: `${baseKey}_badge`,
        fallback: String(pkg.badge ?? ""),
        category: "services",
        label: `شارة الباقة ${name}`,
      });
    }
    const isVip = pkg.id === "full-day-vip-plus" || pkg.featured === true || /vip/i.test(name);
    if (isVip) {
      add({
        key: `${baseKey}_vip_label`,
        fallback: "VIP PLUS",
        category: "services",
        label: `شارة VIP - ${name}`,
      });
    }
    add({
      key: `${baseKey}_popular_label`,
      fallback: "الأكثر طلباً",
      category: "services",
      label: `شارة الأكثر طلباً - ${name}`,
    });
    (pkg.features ?? []).forEach((feature, index) => {
      add({
        key: `${baseKey}_feature_${index + 1}`,
        fallback: feature,
        category: "services",
        label: `ميزة ${index + 1} - ${name}`,
      });
    });
  });

  return {
    items: Object.values(catalog),
    fallbackMap,
  };
}
