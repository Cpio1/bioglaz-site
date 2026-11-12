// Находит реальные фото продукта и скан свидетельства в /public и записывает манифест.
// Запускается автоматически перед `npm run dev` и `npm run build`.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, "public");
const first = (list) => {
  for (const rel of list) if (existsSync(join(pub, rel))) return `/${rel}`;
  return null;
};

// Размеры PNG/JPEG/WebP из заголовка файла — чтобы заранее зарезервировать место (без layout shift)
function imageSize(rel) {
  const b = readFileSync(join(pub, rel));
  if (b.toString("ascii", 1, 4) === "PNG") return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  throw new Error(`[media] Не удалось определить размер изображения: ${rel}`);
}

// Главное фото для hero: PNG в приоритете (качество/прозрачность), затем WebP и JPEG
const heroSrc = first(["images/main-page.png", "images/main-page.webp", "images/main-page.jpg", "images/main-page.jpeg"]);
const hero = heroSrc ? { src: heroSrc, ...imageSize(heroSrc.slice(1)) } : null;

const transparent = first(["images/bioglaz-jar-transparent.webp", "images/bioglaz-jar-transparent.png"]);
const regular = transparent
  ? null
  : first(["images/bioglaz-jar.webp", "images/bioglaz-jar.png", "images/bioglaz-jar.jpg", "images/bioglaz-jar.jpeg"]);

const manifest = {
  hero,
  product: transparent ? { src: transparent, transparent: true } : regular ? { src: regular, transparent: false } : null,
  certificate: {
    image: first(["documents/certificate.webp", "documents/certificate.png", "documents/certificate.jpg", "documents/certificate.jpeg"]),
    pdf: first(["documents/certificate.pdf"]),
  },
};

writeFileSync(join(root, "src/content/media.generated.json"), JSON.stringify(manifest, null, 2) + "\n");
const missing = [];
if (!manifest.hero) missing.push("public/images/main-page.png");
if (!manifest.product) missing.push("public/images/bioglaz-jar-transparent.png (или bioglaz-jar.jpg)");
if (!manifest.certificate.image) missing.push("public/documents/certificate.jpg");
console.log(
  missing.length ? `[media] Не найдены файлы: ${missing.join(", ")} — показываются заглушки.` : "[media] Все медиафайлы найдены.",
);
