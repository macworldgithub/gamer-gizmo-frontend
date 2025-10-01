import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

// Match ProductCard slug rules
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function GET() {
  // Fetch all products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?limit=10000`
  );
  const data = await res.json();
  const products = data.data || [];

  const urls = products.map(
    (product: any) =>
      `<url><loc>${BASE_URL}/products/${slugify(product.name)}/${product.id}</loc></url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
