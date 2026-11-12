import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "БИОГЛАЗ — витаминный комплекс с лютеином";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";


export default async function OpengraphImage() {
  const [c800, l800, c600, l600] = await Promise.all([
    readFile(join(process.cwd(), "assets/og-fonts/manrope-cyrillic-800-normal.woff")),
    readFile(join(process.cwd(), "assets/og-fonts/manrope-latin-800-normal.woff")),
    readFile(join(process.cwd(), "assets/og-fonts/manrope-cyrillic-600-normal.woff")),
    readFile(join(process.cwd(), "assets/og-fonts/manrope-latin-600-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(140deg, #ffffff 0%, #eaf3ff 55%, #cfe0ff 100%)",
          position: "relative",
          fontFamily: "Manrope",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -60,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(54,120,246,0.45), rgba(54,120,246,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 160,
            bottom: -200,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(86,214,209,0.45), rgba(86,214,209,0) 70%)",
          }}
        />
        <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#1746A2", letterSpacing: 4 }}>
          ВИТАМИННЫЙ КОМПЛЕКС С ЛЮТЕИНОМ
        </div>
        <div style={{ display: "flex", fontSize: 168, fontWeight: 800, color: "#091B45", letterSpacing: -6, lineHeight: 1, marginTop: 18 }}>
          БИОГЛАЗ
        </div>
        <div style={{ display: "flex", fontSize: 42, fontWeight: 600, color: "#091B45", marginTop: 22 }}>
          Забота о здоровье глаз каждый день
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["90 капсул", "Лютеин и витамины", "Казахстан"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid #DBE6F7",
                fontSize: 26,
                fontWeight: 600,
                color: "#1746A2",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", position: "absolute", left: 90, bottom: 40, fontSize: 22, fontWeight: 600, color: "#4A5878" }}>
          БАД. Не является лекарственным средством.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: c800, weight: 800, style: "normal" },
        { name: "Manrope", data: l800, weight: 800, style: "normal" },
        { name: "Manrope", data: c600, weight: 600, style: "normal" },
        { name: "Manrope", data: l600, weight: 600, style: "normal" },
      ],
    },
  );
}
