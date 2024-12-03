"use client";

import Loader from "@/components/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />
  }
  return (
    <div className="bg-white h-screen w-screen">
      <div className="text-black">Etherum</div>
      <div className="flex justify-around">
        <div>
          <Image src="/images/gameIcon.svg" alt="logo-img" width={100} height={100} />
        </div>
        <div><a href="#" className="text-grayText">Laptops</a></div>
        <div><a href="#" className="text-grayText">Desktops</a></div>
        <div><a href="#" className="text-grayText">Store</a></div>
        <div><a href="#" className="text-grayText">Components</a></div>
        <div><a href="#" className="text-grayText">Blogs</a></div>
        <div><a href="#" className="text-grayText">About Us</a></div>
        <div><a href="#" className="text-grayText">Contact Us</a></div>
        <div><a href="#" className="text-secondaryColor">Inspection</a></div>
        <Image src="/images/postBtn.svg" alt="logo-img" width={100} height={200} />


      </div>

      <main className="min-h-[50%] bg-custom-gradient">
        <header className="text-white text-center py-16">
          <h1>A Premier Marketplace for Gamers</h1>
          <p className="mt-4 text-lg">Buy, Sell, and Upgrade Gaming Gear</p>
        </header>
      </main>
    </div>

  );
}
