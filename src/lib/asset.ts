/**
 * Prefix for files in /public.
 * Normal Vercel deploy: "" (absolute paths).
 * Portable demo build (DEMO_EXPORT=1): "." so the site works from any folder.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ""}${path}`;
