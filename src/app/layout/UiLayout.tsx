"use client";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { ReactNode, useEffect, useState } from "react";

interface UiProps {
  children: ReactNode;
}

const UiLayout = ({ children }: UiProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen h-max bg-white ">
      <Navbar />
      <div>{children}</div>
      <div className="bg-black w-full h-7  z-50 text-white text-center">
        <Footer />
      </div>
    </div>
  );
};

export default UiLayout;
