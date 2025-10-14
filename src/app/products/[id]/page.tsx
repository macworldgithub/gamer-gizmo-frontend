import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const canonical = `/products/${params.id}`;
  // Default fallbacks
  let title: string = "Product | GamerGizmo";
  let description: string =
    "Get this product at Gamergizmo UAE. Affordable prices and fast delivery. Buy now and level up your gaming setup today.";

  try {
    const product = await getProduct(params.id);
    const productName = product?.name?.toString().trim();
    if (productName) {
      title = `Buy ${productName} at GamerGizmo`;
      description = `Get ${productName} at Gamergizmo UAE. Affordable prices and fast delivery. Buy now and level up your gaming setup today.`;
    }
  } catch {}

  return {
    title,
    description,
    alternates: { canonical },
  };
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category_id?: number;
  [key: string]: any;
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) return notFound();
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/products/${
    params.id
  }`;
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "USD";

  // Derive images array from possible fields
  const images: string[] = Array.isArray((product as any).images)
    ? ((product as any).images as string[])
    : product.imageUrl
    ? [product.imageUrl]
    : Array.isArray((product as any).product_images)
    ? ((product as any).product_images || [])
        .map((pi: any) => pi?.image_url)
        .filter(Boolean)
    : [];

  // Derive availability from stock when available
  const stockVal = (product as any).stock;
  const availability =
    stockVal === 0 ||
    stockVal === "0" ||
    String(stockVal || "")
      .toLowerCase()
      .includes("out")
      ? "https://schema.org/OutOfStock"
      : "https://schema.org/InStock";

  // Optional brand/category names if present in response
  const brandName =
    (product as any)?.brands?.name ||
    (product as any)?.brand?.name ||
    (product as any)?.brand_name;
  const categoryName =
    (product as any)?.categories?.name || (product as any)?.category?.name;

  // Optional aggregate rating if reviews are present
  const reviews: any[] = Array.isArray((product as any)?.product_reviews)
    ? (product as any).product_reviews
    : [];
  const reviewCount = reviews.length;
  const ratingValues = reviews
    .map((r: any) => Number(r?.ratings))
    .filter((n: number) => !Number.isNaN(n));
  const ratingValue = ratingValues.length
    ? Number(
        (
          ratingValues.reduce((a: number, b: number) => a + b, 0) /
          ratingValues.length
        ).toFixed(2)
      )
    : undefined;

  // Optional SKU/MPN if available
  const sku = (product as any)?.sku || String(product.id);
  const mpn = (product as any)?.mpn;

  // Map numeric condition to schema.org URL
  const conditionVal = (product as any)?.condition;
  const itemCondition =
    conditionVal === 1
      ? "https://schema.org/NewCondition"
      : conditionVal === 2 || conditionVal === 3
      ? "https://schema.org/UsedCondition"
      : conditionVal === 4
      ? "https://schema.org/RefurbishedCondition"
      : undefined;

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images.length ? images : undefined,
    sku: sku || undefined,
    mpn: mpn || undefined,
    brand: brandName ? { "@type": "Brand", name: brandName } : undefined,
    category: categoryName || undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: currency,
      availability,
      url: canonical,
      itemCondition: itemCondition,
      seller: {
        "@type": "Organization",
        name: "Gamer Gizmo",
      },
    },
  };

  if (ratingValue && reviewCount) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    };
  }

  // Build reviews array for JSON-LD if reviews exist
  if (reviewCount) {
    jsonLd.review = reviews
      .map((r: any) => {
        const authorName =
          (r?.users?.first_name || "").toString().trim() +
          (r?.users?.last_name ? ` ${r.users.last_name}` : "");
        const rating = Number(r?.ratings);
        return {
          "@type": "Review",
          author: authorName
            ? { "@type": "Person", name: authorName }
            : undefined,
          reviewRating: !Number.isNaN(rating)
            ? { "@type": "Rating", ratingValue: rating, bestRating: 5 }
            : undefined,
          reviewBody: r?.comments || undefined,
          datePublished: r?.created_at || undefined,
        };
      })
      .filter(Boolean);
  }

  // Include optional fields in JSON-LD if available
  if (sku) jsonLd.sku = sku;
  if (mpn) jsonLd.mpn = mpn;
  if (brandName) jsonLd.brand = { "@type": "Brand", name: brandName };
  if (categoryName) jsonLd.category = categoryName;
  // itemCondition belongs to Offer (already set above)
  if (reviewCount) jsonLd.reviewCount = reviewCount;

  return (
    <>
      <ClientPage initialProduct={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
