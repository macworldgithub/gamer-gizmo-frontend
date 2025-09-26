import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop Gaming PCs Online in UAE | Gamergizmo",
  description:
    "Find the best Gaming PCs in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  alternates: { canonical: "/desktop" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Shop Gaming PCs Online in UAE | Gamergizmo",
    description:
      "Find the best Gaming PCs in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
    url: "/desktop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Gaming PCs Online in UAE | Gamergizmo",
    description:
      "Find the best Gaming PCs in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.",
  },
};

export default function DesktopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
