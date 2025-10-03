import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getSingleBlogsDetails?slug=${encodeURIComponent(slug)}`,
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
  return <ClientPage initialPost={post} />;
}
