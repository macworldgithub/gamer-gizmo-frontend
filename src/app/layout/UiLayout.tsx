"use client";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { RootState } from "@/components/Store/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData } from "@/app/utils/profileFetch";
import { InitializeUserData } from "@/components/Store/Slicer/LoginSlice";

interface UiProps {
  children: ReactNode;
}

const UiLayout = ({ children }: UiProps) => {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const token = useSelector((state: RootState) => state.user.token);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      // Show popup only if not shown before in this session
      if (!sessionStorage.getItem("aiPopupShown")) {
        setTimeout(() => {
          setShowPopup(true);
          sessionStorage.setItem("aiPopupShown", "true");
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide popup after 2 seconds
  useEffect(() => {
    if (showPopup) {
      const hideTimer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(hideTimer);
    }
  }, [showPopup]);

  // Refresh user profile on app load to avoid stale/expired avatar URLs
  useEffect(() => {
    const refreshUser = async () => {
      try {
        if (!token) return;
        const data = await fetchProfileData(token);
        if (data) dispatch(InitializeUserData({ ...data } as any));
      } catch (_) {
        // Silently ignore; avatar will fallback
      }
    };
    refreshUser();
  }, [token]);

  const handleChatClick = useCallback(() => {
    if (!token) {
      alert("Please login for chatting with AI");
      router.push("/auth/login");
      return;
    }
    router.push("/ai");
  }, [token, router]);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen h-max bg-white">
      <Navbar />

      {/* Top-Right Popup */}
      {showPopup && (
        <div
          onClick={handleChatClick}
          className="fixed top-5 right-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-lg shadow-lg cursor-pointer flex items-center space-x-2 animate-slideIn z-50"
        >
          <Image
            src="/images/bot.png"
            alt="Bot Icon"
            width={26}
            height={26}
            className="object-contain"
          />
          <span className="font-medium text-sm">Chat with AI</span>
        </div>
      )}

      <div>{children}</div>

      <div className="bg-black w-full h-7 z-50 text-white text-center">
        <Footer />
      </div>

      {/* Floating AI Buddy Button */}
      <button
        onClick={handleChatClick}
        className="fixed bottom-6 right-10 z-50 bg-white hover:bg-pink-500 text-gray-800 hover:text-white px-3 py-2 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center space-x-2 animate-pulse"
      >
        <Image
          src="/images/bot.png"
          alt="Bot Icon"
          width={28}
          height={28}
          className="object-contain"
        />
        <span className="text-sm font-medium whitespace-nowrap">
          Your AI Buddy
        </span>
      </button>

      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default UiLayout;
