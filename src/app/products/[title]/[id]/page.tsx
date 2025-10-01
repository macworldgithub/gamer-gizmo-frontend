import type { Metadata } from "next";
import ClientPage from "./ClientPage";

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

export default function Page() {
  return <ClientPage />;
}
