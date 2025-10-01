import { NextResponse } from "next/server";

// Prefer environment-configured site URL; fallback to production domain
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

// Use the exact same slug rules as ProductCard to keep URLs consistent
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

//publishAd, favorites, Add-to-Cart, order, profile, my-adds, all-communities
export async function GET() {
  // Output a sitemap index that references category-specific sitemaps
  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE_URL}/sitemap-static.xml</loc></sitemap>
  <sitemap><loc>${BASE_URL}/sitemap-products.xml</loc></sitemap>
  <sitemap><loc>${BASE_URL}/sitemap-blogs.xml</loc></sitemap>
</sitemapindex>`;

  return new NextResponse(index, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
