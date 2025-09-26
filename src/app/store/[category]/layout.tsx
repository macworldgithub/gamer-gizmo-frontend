import type { Metadata } from "next";
import { ReactNode } from "react";

function resolveCategoryName(raw: string | undefined): string {
  if (!raw) return "Unknown Category";
  const decoded = decodeURIComponent(raw);
  // Expected formats: "category_id=1" or just "1" or any other key=value
  const id = decoded.includes("=") ? decoded.split("=")[1] : decoded;
  const map: Record<string, string> = {
    "1": "Laptops",
    "2": "Gaming PCs",
    "3": "Components",
    "4": "Gaming Consoles",
  };
  return map[id] || "Unknown Category";
}

export async function generateMetadata({
  params,
}: {
  params: { category?: string };
}): Promise<Metadata> {
  const categoryName = resolveCategoryName(params.category);
  const title = `Shop ${categoryName} Online in UAE | Gamergizmo`;
  const description = `Find the best ${categoryName} in the UAE at Gamergizmo. Buy or sell with ease, get great prices, and enjoy fast delivery across the Emirates.`;
  const url = `/store/${params.category ?? ""}`;

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

export default function StoreCategoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
