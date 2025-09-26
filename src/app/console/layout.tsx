import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop Gaming Consoles Online in UAE | Gamergizmo",
  description:
    "Find the best Gaming Consoles in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  alternates: { canonical: "/console" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Shop Gaming Consoles Online in UAE | Gamergizmo",
    description:
      "Find the best Gaming Consoles in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
    url: "/console",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Gaming Consoles Online in UAE | Gamergizmo",
    description:
      "Find the best Gaming Consoles in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  },
};

export default function ConsolesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
