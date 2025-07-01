// app/community-chat/[id]/page.tsx
import ChatClientWrapper from "./ClientWrapper";

export default async function CommunityChatPage(props: { params: { id: string } }) {
    const { id } = props.params; // ✅ Extract after awaiting the props (async context)
    return <ChatClientWrapper communityId={id} />;
}
