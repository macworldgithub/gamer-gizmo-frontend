"use client";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

interface UiProps {
  children: ReactNode;
}

const UiLayout = ({ children }: UiProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleChatClick = () => {
    router.push("/ai"); // ← Navigate to /ai route
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen h-max bg-white ">
      <Navbar />
      <div>{children}</div>
      <div className="bg-black w-full h-7  z-50 text-white text-center">
        <Footer />
      </div>
      <button
        onClick={handleChatClick}
        className="fixed bottom-6 right-10 z-50 bg-custom-gradient hover:bg-pink-500 text-white px-4 py-3 rounded-full shadow-lg transition duration-300 ease-in-out"
      >
        {/* 💬 Chat with AI */}
        <IoChatbubbleEllipsesSharp size={25} />
      </button>
    </div>
  );
};

export default UiLayout;
