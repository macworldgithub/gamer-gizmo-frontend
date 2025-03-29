"use client";
import React, { useEffect, useState } from "react";
import PopularItemSection from "./PopularItemSection";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";
import LiveAdSection from "./LiveAd";
import Wrapper from "./Common/Wrapper/Wrapper";

const PopularMainSection: React.FC = () => {
  const [LaptopUsedData, setLaptopUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [LaptopNewData, setLaptopNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [consolesNewData, setConsolesNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [consolesUsedData, setConsolesUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [desktopNewData, setDesktopNewData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const [desktopUsedData, setDesktopUsedData] = useState([
    {
      id: 1,
      name: "Radeon RX 580 OC...",
      description: "Powerful graphics card for gaming...",
      price: "AED 551.00",
      // images: ["/images/gpu.png"],
    },
  ]);
  const ConsoleCategory = "Gaming Consoles";
  const consoleCondition = 2;
  const explorePath = `/${encodeURIComponent(
    ConsoleCategory
  )}?condition=${consoleCondition}`;
  const [componentsUsedData, setComponentsUsedData] = useState([]);
  const [componentsNewData, setComponentsNewData] = useState([]);
  const token = useSelector((state: RootState) => state.user.token);
  const [fetcher, seReftech] = useState(false);

  const fetchUsedDesktops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=2&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDesktopUsedData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchNewDesktops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=2&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDesktopNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchUsedConsoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=4&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setConsolesUsedData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchNewConsoles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=4&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setConsolesNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchUsedLaptops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=1&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLaptopUsedData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  const fetchNewLaptops = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=1&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLaptopNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

  const fetchUsedComponents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=3&condition=2`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComponentsUsedData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };

  const fetchNewComponents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=3&condition=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComponentsNewData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch models.");
    }
  };
  useEffect(() => {
    fetchUsedLaptops();
    fetchNewLaptops();
    fetchUsedConsoles();
    fetchNewConsoles();
    fetchUsedDesktops();
    fetchNewDesktops();
    fetchUsedComponents();
    fetchNewComponents();
  }, [fetcher]);
  return (
    <div className="h-auto w-full">
      <PopularItemSection
        title="Popular in Used Gaming PCs"
        subtitle="Choose your necessary parts from this category."
        products={desktopUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/desktop?condition=2`}
        onExplore={() => console.log("Explore Gaming PC Parts")}
      />

      <PopularItemSection
        title="Popular in New Gaming PCs"
        subtitle="Choose your necessary gaming items from this category."
        products={desktopNewData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/desktop?condition=1`}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in Used Laptops"
        subtitle="Choose your necessary gaming items from this category."
        products={LaptopUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/laptops?condition=2`}
        onExplore={() => console.log("Explore Used Consoles")}
      />
       <div className="w-full flex flex-col sm:flex-row gap-6 mt-2 max-w-6xl mx-auto mb-4">
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40 " />
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40" />
      </div>
      <PopularItemSection
        title="Popular in New Laptops"
        subtitle="Choose your necessary gaming items from this category."
        products={LaptopNewData}
        seReftech={seReftech}
        explorePath={`/laptops?condition=1`}
        refetch={fetcher}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in Used Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={consolesUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/console?condition=2`}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={consolesNewData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/console?condition=1`}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <div className="w-full flex flex-col sm:flex-row gap-6 mt-2 max-w-6xl mx-auto mb-4">
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40 " />
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40" />
      </div>
      <PopularItemSection
        title="Popular in Used Components"
        subtitle="Choose your necessary gaming items from this category."
        products={componentsUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/components?condition=2`}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Components"
        subtitle="Choose your necessary gaming items from this category."
        products={componentsNewData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath={`/components?condition=1`}
        onExplore={() => console.log("Explore New Components")}
      />
      <div className="w-full flex flex-col sm:flex-row gap-6 mt-2 max-w-6xl mx-auto mb-4">
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40 " />
        <LiveAdSection className="w-1/2 md:h-52 max-md:h-40" />
      </div>
    </div>
  );
};

export default PopularMainSection;
