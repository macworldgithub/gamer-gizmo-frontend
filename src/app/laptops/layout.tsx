import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop Laptops Online in UAE | Gamergizmo",
  description:
    "Find the best Laptops in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  alternates: { canonical: "/laptops" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Shop Laptops Online in UAE | Gamergizmo",
    description:
      "Find the best Laptops in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
    url: "/laptops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Laptops Online in UAE | Gamergizmo",
    description:
      "Find the best Laptops in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  },
};

export default function LaptopsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
