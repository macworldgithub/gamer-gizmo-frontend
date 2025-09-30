import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us | GamerGizmo",
  description: "Get in touch with GamerGizmo for support, partnerships, or inquiries.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Us | GamerGizmo",
    description:
      "Get in touch with GamerGizmo for support, partnerships, or inquiries.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | GamerGizmo",
    description:
      "Get in touch with GamerGizmo for support, partnerships, or inquiries.",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


