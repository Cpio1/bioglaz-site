import manifest from "@/content/media.generated.json";

/**
 * Реальные файлы продукта и свидетельства. Манифест создаёт scripts/detect-media.mjs
 * перед dev/build — никаких обращений к файловой системе во время работы сервера.
 * Ожидаемые имена файлов — в public/images/README.md и public/documents/README.md.
 */

export type ProductPhoto = {
  src: string;
  /** true — баночка на прозрачном фоне; false — фото с фоном, показывается в рамке */
  transparent: boolean;
};

/** Главная фотография hero (public/images/main-page.*) с исходными размерами */
export type HeroPhoto = {
  src: string;
  width: number;
  height: number;
};

export type CertificateMedia = {
  image: string | null;
  pdf: string | null;
};

export type SiteMedia = {
  hero: HeroPhoto | null;
  product: ProductPhoto | null;
  certificate: CertificateMedia;
};

export const siteMedia: SiteMedia = manifest as SiteMedia;
