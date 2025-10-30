import PageHeader from "@/components/PageHeader";
import ContactCards from "./ContactCards";
import Map from "./Map";
import { StructuredData } from "@/components/StructuredData";

const AboutPage = () => {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/contact`;

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact | GamerGizmo",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GamerGizmo",
    url: siteUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971555795213",
      email: "support@gamergizmo.com",
      contactType: "customer service",
      availableLanguage: ["en", "ar"],
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonical },
    ],
  };
  return (
    <div className="w-full bg-white dark:bg-black">
      <StructuredData data={[contactPage, organization, breadcrumb]} />
      <PageHeader pageName={"Contact Us"} title="Contact" />
      <ContactCards />
      <Map />
    </div>
  );
};

export default AboutPage;
