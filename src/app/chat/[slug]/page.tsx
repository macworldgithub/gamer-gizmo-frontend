import type { Metadata } from "next";
import ClientPage from "./ClientPage";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const canonical = `/chat/${slugify(params.slug)}`;
  return { alternates: { canonical } };
}

export default function Page() {
  return <ClientPage />;
}
