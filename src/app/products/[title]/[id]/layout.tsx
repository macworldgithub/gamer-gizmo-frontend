import type { Metadata } from "next";
import { ReactNode } from "react";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: { title?: string; id?: string };
}): Promise<Metadata> {
  const rawSlug = decodeURIComponent(params.title || "");
  const productName = toTitleCase(rawSlug.replace(/-/g, " ").trim());

  const title = `Buy ${productName} at GamerGizmo`;
  const description = `Get ${productName} at Gamergizmo UAE. Affordable prices and fast delivery. Buy now and level up your gaming setup today.`;
  const url = `/products/${params.title ?? ""}/${params.id ?? ""}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
