// app/community-chat/[id]/page.tsx
import type { Metadata } from "next";
import ChatClientWrapper from "./ClientWrapper";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return { alternates: { canonical: `/community-chat/${params.id}` } };
}

export default async function CommunityChatPage(props: {
  params: { id: string };
}) {
  const { id } = props.params;
  return <ChatClientWrapper communityId={id} />;
}
