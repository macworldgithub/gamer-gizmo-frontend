"use client";
import React, { useEffect, useState } from "react";
import PopularItemSection from "./PopularItemSection";
import Wrapper from "./Common/Wrapper/Wrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./Store/Store";

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

  useEffect(() => {
    fetchUsedLaptops();
    fetchNewLaptops();
    fetchUsedConsoles();
    fetchNewConsoles();
    fetchUsedDesktops();
    fetchNewDesktops();
  }, [fetcher]);
  return (
    <div className="h-auto w-full">
      <PopularItemSection
        title="Popular in Used Desktops"
        subtitle="Choose your necessary parts from this category."
        products={desktopUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Gaming PC Parts")}
      />

      <PopularItemSection
        title="Popular in New Desktops"
        subtitle="Choose your necessary gaming items from this category."
        products={desktopNewData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in Used Laptops"
        subtitle="Choose your necessary gaming items from this category."
        products={LaptopUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Laptops"
        subtitle="Choose your necessary gaming items from this category."
        explorePath="/"
        products={LaptopNewData}
        seReftech={seReftech}
        refetch={fetcher}
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in Used Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={consolesUsedData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Used Consoles")}
      />
      <PopularItemSection
        title="Popular in New Consoles"
        subtitle="Choose your necessary gaming items from this category."
        products={consolesNewData}
        seReftech={seReftech}
        refetch={fetcher}
        explorePath="/"
        onExplore={() => console.log("Explore Used Consoles")}
      />
    </div>
  );
};

export default PopularMainSection;
