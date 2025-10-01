import { NextResponse } from "next/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

export async function GET() {
  let blogUrls: string[] = [];
  try {
    const blogRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getRecentsBlogs`,
      { cache: "no-store" }
    );
    const blogs = await blogRes.json();
    if (Array.isArray(blogs.data)) {
      blogUrls = blogs.data.map((blog: any) => {
        const rawSlug: string | undefined = blog?.slug;
        const fallbackFromTitle =
          typeof blog?.title === "string"
            ? blog.title.replace(/\s+/g, "-").toLowerCase()
            : "";
        const finalSlug = encodeURIComponent(rawSlug || fallbackFromTitle);
        return `<url><loc>${BASE_URL}/blogs/${finalSlug}</loc></url>`;
      });
    }
  } catch {}

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blogUrls.join("\n")}\n</urlset>`;
  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
