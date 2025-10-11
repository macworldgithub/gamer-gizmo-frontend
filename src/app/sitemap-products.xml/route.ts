// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// const BASE_URL =
//   process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
//   "https://gamergizmo.com";

// export async function GET() {
//   const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
//   let products: any[] = [];
//   let reason = "ok";
//   const bearer = process.env.SITEMAP_API_BEARER; // optional token if API requires auth

//   // If API base is not configured (common in local dev), return an empty sitemap instead of 500
//   if (!apiBase) {
//     const empty = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;
//     return new NextResponse(empty, {
//       headers: {
//         "Content-Type": "application/xml",
//         "X-Sitemap-Count": "0",
//         "X-Sitemap-Reason": "missing_api_base",
//       },
//     });
//   }

//   try {
//     // Fetch all products; avoid caching in dev
//     const res = await fetch(`${apiBase}/products/getAll?limit=10000`, {
//       cache: "no-store",
//       headers: bearer
//         ? { Authorization: `Bearer ${bearer}`, Accept: "application/json" }
//         : { Accept: "application/json" },
//     });
//     if (res.ok) {
//       const data = await res.json();
//       // Accept several common shapes without crashing
//       const cands = [
//         data,
//         data?.data,
//         data?.data?.rows,
//         data?.items,
//         data?.results,
//         data?.products,
//       ];
//       const match = cands.find((v) => Array.isArray(v));
//       products = Array.isArray(match) ? match : [];
//       if (!Array.isArray(match)) reason = "unexpected_shape";
//     } else {
//       products = [];
//       reason = `status_${res.status}`;
//     }
//   } catch {
//     // Network/JSON errors shouldn't crash the route
//     products = [];
//     reason = "fetch_error";
//   }

//   const urls = products
//     .map((product: any) => {
//       // Support both flat and nested shapes
//       const rawSlug: string | undefined =
//         product?.slug ||
//         product?.product_slug ||
//         product?.product?.slug ||
//         product?.product?.product_slug;
//       const fallbackFromName =
//         typeof product?.name === "string"
//           ? product.name.replace(/\s+/g, "-").toLowerCase()
//           : typeof product?.title === "string"
//           ? product.title.replace(/\s+/g, "-").toLowerCase()
//           : typeof product?.product?.name === "string"
//           ? product.product.name.replace(/\s+/g, "-").toLowerCase()
//           : typeof product?.product?.title === "string"
//           ? product.product.title.replace(/\s+/g, "-").toLowerCase()
//           : "";
//       const finalSlug = (rawSlug || fallbackFromName).trim();
//       if (!finalSlug) return null; // skip if still no slug
//       const safeSlug = encodeURIComponent(finalSlug);
//       return `<url><loc>${BASE_URL}/products/${safeSlug}</loc></url>`;
//     })
//     .filter(Boolean) as string[];

//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
//     "\n"
//   )}\n</urlset>`;
//   return new NextResponse(sitemap, {
//     headers: {
//       "Content-Type": "application/xml",
//       "X-Sitemap-Count": String(urls.length),
//       "X-Sitemap-Reason": reason,
//     },
//   });
// }
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://gamergizmo.com";

export async function GET() {
  try {
    // Fetch all products with extended timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?limit=10000`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }

    const data = await res.json();
    const products = data.data || [];

    const urls = products.map(
      (product: any) =>
        `<url><loc>${BASE_URL}/products/${product.slug}</loc></url>`
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
      "\n"
    )}\n</urlset>`;
    
    return new NextResponse(sitemap, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Return empty sitemap on error instead of 500
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;
    
    return new NextResponse(emptySitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
