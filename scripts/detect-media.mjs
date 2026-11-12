// Находит реальные фото продукта и скан свидетельства в /public и записывает манифест.
// Запускается автоматически перед `npm run dev` и `npm run build`.
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pub = join(root, "public");
const first = (list) => {
  for (const rel of list) if (existsSync(join(pub, rel))) return `/${rel}`;
  return null;
};

const transparent = first(["images/bioglaz-jar-transparent.webp", "images/bioglaz-jar-transparent.png"]);
const regular = transparent
  ? null
  : first(["images/bioglaz-jar.webp", "images/bioglaz-jar.png", "images/bioglaz-jar.jpg", "images/bioglaz-jar.jpeg"]);

const manifest = {
  product: transparent ? { src: transparent, transparent: true } : regular ? { src: regular, transparent: false } : null,
  certificate: {
    image: first(["documents/certificate.webp", "documents/certificate.png", "documents/certificate.jpg", "documents/certificate.jpeg"]),
    pdf: first(["documents/certificate.pdf"]),
  },
};

writeFileSync(join(root, "src/content/media.generated.json"), JSON.stringify(manifest, null, 2) + "\n");
const missing = [];
if (!manifest.product) missing.push("public/images/bioglaz-jar-transparent.png (или bioglaz-jar.jpg)");
if (!manifest.certificate.image) missing.push("public/documents/certificate.jpg");
console.log(
  missing.length ? `[media] Не найдены файлы: ${missing.join(", ")} — показываются заглушки.` : "[media] Все медиафайлы найдены.",
);
