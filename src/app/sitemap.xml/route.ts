import { NextResponse } from "next/server";

// Replace with your actual domain
const BASE_URL = "https://gamergizmo.com";

export async function GET() {
  // 1. List your static routes
  const staticPages = [
    "",
    "/about",
    "/Add-to-Cart",
    "/advertisement",
    "/advertising",
    "/ai",
    "/all-communities",
    "/auth/login",
    "/auth/otp",
    "/auth/register",
    "/blogs",
    "/chat", // dynamic: /chat/[slug] handled below if needed
    "/community",
    "/community-chat", // dynamic: /community-chat/[id] handled below if needed
    "/components",
    "/console",
    "/contact",
    "/desktop",
    "/favourites",
    "/Inspection",
    "/laptops",
    "/my-adds",
    "/order",
    "/order-success",
    "/privacy-policy",
    "/products-search",
    "/profile",
    "/publish-ad",
    "/search-product",
    "/store",
    // Add more as needed
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`
    );
    const blogs = await blogRes.json();
    if (Array.isArray(blogs.data)) {
      blogUrls = blogs.data.map(
        (blog: any) =>
          `<url><loc>${BASE_URL}/blogs/${encodeURIComponent(
            blog.title.replace(/\s+/g, "-").toLowerCase()
          )}</loc></url>`
      );
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
    ...productUrls,
    ...blogUrls,
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
