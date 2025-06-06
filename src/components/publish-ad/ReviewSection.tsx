import React from "react";
import { UploadFile } from "antd";

interface ReviewSectionProps {
  selectCategory: { id: number; name: string };
  selectBrand: { id: number; name: string };
  selectModel: { id: number; name: string };
  selectProcessorVariant: { id: number; name: string };
  selectLocation: { id: number; name: string };
  selectProcessor: { id: number; name: string };
  formData: Record<string, any>;
  price: string;
  quantity: string;
  fileList: UploadFile[];
  selectComponentCategory: string;
  selectGpu: any;
  selectRam: any;
  selectStoarge: any;
  selectStorageType: any;
  selectedCondition: any;
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
  selectLocation,
  selectProcessor,
  selectProcessorVariant,
  selectGpu,
  selectRam,
  selectStoarge,
  selectStorageType,
  selectedCondition,
}) => {
  const details = [
    { label: "Category", value: selectCategory?.name },
    {
      label: "Brand",
      value: selectBrand?.name ? selectBrand?.name : formData.otherBrandName,
    },
    { label: "Model", value: selectModel?.name },
    { label: "Title", value: formData.title },
    { label: "Description", value: formData.description },
    { label: "Condition", value: selectedCondition.name },
    { label: "Location", value: selectLocation.name },
    { label: "Price", value: price },
    { label: "Quantity", value: quantity },
  ];
  if (selectBrand?.name == "Others") {
    details.push({
      label: "Other Brand Name",
      value: formData.otherBrandName,
    });
  }
  const laptopDetails = [
    { label: "Processor", value: selectProcessor.name ? selectProcessor.name : null },
    { label: "Processor Type", value: selectProcessorVariant.name ? selectProcessorVariant.name : null },
    { label: "RAM", value: selectRam.name ? selectRam.name : null },
    { label: "Storage Type", value: selectStorageType.name ? selectStorageType.name : null },
    { label: "Storage", value: selectStoarge.name ? selectStoarge.name : null },
    { label: "GPU", value: selectGpu.name ? selectGpu.name : null },
    { label: "Screen Size", value: formData.screenSize ? formData.screenSize : null },
    { label: "Screen Resolution", value: formData.screenResolution ? formData.screenResolution : null },
    { label: "Weight", value: formData.weight ? formData.weight : null },
    { label: "Graphics", value: formData.graphics ? formData.graphics : null },
    { label: "Ports", value: formData.ports ? formData.ports : null },
    { label: "Battery Life", value: formData.batteryLife ? formData.batteryLife : null },
    { label: "Color", value: formData.color ? formData.color : null },
  ];
  const consoleDetails = [
    { label: "Color", value: formData.color },
    { label: "Accessories", value: formData.accessories },
    { label: "Connectivity", value: formData.connectivity },
    { label: "Warranty Status", value: formData.warranty_status },
    { label: "Battery Life", value: formData.batteryLife },
  ];
  const desktopDetails = [
    { label: "Processor", value: selectProcessor.name },
    { label: "Processor Type", value: selectProcessorVariant.name },
    { label: "RAM", value: selectRam.name },
    { label: "Storage Type", value: selectStorageType.name },
    { label: "Storage", value: selectStoarge.name },
    { label: "GPU", value: selectGpu.name },
    { label: "Graphics", value: formData.graphics },
    { label: "Ports", value: formData.ports },
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
            <p className="text-gray-500 font-semibold text-base">
              {value || "Not provided"}
            </p>
          </div>
        ))}

        {["Gaming PCs", "Desktops"].includes(selectCategory?.name) &&
          desktopDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black text-xl font-bold">{label}</p>
              <p className="text-gray-500 font-semibold">
                {value || "Not provided"}
              </p>
            </div>
          ))}

        {["Laptops"].includes(selectCategory?.name) &&
          laptopDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black text-xl font-bold">{label}</p>
              <p className="text-gray-500 font-semibold">
                {value || "Not provided"}
              </p>
            </div>
          ))}

        {["Components and Accessories", "Components"].includes(selectCategory?.name) &&
          componentDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black text-xl font-bold">{label}</p>
              <p className="text-gray-500 font-semibold">
                {value || "Not provided"}
              </p>
            </div>
          ))}

        {["Gaming Consoles"].includes(selectCategory?.name) &&
          consoleDetails.map(({ label, value }, index) => (
            <div key={index} className="bg-white p-3 rounded-md">
              <p className="text-black text-xl font-bold">{label}</p>
              <p className="text-gray-500 font-semibold">
                {value || "Not provided"}
              </p>
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
