import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  // Keep canonical relative; metadataBase will resolve it to absolute
  const canonical = `/store/${params.category}`;
  return { alternates: { canonical } };
}

export default function Page() {
  return <ClientPage />;
}
