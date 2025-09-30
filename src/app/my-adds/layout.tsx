import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Ads | GamerGizmo",
  description: "View and manage your posted ads on GamerGizmo.",
  alternates: { canonical: "/my-adds" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "My Ads | GamerGizmo",
    description: "View and manage your posted ads on GamerGizmo.",
    url: "/my-adds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Ads | GamerGizmo",
    description: "View and manage your posted ads on GamerGizmo.",
  },
};

export default function MyAddsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


