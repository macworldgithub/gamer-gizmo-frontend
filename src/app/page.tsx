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
export default async function HomePage() {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const siteName = "GamerGizmo";
  const orgDescription =
    "Gamer Gizmo is a UAE-based marketplace for gaming PCs, laptops, consoles, and components — offering verified listings, great prices, and fast delivery.";

  // Hardcoded branding and social links (update as needed)
  const orgLogo = `${siteUrl}/images/gameIcon.webp`;
  const foundingDate = "2024";

  const socialLinks = [
    "https://www.facebook.com/profile.php?id=61573613765643",
    "https://www.instagram.com/gamergizmo_official?utm_source=qr&igsh=eWdrMmpkMjEyc3p6",
    "https://twitter.com/gamergizmo",
    "https://www.youtube.com/@GamerGizmo_Official",
    "https://www.tiktok.com/@gamergizmo_official",
  ];

  const supportPhone = "+971555795213";
  const supportEmail = "support@gamergizmo.com";

  const organization: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: orgDescription,
    logo: orgLogo,
    foundingDate: foundingDate,
    sameAs: socialLinks,
    subOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/contact/#organization`,
      name: `${siteName} Support`,
      url: `${siteUrl}/contact`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: supportPhone,
        email: supportEmail,
        contactType: "customer service",
        availableLanguage: ["en", "ar"],
      },
    },
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
