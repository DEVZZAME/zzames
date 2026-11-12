import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {"/*": ["./*.txt", "./*.pdf"]},
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
