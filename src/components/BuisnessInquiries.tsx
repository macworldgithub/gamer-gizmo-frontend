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
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 p-6 h-[40rem] max-lg:h-auto">
        {/* Card Content */}
        <div className="w-full lg:w-2/3">
          <CommonCard
            title={cardContent.title}
            description={cardContent.description}
            note={cardContent.note}
          />
        </div>

        {/* Form Section */}
        <div className="w-[20rem] lg:w-1/3">
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
