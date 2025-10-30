import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { StructuredData } from "@/components/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  // Keep canonical relative; metadataBase will resolve it to absolute
  const canonical = `/store/${params.category}`;
  return { alternates: { canonical } };
}

export default function Page({ params }: { params: { category: string } }) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const slug = params.category || "";
  const displayName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const canonical = `${siteUrl}/store/${encodeURIComponent(slug)}`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${displayName} | GamerGizmo`,
    description: `Browse ${displayName} at GamerGizmo. Explore products, compare prices, and shop now in the UAE.`,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "GamerGizmo",
      url: siteUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Store", item: `${siteUrl}/store` },
      { "@type": "ListItem", position: 3, name: displayName, item: canonical },
    ],
  };

  return (
    <>
      <ClientPage />
      <StructuredData data={[collectionPage, breadcrumb]} />
    </>
  );
}
