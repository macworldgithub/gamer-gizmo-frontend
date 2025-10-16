import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Buy GamerGizmo Branded Gaming Products and Accessories Online",
  description:
    "Explore GamerGizmo's official store for branded gaming PCs, consoles, and accessories.Get top performance , exclusive deals and fast delivery across UAE.",
  alternates: { canonical: "/store" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Store | GamerGizmo",
    description:
      "Browse the GamerGizmo store for gaming PCs, laptops, components, and accessories.",
    url: "/store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Store | GamerGizmo",
    description:
      "Browse the GamerGizmo store for gaming PCs, laptops, components, and accessories.",
  },
};

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
