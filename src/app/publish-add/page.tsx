"use client";
import CategorySelection from "@/components/Publish-add/CategorySelection";
import DetailSection from "@/components/Publish-add/DetailSection";
import MoreSpecification from "@/components/Publish-add/MoreSpecification";
import PriceComponent from "@/components/Publish-add/PriceComponent";
import UploadImages from "@/components/Publish-add/UploadImages";
import { RootState } from "@/components/Store/Store";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { UploadFile } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PublishAdd: React.FC = () => {
  const [selectComponentCategory, setSelectedComponentCategory] = useState({
    id: 0,
    name: "",
  });
  const router = useRouter();
  const [selectCategory, setSelectedCategory] = useState({ id: 0, name: "" });
  const [selectBrand, setSelectedBrand] = useState({ id: 0, name: "" });
  const [selectModel, setSelectedModel] = useState({ id: 0, name: "" });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [formData, setFormData] = useState<Record<string, any>>({
    processor: "",
    processor_type: "",
    ram: "",
    os: "",
    storage: "",
    screenSize: "",
    screenResolution: "",
    weight: "",
    title: "",
    condition: "",
    description: "",
    graphics: "",
    ports: "",
    batteryLife: "",
    color: "",
    component_text: "",
  });
  const [componentCategories, setComponentCategories] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.id);

  const handleNext = () => {
    if (activeStep === 0 && !selectCategory.id) {
      toast.error("Please select a category before proceeding.");
      return;
    }
    if (activeStep === 1 && !selectBrand.id) {
      toast.error("Please select a brand before proceeding.");
      return false;
    }
    if (
      activeStep === 2 &&
      (!formData.title ||
        !formData.description ||
        !formData.condition ||
        !selectModel)
    ) {
      toast.error("Please provide all the following details.");
      return false;
    }
    if (activeStep === 4 && (price == "0" || quantity == "0")) {
      toast.error("Please provide all the following details.");
      return false;
    }
    if (activeStep === 5 && fileList.length < 3) {
      toast.error("Atleast Upload 3 Images");
      return false;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    let formDataObject = new FormData();

    formDataObject.append("name", formData.title);
    // @ts-ignore
    formDataObject.append("user_id", id.toString());
    formDataObject.append("description", formData.description);
    formDataObject.append("price", price.toString());
    formDataObject.append("stock", quantity.toString());
    formDataObject.append("brand_id", selectBrand.id.toString());
    formDataObject.append("model_id", selectModel.id.toString());
    formDataObject.append("category_id", selectCategory.id.toString());
    formDataObject.append("condition", formData.condition);
    formDataObject.append("is_published", "true");

    if (selectCategory?.name === "Components") {
      formDataObject.append(
        "component_type",
        selectComponentCategory?.name || ""
      );
      formDataObject.append("text", formData.component_text);
    } else {
      formDataObject.append("ram", formData.ram);
      formDataObject.append("processor", formData.processor);
      formDataObject.append("processorType", formData.processor_type);
      formDataObject.append("storage", formData.storage);
      formDataObject.append("graphics", formData.graphics);
      formDataObject.append("ports", formData.ports);
      formDataObject.append("os", formData.os);
      formDataObject.append("battery_life", formData.batteryLife);
      formDataObject.append("screen_size", formData.screenSize);
      formDataObject.append("weight", formData.weight);
      formDataObject.append("screen_resolution", formData.screenResolution);
      formDataObject.append("color", formData.color);
    }
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        console.log(file);
        formDataObject.append("images", file.originFileObj as Blob);
      });
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/createProduct`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.status = 200)) {
        toast.success("Product Added Sucessfully");
        router.push("/publish-add");
      }
    } catch (err) {
      toast.error("Error");
      console.log("Error", err);
    }
  };

  const steps = [
    {
      label: "Category Selection",
      content: (
        <CategorySelection
          selectCategory={selectCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ),
    },
    {
      label: "Details",
      content: (
        <DetailSection
          handleFormChange={handleFormChange}
          selectModel={selectModel}
          setSelectedModel={setSelectedModel}
          selectBrand={selectBrand}
          formData={formData}
          selectCategory={selectCategory}
          setSelectedBrand={setSelectedBrand}
          setComponentCategories={setComponentCategories}
        />
      ),
    },
    {
      label: "More Specifications",
      content: (
        <MoreSpecification
          selectCategory={selectCategory}
          formData={formData}
          handleFormChange={handleFormChange}
          selectComponentCategory={selectComponentCategory}
          setSelectedComponentCategory={setSelectedComponentCategory}
          componentCategories={componentCategories}
        />
      ),
    },

    {
      label: "Set Price",
      content: (
        <div className="flex flex-col space-y-4">
          <PriceComponent
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      ),
    },
    {
      label: "Upload Images",
      content: (
        <div className="flex  justify-center items-center ">
          <UploadImages fileList={fileList} setFileList={setFileList} />
        </div>
      ),
    },
    {
      label: "Review",
      content: (
        <div className="p-6 bg-white rounded shadow-md text-black">
          <h2 className="text-2xl font-bold mb-4">Review Your Details</h2>
          <div className="space-y-3">
            <p>
              <strong>Category:</strong>{" "}
              {selectCategory?.name || "Not selected"}
            </p>
            <p>
              <strong>Brand:</strong> {selectBrand?.name || "Not selected"}
            </p>
            <p>
              <strong>Model:</strong> {selectModel?.name || "Not selected"}
            </p>
            <p>
              <strong>Title:</strong> {formData.title || "Not provided"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {formData.description || "Not provided"}
            </p>
            <p>
              <strong>Condition:</strong> {formData.condition || "Not provided"}
            </p>
            <p>
              <strong>Price:</strong> {price || "Not provided"}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity || "Not provided"}
            </p>
            {["Laptops", "Desktops"].includes(selectCategory.name) && (
              <>
                <p>
                  <strong>Processor:</strong>{" "}
                  {formData.processor || "Not provided"}
                </p>
                <p>
                  <strong>Processor Type:</strong>{" "}
                  {formData.processor_type || "Not provided"}
                </p>
                <p>
                  <strong>RAM:</strong> {formData.ram || "Not provided"}
                </p>
                <p>
                  <strong>Storage:</strong> {formData.storage || "Not provided"}
                </p>
                <p>
                  <strong>Screen Size:</strong>{" "}
                  {formData.screenSize || "Not provided"}
                </p>
                <p>
                  <strong>Screen Resolution:</strong>{" "}
                  {formData.screenResolution || "Not provided"}
                </p>
                <p>
                  <strong>Weight:</strong> {formData.weight || "Not provided"}
                </p>

                <p>
                  <strong>Graphics:</strong>{" "}
                  {formData.graphics || "Not provided"}
                </p>
                <p>
                  <strong>Ports:</strong> {formData.ports || "Not provided"}
                </p>
                <p>
                  <strong>Battery Life:</strong>{" "}
                  {formData.batteryLife || "Not provided"}
                </p>
                <p>
                  <strong>Color:</strong> {formData.color || "Not provided"}
                </p>
              </>
            )}
            {selectCategory?.name === "Components" && (
              <>
                <p>
                  <strong>Component Category:</strong>{" "}
                  {selectComponentCategory || "Not provided"}
                </p>
                <p>
                  <strong>Component Text:</strong>{" "}
                  {formData.component_text || "Not provided"}
                </p>
              </>
            )}

            <div>
              <strong>Uploaded Images:</strong>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {fileList.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file.originFileObj as Blob)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-500 mt-4">
            Ensure all details are correct before submitting.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-8">{steps[activeStep].content}</div>
      <div className="flex justify-between mt-6">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
          >
            Publish
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default PublishAdd;
