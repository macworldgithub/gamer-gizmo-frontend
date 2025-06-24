import ChatBox from "./chatBox";

// export default function Chat({ communityId, communityData }: any) {
//   console.log(communityData, "...communityData in Chat component");
//   return (
//     <div className="bg-custom-gradient text-white min-h-screen flex flex-col items-center p-6">
//       {/* Chat Header */}
//       <h2 className="text-3xl font-bold mb-4 text-neon-green">
//         {communityData?.name ? `🎮 ${communityData.name} Community` : '🎮 Community Chat'}
//       </h2>
//       <ChatBox communityChatId={communityId} />
//     </div>
//   );
// }
export default function Chat({ communityId, communityData, fallbackName, }: {
  communityId: string;
  communityData: { name: string } | null
  fallbackName?: string;
}) {
  return (
    <div className="bg-custom-gradient text-white min-h-screen flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-4 text-neon-green">
        {/* {communityData?.name ? `🎮 ${communityData.name} Community` : '🎮 Community Chat'} */}
        {communityData?.name || fallbackName
          ? `🎮 ${communityData?.name || fallbackName} Community`
          : "🎮 Community Chat"}
      </h2>
      <ChatBox communityChatId={communityId} />
    </div>
  );
}