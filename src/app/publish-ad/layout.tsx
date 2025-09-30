import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Publish Ad | GamerGizmo",
  description: "Publish your gaming ad on GamerGizmo and reach more buyers.",
  alternates: { canonical: "/publish-ad" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Publish Ad | GamerGizmo",
    description: "Publish your gaming ad on GamerGizmo and reach more buyers.",
    url: "/publish-ad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publish Ad | GamerGizmo",
    description: "Publish your gaming ad on GamerGizmo and reach more buyers.",
  },
};

export default function PublishAdLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}


