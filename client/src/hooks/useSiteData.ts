import { useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { parseContentValue } from "@/lib/contentMeta";
import { isExplicitlyVisible } from "@/lib/visibility";
import {
  contactInfo as fallbackContact,
  socialLinks as fallbackSocial,
} from "@/config/siteConfig";

type PackageLike = {
  id: string | number;
  name: string;
  price: string;
  description?: string | null;
  features?: string[] | null;
  category?: string | null;
  popular?: boolean | null;
  featured?: boolean | null;
  emoji?: string | null;
  badge?: string | null;
  priceNote?: string | null;
  visible?: boolean | null;
  sortOrder?: number | null;
  offsetX?: number | null;
  offsetY?: number | null;
};

type SectionLike = {
  key: string;
  name?: string | null;
  page?: string | null;
  visible?: boolean | null;
  sortOrder?: number | null;
};

const defaultHomeSections: SectionLike[] = [
  { key: "hero", name: "القسم الرئيسي (Hero)", page: "home", visible: true, sortOrder: 1 },
  { key: "about_preview", name: "قسم من أنا", page: "home", visible: true, sortOrder: 2 },
  { key: "portfolio_preview", name: "معرض الأعمال", page: "home", visible: true, sortOrder: 3 },
  { key: "services_preview", name: "الخدمات", page: "home", visible: true, sortOrder: 4 },
  { key: "testimonials", name: "آراء العملاء", page: "home", visible: true, sortOrder: 5 },
  { key: "cta", name: "قسم الدعوة للتواصل", page: "home", visible: true, sortOrder: 6 },
];

function normalizePackages(list: PackageLike[]) {
  return list
    .map((pkg) => ({
      id: String(pkg.id),
      name: pkg.name,
      price: pkg.price,
      description: pkg.description ?? "",
      features: Array.isArray(pkg.features) ? pkg.features : [],
      category: pkg.category ?? "session",
      popular: Boolean(pkg.popular),
      featured: Boolean(pkg.featured),
      emoji: pkg.emoji ?? undefined,
      badge: pkg.badge ?? undefined,
      priceNote: pkg.priceNote ?? undefined,
      visible: isExplicitlyVisible(pkg.visible),
      sortOrder: pkg.sortOrder ?? 0,
      offsetX: typeof pkg.offsetX === "number" ? pkg.offsetX : 0,
      offsetY: typeof pkg.offsetY === "number" ? pkg.offsetY : 0,
    }))
    .filter((pkg) => pkg.visible)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function useContactData() {
  const { data, refetch } = trpc.contactInfo.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteContactUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const map = useMemo(() => {
    const out: Record<string, string> = {};
    (data ?? []).forEach((item) => {
      const parsed = parseContentValue(item.value);
      out[item.key] = parsed.hidden ? "" : parsed.text;
    });
    return out;
  }, [data]);

  const contactInfo = {
    phone: map.phone ?? fallbackContact.phone,
    whatsappNumber: map.whatsapp ?? map.whatsappNumber ?? fallbackContact.whatsappNumber,
    email: map.email ?? fallbackContact.email,
    location: map.location ?? fallbackContact.location,
  };

  const socialLinks = {
    instagram: map.instagram ?? fallbackSocial.instagram,
    facebook: map.facebook ?? fallbackSocial.facebook,
    tiktok: map.tiktok ?? fallbackSocial.tiktok,
  };

  return { contactInfo, socialLinks };
}

export function usePackagesData() {
  const { data, refetch } = trpc.packages.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "sitePackagesUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const hasData = Array.isArray(data) && data.length > 0;
  const normalized = normalizePackages((hasData ? data : []) as PackageLike[]);

  const byCategory = {
    session: normalized.filter((p) => p.category === "session"),
    prints: normalized.filter((p) => p.category === "prints"),
    wedding: normalized.filter((p) => p.category === "wedding"),
    addon: normalized.filter((p) => p.category === "addon"),
  };

  return {
    sessionPackages: byCategory.session,
    sessionPackagesWithPrints: byCategory.prints,
    weddingPackages: byCategory.wedding,
    additionalServices: byCategory.addon,
    hasData,
  };
}

export function useTestimonialsData() {
  const { data, refetch } = trpc.testimonials.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteTestimonialsUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const list = useMemo(() => {
    const source = Array.isArray(data) ? data : [];
    return source
      .map((item: any) => ({
        name: item.name,
        quote: item.quote,
        visible: isExplicitlyVisible(item.visible),
        sortOrder: item.sortOrder ?? 0,
        offsetX: typeof item.offsetX === "number" ? item.offsetX : 0,
        offsetY: typeof item.offsetY === "number" ? item.offsetY : 0,
      }))
      .filter((t: any) => t.visible)
      .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [data]);

  return list;
}

export function useFaqData() {
  const { data, refetch } = trpc.faqs.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteFaqUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const list = useMemo(() => {
    const source = Array.isArray(data) ? data : [];
    return source
      .map((item: any, index: number) => ({
        id: item.id ?? index,
        question: item.question,
        answer: item.answer,
        visible: isExplicitlyVisible(item.visible),
        sortOrder: item.sortOrder ?? 0,
      }))
      .filter((t: any) => t.visible)
      .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }, [data]);

  return list;
}

export function usePortfolioData() {
  const { data, refetch } = trpc.portfolio.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "sitePortfolioUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const gallery = useMemo(() => {
    if (data) {
      return data
        .filter((img: any) => isExplicitlyVisible(img.visible))
        .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((img: any) => ({
          id: img.id,
          src: img.url,
          title: img.title,
          category: img.category,
          offsetX: typeof img.offsetX === "number" ? img.offsetX : 0,
          offsetY: typeof img.offsetY === "number" ? img.offsetY : 0,
        }));
    }
    return [];
  }, [data]);

  return { gallery };
}

export function useSectionsData(page = "home") {
  const { data, refetch } = trpc.sections.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteSectionsUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const sections = useMemo(() => {
    const merged = new Map<string, SectionLike>();

    defaultHomeSections
      .filter((section) => (section.page ?? "home") === page)
      .forEach((section) => {
        merged.set(section.key, section);
      });

    (data ?? [])
      .filter((section: any) => (section.page ?? "home") === page)
      .forEach((section: any) => {
        const current = merged.get(section.key);
        merged.set(section.key, {
          ...current,
          ...section,
        });
      });

    return Array.from(merged.values()).sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
  }, [data, page]);

  const visibilityMap = useMemo(
    () =>
      sections.reduce<Record<string, boolean>>((acc, section) => {
        acc[section.key] = isExplicitlyVisible(section.visible);
        return acc;
      }, {}),
    [sections]
  );

  return {
    sections,
    visibilityMap,
    isVisible: (key: string) => visibilityMap[key] ?? true,
  };
}

export function useContentData() {
  const { data, refetch } = trpc.siteContent.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteContentUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const map = useMemo(() => {
    const out: Record<string, string> = {};
    (data ?? []).forEach((item) => {
      const parsed = parseContentValue(item.value);
      out[item.key] = parsed.hidden ? "" : parsed.text;
    });
    return out;
  }, [data]);
  const contentReady = Array.isArray(data) && data.length > 0;

  const positionMap = useMemo(() => {
    const out: Record<string, { offsetX: number; offsetY: number }> = {};
    (data ?? []).forEach((item: any) => {
      out[item.key] = {
        offsetX: typeof item.offsetX === "number" ? item.offsetX : 0,
        offsetY: typeof item.offsetY === "number" ? item.offsetY : 0,
      };
    });
    return out;
  }, [data]);

  return {
    contentMap: map,
    positionMap,
    contentReady,
    heroTitle: contentReady ? map.hero_title ?? "" : "",
    heroSubtitle: contentReady ? map.hero_subtitle ?? "" : "",
    heroDescription: contentReady ? map.hero_description ?? "" : "",
    aboutSubtitle: contentReady ? map.about_subtitle ?? "" : "",
    aboutTitle: contentReady ? map.about_title ?? "" : "",
    aboutDescription: contentReady ? map.about_description ?? "" : "",
    ctaTitle: contentReady ? map.cta_title ?? "" : "",
    ctaDescription: contentReady ? map.cta_description ?? "" : "",
  };
}

export function useSiteImagesData() {
  const { data, refetch } = trpc.siteImages.getAll.useQuery(undefined, {
    staleTime: 60_000,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "siteImagesUpdatedAt") {
        refetch();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refetch]);

  const map = useMemo(() => {
    const out: Record<
      string,
      { url: string; alt?: string | null; offsetX: number; offsetY: number }
    > = {};
    (data ?? []).forEach((item: any) => {
      out[item.key] = {
        url: item.url,
        alt: item.alt,
        offsetX: typeof item.offsetX === "number" ? item.offsetX : 0,
        offsetY: typeof item.offsetY === "number" ? item.offsetY : 0,
      };
    });
    return out;
  }, [data]);

  return { imageMap: map };
}
