import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Orders | GamerGizmo",
  description: "View your orders on GamerGizmo.",
  alternates: { canonical: "/order" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Orders | GamerGizmo",
    description: "View your orders on GamerGizmo.",
    url: "/order",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orders | GamerGizmo",
    description: "View your orders on GamerGizmo.",
  },
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


