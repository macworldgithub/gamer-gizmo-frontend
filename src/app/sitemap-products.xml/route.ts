import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

export async function GET() {
  // Fetch all products
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?limit=10000`
  );
  const data = await res.json();
  const products = data.data || [];

  const urls = products.map(
    (product: any) =>
      `<url><loc>${BASE_URL}/products/${product.slug}</loc></url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
