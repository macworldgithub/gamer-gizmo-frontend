import Image from "next/image";
import React from "react";
import siren from "../../../../public/images/Siren.svg";

const ChatWindow = ({ chat }: { chat: any }) => {
  return (
    <div className="w-full md:w-[70%] h-screen p-6 mx-4 border border-black rounded-lg bg-white">
      {/* Seller Info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={chat.sellerImage}
          alt="Seller"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{chat.sender}</h3>
          <p className="text-sm text-gray-500">Last Seen: Today 11:24 AM</p>
        </div>
      </div>

      {/* Chat Details */}
      <div className="bg-[#e3defc] p-4 rounded-lg">
        <h2 className="text-lg font-semibold">{chat.title}</h2>
        <p className="text-xl font-bold text-gray-700">{chat.price}</p>
        <p className="text-sm text-gray-500">{chat.location}</p>
      </div>

      {/* Warning Message */}
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-[85%] mx-auto items-center justify-center mt-4">
        <Image src={siren} alt="siren" width={25} height={25} />
        <p className="text-xs font-semibold text-center md:text-left">
          Stay safe on GamerGizmo! Don’t open suspicious links or share your
          credit card/bank details with anyone.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
