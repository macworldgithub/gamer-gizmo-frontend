import React from "react";
import PopularItemSection from "./PopularItemSection";

const PopularMainSection: React.FC = () => {
  const gamingPCParts = [
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
  ];

  const usedConsoles = [
    {
      id: 1,
      name: "PlayStation Portal...",
      description: "Experience the ultimate gaming...",
      price: "AED 551.00",
      imageUrl: "/images/consoles.png",
    },
    {
      id: 2,
      name: "Sony PlayStation 5.",
      description: "High-quality Xbox controller...",
      price: "AED 422.64",
      imageUrl: "/images/consoles2.png",
    },
    {
      id: 3,
      name: "Xbox Elite Wireless.",
      description: "High-quality Xbox controller...",
      price: "AED 422.64",
      imageUrl: "/images/consoles3.png",
    },
    {
      id: 4,
      name: "Xbox Series S 512GB",
      description: "High-quality Xbox controller...",
      price: "AED 422.64",
      imageUrl: "/images/consoles4.png",
    },
    {
      id: 5,
      name: "Xbox Series X 1TB.",
      description: "High-quality Xbox controller...",
      price: "AED 422.64",
      imageUrl: "/images/consoles5.png",
    },
  ];

  return (
    <div className="h-auto w-[70rem] mx-auto ">
      <PopularItemSection 
        title="Popular in Used Gaming PC Parts"
        subtitle="Choose your necessary parts from this category."
        products={gamingPCParts}
        onExplore={() => console.log("Explore Gaming PC Parts")}
      />
      <PopularItemSection
        title="Popular in Used Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={usedConsoles}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Gaming PC Parts"
        subtitle="Choose your necessary gaming items from this category."
        products={usedConsoles}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={usedConsoles}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in Used Laptops"
        subtitle="Choose your necessary gaming items from this category."
        products={usedConsoles}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Laptops"
        subtitle="Choose your necessary gaming items from this category."
        products={usedConsoles}
        onExplore={() => console.log("Explore Used Consoles")}
      />
    </div>
  );
};

export default PopularMainSection;
