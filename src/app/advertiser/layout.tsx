import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Advertiser | GamerGizmo",
  description: "Advertise with GamerGizmo. Media kits, packages, and placements.",
  alternates: { canonical: "/advertiser" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Advertiser | GamerGizmo",
    description:
      "Advertise with GamerGizmo. Media kits, packages, and placements.",
    url: "/advertiser",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advertiser | GamerGizmo",
    description:
      "Advertise with GamerGizmo. Media kits, packages, and placements.",
  },
};

export default function AdvertiserLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


