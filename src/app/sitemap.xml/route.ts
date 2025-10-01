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
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

//publishAd, favorites, Add-to-Cart, order, profile, my-adds, all-communities
export async function GET() {
  // 1. List your static routes
  const staticPages = [
    "", // homepage
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

  // TODO: For dynamic routes like /blog/[slug], /chat/[slug], /community-chat/[id], /store/[category],
  // fetch their slugs/ids from your backend and add them to the sitemap as well.
  // 2. Fetch all products for dynamic routes
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?limit=10000`
  );
  const data = await res.json();
  const products = data.data || [];

  // Dynamic product URLs
  const productUrls = products.map(
    (product: any) =>
      `<url><loc>${BASE_URL}/products/${slugify(product.name)}/${product.id}</loc></url>`
  );

  // --- DYNAMIC ROUTES ---
  // Example: Fetch all blog slugs
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


  // Example: Fetch all store categories
  let storeCategoryUrls: string[] = [];
  try {
    const catRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
    );
    const cats = await catRes.json();
    if (Array.isArray(cats.data)) {
      storeCategoryUrls = cats.data.map(
        (cat: any) => `<url><loc>${BASE_URL}/store/${cat.slug}</loc></url>`
      );
    }
  } catch {}

  // 3. Build XML for static and dynamic routes
  let urls = [
    ...staticPages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`),
    ...blogUrls,
    ...productUrls,
    ...storeCategoryUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
