import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

export async function GET() {
  const staticPages = [
    "", 
    "/about",
    "/contact",
    "/blogs",
    "/components",
    "/console",
    "/desktop",
    "/laptops",
    "/store",
    "/advertiser",
    "/ai",
  ];

  const urls = staticPages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`);

  const sitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n${urls.join("\n")}\n</urlset>`;
  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
