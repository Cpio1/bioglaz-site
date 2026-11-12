/**
 * Плавная прокрутка к разделу. Отступ под фиксированную шапку задаётся
 * через CSS scroll-margin-top у [data-anchor], поэтому заголовок всегда виден.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, "", id === "home" ? window.location.pathname : `#${id}`);
  }
}
