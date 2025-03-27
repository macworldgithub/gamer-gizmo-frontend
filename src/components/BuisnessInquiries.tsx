"use client";
import React, { useState } from "react";
import Form from "./Form";
import CommonCard from "./CommonCard";
import Wrapper from "./Common/Wrapper/Wrapper";

// Define props type
interface CardContent {
  title: string;
  description: string;
  note: string;
}

const BuisnessInquiries: React.FC<{ cardContent: CardContent }> = ({
  cardContent,
}) => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactName: "",
    companyEmail: "",
    requirements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add form submission logic here
  };

  return (
    <Wrapper>
      <div className="w-full flex flex-col lg:flex-row justify-center items-start dark:bg-[#0D0D12] max-lg:gap-7  max-lg:mb-10 p-6 h-auto   lg:pb-28">
        {/* Card Content */}
        <div className="w-full lg:w-[55%]">
          <CommonCard
            title={cardContent.title}
            description={cardContent.description}
            note={cardContent.note}
            bannerShow={true}
            bannerCount={2}
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-[45%]  max-lg:flex-col max-lg:justify-start max-lg:items-start">
          <Form
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default BuisnessInquiries;
