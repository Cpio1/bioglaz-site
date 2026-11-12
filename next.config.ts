import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Шрифты для генерации OG-картинки должны попасть в серверный бандл на Vercel
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/og-fonts/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
