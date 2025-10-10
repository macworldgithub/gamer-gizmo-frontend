import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id?: string };
}): Promise<Metadata> {
  const url = `/products/${params.id ?? ""}`;
  const title = `Product Details`;
  const description = `View product details at GamerGizmo.`;

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
