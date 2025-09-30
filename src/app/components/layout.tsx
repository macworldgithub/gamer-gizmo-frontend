import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Components and Accessories | GamerGizmo",
  description:
    "Shop components and accessories on GamerGizmo. Find parts and gear for your setup.",
  alternates: { canonical: "/components" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Components and Accessories | GamerGizmo",
    description:
      "Shop components and accessories on GamerGizmo. Find parts and gear for your setup.",
    url: "/components",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Components and Accessories | GamerGizmo",
    description:
      "Shop components and accessories on GamerGizmo. Find parts and gear for your setup.",
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}


