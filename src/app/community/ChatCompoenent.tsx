import ChatBox from "./chatBox";

export default function Chat({ communityId, communityData }: any) {
  return (
    <div className="bg-custom-gradient text-white min-h-screen flex flex-col items-center p-6">
      {/* Chat Header */}
      <h2 className="text-3xl font-bold mb-4 text-neon-green">
        {communityData?.name ? `🎮 ${communityData.name} Community` : '🎮 Community Chat'}
      </h2>
      <ChatBox communityChatId={communityId} />
    </div>
  );
}
