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
  params: { title: string; id: string };
}): Promise<Metadata> {
  const canonical = `/products/${slugify(params.title)}/${params.id}`;
  return {
    alternates: { canonical },
  };
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category_id?: number;
  [key: string]: any;
};

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: { title: string; id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) return notFound();
  return <ClientPage initialProduct={product} />;
}
