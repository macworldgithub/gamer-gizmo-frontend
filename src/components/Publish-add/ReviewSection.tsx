import React from "react";
import { UploadFile } from "antd";

interface ReviewSectionProps {
  selectCategory: { id: number; name: string };
  selectBrand: { id: number; name: string };
  selectModel: { id: number; name: string };
  formData: Record<string, any>;
  price: string;
  quantity: string;
  fileList: UploadFile[];
  selectComponentCategory: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  selectCategory,
  selectBrand,
  selectModel,
  formData,
  price,
  quantity,
  fileList,
  selectComponentCategory,
}) => {
  const details = [
    { label: "Category", value: selectCategory?.name },
    { label: "Brand", value: selectBrand?.name },
    { label: "Model", value: selectModel?.name },
    { label: "Title", value: formData.title },
    { label: "Description", value: formData.description },
    { label: "Condition", value: formData.condition },
    { label: "Price", value: price },
    { label: "Quantity", value: quantity },
  ];

  const laptopDetails = [
    { label: "Processor", value: formData.processor },
    { label: "Processor Type", value: formData.processor_type },
    { label: "RAM", value: formData.ram },
    { label: "Storage", value: formData.storage },
    { label: "Screen Size", value: formData.screenSize },
    { label: "Screen Resolution", value: formData.screenResolution },
    { label: "Weight", value: formData.weight },
    { label: "Graphics", value: formData.graphics },
    { label: "Ports", value: formData.ports },
    { label: "Battery Life", value: formData.batteryLife },
    { label: "Color", value: formData.color },
  ];

  const componentDetails = [
    { label: "Component Category", value: selectComponentCategory },
    { label: "Component Text", value: formData.component_text },
  ];

  return (
    <div className="p-8 bg-custom-gradient shadow-2xl rounded-xl border border-gray-200 max-w-3xl mx-auto text-gray-900">
      <h2 className="text-4xl font-extrabold text-white text-center mb-6">
        Review Your Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        {details.map(({ label, value }, index) => (
          <div key={index} className="bg-white p-3 rounded-md">
            <p className="text-black text-xl font-bold">{label}</p>
            <p className="text-gray-500 font-semibold text-base">{value || "Not provided"}</p>
          </div>
        ))}

        {["Laptops", "Desktops"].includes(selectCategory?.name) &&
          laptopDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black text-xl font-bold">{label}</p>
              <p  className="text-gray-500 font-semibold">{value || "Not provided"}</p>
            </div>
          ))}

        {selectCategory?.name === "Components" &&
          componentDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black font-bold text-xl">{label}</p>
              <p>{value || "Not provided"}</p>
            </div>
          ))}
      </div>

      {/* Uploaded Images */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Uploaded Images:
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {fileList.length > 0 ? (
            fileList.map((file, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md border border-gray-300"
              >
                <img
                  src={URL.createObjectURL(file.originFileObj as Blob)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full  h-32 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-white">No images uploaded.</p>
          )}
        </div>
      </div>

      <p className="text-white mt-6 text-center italic">
        Ensure all details are correct before submitting.
      </p>
    </div>
  );
};

export default ReviewSection;
