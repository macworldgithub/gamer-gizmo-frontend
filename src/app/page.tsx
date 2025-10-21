import { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Buy & Sell Gaming PCs, Laptops, Consoles & Parts in UAE | GamerGizmo",
  description:
    "Looking to buy or sell gaming PCs, laptops, consoles, or components in the UAE? Find the best deals on top brands and latest models. Shop now for great prices!",
  alternates: {
    canonical: "/",
  },
};
export default function HomePage() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const siteName = "GamerGizmo";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search-product?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <StructuredData data={organization} />
      <StructuredData data={website} />
      <HomePageClient />
    </>
  );
}
