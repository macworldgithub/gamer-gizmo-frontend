import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cart | GamerGizmo",
  description: "View items in your GamerGizmo cart.",
  alternates: { canonical: "/Add-to-Cart" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Cart | GamerGizmo",
    description: "View items in your GamerGizmo cart.",
    url: "/Add-to-Cart",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cart | GamerGizmo",
    description: "View items in your GamerGizmo cart.",
  },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


