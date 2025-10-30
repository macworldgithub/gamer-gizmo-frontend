import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const canonical = `/blogs/${slugify(params.title)}`;
  return { alternates: { canonical } };
}

type BlogPost = {
  id: number;
  title: string;
  content: string;
  images: string;
  created_at: string;
  tags: string;
  slug: string;
  [key: string]: any;
};

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/blogs/getSingleBlogsDetails?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: { title: string } }) {
  const slug = decodeURIComponent(params.title);
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/blogs/${encodeURIComponent(
    post.slug || slugify(slug)
  )}`;

  // Normalize images to absolute URLs array
  const rawImages: string[] = Array.isArray((post as any).images)
    ? ((post as any).images as string[])
    : typeof (post as any).images === "string"
    ? (post as any).images
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];
  const images = rawImages
    .map((url: string) =>
      /^https?:\/\//i.test(url)
        ? url
        : url?.startsWith("/")
        ? `${siteUrl}${url}`
        : `${siteUrl}/${url}`
    )
    .filter(Boolean);

  const published = (post as any)?.created_at || (post as any)?.Created_at;
  const tags =
    typeof post?.tags === "string"
      ? post.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: (post as any)?.excerpt || undefined,
    articleBody: post.content,
    image: images.length ? images : undefined,
    datePublished: published || undefined,
    dateModified: (post as any)?.updated_at || undefined,
    mainEntityOfPage: canonical,
    url: canonical,
    author: {
      "@type": "Organization",
      name: "Gamer Gizmo",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Gamer Gizmo",
      url: siteUrl,
    },
    articleSection: tags.length ? tags : undefined,
  } as any;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteUrl}/blogs`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      <ClientPage initialPost={post} />
      <StructuredData data={[blogPosting, breadcrumb]} />
    </>
  );
}
