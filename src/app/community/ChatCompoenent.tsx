
import ChatBox from "./chatBox";

export default function Chat() {


  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      {/* Chat Header */}
      <h2 className="text-3xl font-bold mb-4 text-neon-green">
        🎮 Gaming Community Chat
      </h2>
<ChatBox/>
     
    </div>
  );
}
