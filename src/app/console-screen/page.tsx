import React from "react";
import ConsoleHeader from "./ConsoleHeader";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import PopularItemSection from "@/components/PopularItemSection";
import Inspection from "@/components/Inspection";

const page = () => {
  const usedConsoles = [
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      imageUrl: "/images/gpu.png",
    },
    {
      id: 2,
      name: "Asus ROG Hyperion...",
      description: "High-performance computer case...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu2.png",
    },
    {
      id: 3,
      name: "MSI PRO B760M-E...",
      description:
        "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
      price: "AED 1914.95",
      imageUrl: "/images/gpu3.png",
    },
    {
      id: 4,
      name: "Bloody W95 Max RGB",
      description:
        "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
      price: "AED 1914.95",
      imageUrl: "/images/gpu4.png",
    },
    {
      id: 5,
      name: "Corsair VENGEANCE",
      description:
        "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu5.png",
    },
    {
      id: 6,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      imageUrl: "/images/gpu.png",
    },
    {
      id: 7,
      name: "Asus ROG Hyperion...",
      description: "High-performance computer case...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu2.png",
    },
    {
      id: 8,
      name: "MSI PRO B760M-E...",
      description:
        "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
      price: "AED 1914.95",
      imageUrl: "/images/gpu3.png",
    },
    {
      id: 9,
      name: "Bloody W95 Max RGB",
      description:
        "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
      price: "AED 1914.95",
      imageUrl: "/images/gpu4.png",
    },
    {
      id: 10,
      name: "Corsair VENGEANCE",
      description:
        "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu5.png",
    },
    {
      id: 11,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      imageUrl: "/images/gpu.png",
    },
    {
      id: 12,
      name: "Asus ROG Hyperion...",
      description: "High-performance computer case...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu2.png",
    },
    {
      id: 13,
      name: "MSI PRO B760M-E...",
      description:
        "The PRO Series is tailored to professionals from all walks of life. The lineup features... ",
      price: "AED 1914.95",
      imageUrl: "/images/gpu3.png",
    },
    {
      id: 4,
      name: "Bloody W95 Max RGB",
      description:
        "The A4Tech W95 Max Bloody mouse is the optimal solution for those looking for a high-quality and productive mouse",
      price: "AED 1914.95",
      imageUrl: "/images/gpu4.png",
    },
    {
      id: 5,
      name: "Corsair VENGEANCE",
      description:
        "CORSAIR VENGEANCE RGB PRO Series DDR4 overclocked memory lights up your PC with mesmerizing ...",
      price: "AED 1914.95",
      imageUrl: "/images/gpu5.png",
    },
  ];
  return (
    <div>
      <ConsoleHeader />
    </div>
  );
};

export default page;
