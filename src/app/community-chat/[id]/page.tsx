// app/community-chat/[id]/page.tsx
import ChatClientWrapper from "./ClientWrapper";

export default function CommunityChatPage({ params }: { params: { id: string } }) {
    return <ChatClientWrapper communityId={params.id} />;
}
