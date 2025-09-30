import type { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { title?: string };
}): Promise<Metadata> {
  const raw = params.title ? decodeURIComponent(params.title) : "";
  const url = `/blogs/${raw}`;

  // Basic title/description derived from slug; can be replaced with fetched content
  const humanTitle = raw
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  const title = humanTitle ? `${humanTitle} | GamerGizmo Blog` : "Blog | GamerGizmo";
  const description = humanTitle
    ? `Read ${humanTitle} on the GamerGizmo blog.`
    : "Read this article on the GamerGizmo blog.";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}


