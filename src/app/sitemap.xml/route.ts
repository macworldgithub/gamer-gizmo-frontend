import { NextResponse } from "next/server";

// Prefer environment-configured site URL; fallback to production domain
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

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
    "/publish-ad",
    "/favourites",
    "/Add-to-Cart",
    "/order",
    "/profile",
    "/my-adds",
    "/ai",
    "/all-communities",
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
      `<url><loc>${BASE_URL}/products/${encodeURIComponent(
        product.name.replace(/\s+/g, "-").toLowerCase()
      )}/${product.id}</loc></url>`
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
        const fallbackFromTitle = typeof blog?.title === "string"
          ? blog.title.replace(/\s+/g, "-").toLowerCase()
          : "";
        const finalSlug = encodeURIComponent(rawSlug || fallbackFromTitle);
        return `<url><loc>${BASE_URL}/blogs/${finalSlug}</loc></url>`;
      });
    }
  } catch {}

  // Example: Fetch all chat slugs
  let chatUrls: string[] = [];
  try {
    const chatRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`
    );
    const chats = await chatRes.json();
    if (Array.isArray(chats.data)) {
      chatUrls = chats.data.map(
        (chat: any) => `<url><loc>${BASE_URL}/chat/${chat.slug}</loc></url>`
      );
    }
  } catch {}

  // Example: Fetch all community-chat ids
  let communityChatUrls: string[] = [];
  try {
    const commRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community-chats`
    );
    const comms = await commRes.json();
    if (Array.isArray(comms.data)) {
      communityChatUrls = comms.data.map(
        (c: any) => `<url><loc>${BASE_URL}/community-chat/${c.id}</loc></url>`
      );
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

  // Example: Fetch all my-adds/edit ids
  let myAddsEditUrls: string[] = [];
  try {
    const addsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-adds`
    );
    const adds = await addsRes.json();
    if (Array.isArray(adds.data)) {
      myAddsEditUrls = adds.data.map(
        (ad: any) => `<url><loc>${BASE_URL}/my-adds/edit/${ad.id}</loc></url>`
      );
    }
  } catch {}

  // 3. Build XML for static and dynamic routes
  let urls = [
    ...staticPages.map((page) => `<url><loc>${BASE_URL}${page}</loc></url>`),
    ...blogUrls,
    ...productUrls,
    ...chatUrls,
    ...communityChatUrls,
    ...storeCategoryUrls,
    ...myAddsEditUrls,
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
