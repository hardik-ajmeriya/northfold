import type { NextConfig } from "next";

// DEMO_EXPORT=1 → relative image paths; run `npm run build:demo` (see scripts/make-demo.mjs)
const demo = process.env.DEMO_EXPORT === "1";

const nextConfig: NextConfig = {
  // Static HTML export: deploys to Vercel, Netlify or any static host.
  output: "export",
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_ASSET_BASE: demo ? "." : "" },
};

export default nextConfig;
