import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return { alternates: { canonical: `/my-adds/edit/${params.id}` } };
}

export default function Page() {
  return <ClientPage />;
}
