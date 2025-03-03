"use client";
import CategorySelection from "@/components/publish-ad/CategorySelection";
import DetailSection from "@/components/publish-ad/DetailSection";
import MoreSpecification from "@/components/publish-ad/MoreSpecification";
import PriceComponent from "@/components/publish-ad/PriceComponent";
import ReviewSection from "@/components/publish-ad/ReviewSection";
import UploadImages from "@/components/publish-ad/UploadImages";
import { RootState } from "@/components/Store/Store";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { UploadFile } from "antd";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
  icon?: string;
}
const PublishAdd: React.FC = () => {
  const [selectComponentCategory, setSelectedComponentCategory] = useState({
    id: 0,
    name: "",
  });
  const router = useRouter();
  const [selectProcessorVariant, setSelectedProcessorVariant] = useState({
    id: 0,
    name: "",
  });
  const [selectProcessor, setSelectedProcessor] = useState({ id: 0, name: "" });
  const [selectRam, setSelectedRam] = useState({ id: 0, name: "" });
  const [selectGpu, setSelectedGpu] = useState({ id: 0, name: "" });
  const [selectStoarge, setSelectedStoarge] = useState({ id: 0, name: "" });
  const [selectStorageType, setSelectedStorageType] = useState({
    id: 0,
    name: "",
  });
  const [selectedCondition, setSelectedCondition] = useState({
    id: 0,
    name: "",
  });
  const [selectCategory, setSelectedCategory] = useState({ id: 0, name: "" });
  // const [selectedCategory, setSelectedCategory] = useState<Category | null>(
  //   null
  // );

  const [selectBrand, setSelectedBrand] = useState({ id: 0, name: "" });
  const [selectModel, setSelectedModel] = useState({ id: 0, name: "" });
  const [selectedLocation, setSelectedLocation] = useState({ id: 0, name: "" });
  const [conditioneData, setConditioneData] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [gpuData, setgpuData] = useState<any[]>([]);
  const [ramData, setRamData] = useState<any[]>([]);
  const [storageTypeData, setStorageTypeData] = useState<any[]>([]);
  const [storageData, setStorageData] = useState<any[]>([]);
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
    accessories: "",
    connectivity: "",
    warranty_status: "",
    location: "",
    otherBrandName: "",
  });
  const [componentCategories, setComponentCategories] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const token = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.id);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      setCategoryError("Failed to fetch categories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  useLayoutEffect(() => {
    if (!token) {
      return redirect("/auth/login");
    }
  }, []);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (activeStep === 0 && !selectCategory?.id) {
      toast.error("Please select a category before proceeding.");
      return;
    }
    if (activeStep === 1 && !selectBrand?.id) {
      toast.error("Please fill a brand before proceeding.");
      return;
    }
    if (
      activeStep === 1 &&
      (!formData?.title || !formData?.description || !selectBrand)
    ) {
      toast.error("Please provide all the required details.");
      return;
    }

    if (activeStep === 3 && (price === "0" || quantity === "0")) {
      toast.error("Please provide valid price and quantity.");
      return;
    }
    if (activeStep === 4 && fileList.length < 3) {
      toast.error("At least upload 3 images.");
      return;
    }

    // Mark step as completed before moving forward
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Function to handle step click (Allow navigation only to completed or previous steps)
  const handleStepClick = (index: number) => {
    if (index <= activeStep || completedSteps.includes(index)) {
      setActiveStep(index);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const fetchGPU = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpu/getAll`
      );
      setgpuData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchRam = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ram/getAll`
      );
      setRamData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchConditions = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getAll`
      );
      setConditioneData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchStorga = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorage`
      );
      setStorageData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };
  const fetchStorgaeType = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorageType`
      );
      setStorageTypeData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch locations.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStorga();
    fetchConditions();
    fetchStorgaeType();
    fetchRam();
    fetchGPU();
  }, []);
  const handleSubmit = async () => {
    let formDataObject = new FormData();

    formDataObject.append("name", formData.title);
    // @ts-ignore
    formDataObject.append("user_id", id.toString());
    formDataObject.append("description", formData.description);
    formDataObject.append("price", price.toString());
    formDataObject.append("stock", quantity.toString());
    formDataObject.append("brand_id", selectBrand.id.toString());
    formDataObject.append("otherBrandName", formData.otherBrandName);
    formDataObject.append("model_id", selectModel.id.toString());
    formDataObject.append("category_id", selectCategory.id.toString());
    formDataObject.append("condition", selectedCondition.id.toString());
    formDataObject.append("location", selectedLocation.id.toString());
    formDataObject.append("is_published", "true");

    if (selectCategory?.name === "Components") {
      formDataObject.append(
        "component_type",
        selectComponentCategory?.id.toString() || ""
      );
      formDataObject.append("text", formData.component_text);
    } else {
      formDataObject.append("ram", selectRam.id.toString());
      formDataObject.append("processor", selectProcessor.id.toString());
      formDataObject.append(
        "processorVariant",
        selectProcessorVariant.id.toString()
      );
      formDataObject.append("storage", selectStoarge.id.toString());
      formDataObject.append("storageType", selectStorageType.id.toString());
      formDataObject.append("graphics", formData.graphics);
      formDataObject.append("gpu", selectGpu.id.toString());
      formDataObject.append("ports", formData.ports);
      formDataObject.append("battery_life", formData.batteryLife);
      formDataObject.append("warranty_status", formData.warranty_status);
      formDataObject.append("connectivity", formData.connectivity);
      formDataObject.append("accessories", formData.accessories);
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
        router.push("/");
      }
    } catch (err) {
      toast.error("Error");
      console.log("Error", err);
    }
    console.log(formData, "my form data");
  };
  console.log(selectComponentCategory, "selectComponentCategory");

  // const handleStepClick = (index: number) => {
  //   if (index <= activeStep || completedSteps.includes(index)) {
  //     setActiveStep(index);
  //   }
  // };

  const steps = [
    {
      isCompleted: false,
      label: <span className="dark:text-white">Category Selection</span>,
      content: (
        <CategorySelection
          setActiveStep={setActiveStep}
          //@ts-ignore
          selectCategory={selectCategory}
          //@ts-ignore
          setSelectedCategory={setSelectedCategory}
          //@ts-ignore
          categories={categories}
          loadingCategories={loadingCategories}
          //@ts-ignore
          categoryError={categoryError}
        />
      ),
    },
    {
      isCompleted: false,
      label: <span className="dark:text-white">Details</span>,
      content: (
        <DetailSection
          handleFormChange={handleFormChange}
          selectModel={selectModel}
          setSelectedModel={setSelectedModel}
          selectBrand={selectBrand}
          formData={formData}
          selectCategory={selectCategory}
          setSelectedLocation={setSelectedLocation}
          selectedLocation={selectedLocation}
          setSelectedBrand={setSelectedBrand}
          setComponentCategories={setComponentCategories}
          conditioneData={conditioneData}
          setSelectedCondition={setSelectedCondition}
          selectedCondition={selectedCondition}
        />
      ),
    },
    {
      isCompleted: false,

      label: <span className="dark:text-white">More Specifications</span>,
      content: (
        <MoreSpecification
          selectCategory={selectCategory}
          formData={formData}
          handleFormChange={handleFormChange}
          selectComponentCategory={selectComponentCategory}
          setSelectedComponentCategory={setSelectedComponentCategory}
          componentCategories={componentCategories}
          selectProcessorVariant={selectProcessorVariant}
          setSelectedProcessorVariant={setSelectedProcessorVariant}
          selectProcessor={selectProcessor}
          setSelectedProcessor={setSelectedProcessor}
          gpuData={gpuData}
          ramData={ramData}
          storageTypeData={storageTypeData}
          storageData={storageData}
          selectGpu={selectGpu}
          setSelectedGpu={setSelectedGpu}
          setSelectedRam={setSelectedRam}
          selectRam={selectRam}
          selectStoarge={selectStoarge}
          setSelectedStoarge={setSelectedStoarge}
          selectStorageType={selectStorageType}
          setSelectedStorageType={setSelectedStorageType}
        />
      ),
    },

    {
      isCompleted: false,

      label: <span className="dark:text-white">Set Price</span>,
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
      isCompleted: false,

      label: <span className="dark:text-white">Upload Images</span>,
      content: (
        <div className="flex  justify-center items-center ">
          <UploadImages fileList={fileList} setFileList={setFileList} />
        </div>
      ),
    },
    {
      isCompleted: false,

      label: <span className="dark:text-white">Review</span>,
      content: (
        <ReviewSection
          selectCategory={selectCategory}
          selectBrand={selectBrand}
          selectModel={selectModel}
          formData={formData}
          price={price}
          quantity={quantity}
          selectLocation={selectedLocation}
          selectProcessor={selectProcessor}
          selectProcessorVariant={selectProcessorVariant}
          fileList={fileList}
          selectComponentCategory={selectComponentCategory?.name}
          selectGpu={selectGpu}
          selectRam={selectRam}
          selectStoarge={selectStoarge}
          selectStorageType={selectStorageType}
          selectedCondition={selectedCondition}
        />
      ),
    },
  ];

  return (
    <div className="dark:bg-[#1e1e2f]">
      <div className="container mx-auto p-6 ">
        {/* Responsive Stepper */}
        <div className="flex flex-wrap justify-center sm:flex-nowrap">
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className="w-full sm:w-auto"
            sx={{
              flexWrap: "wrap",
              "& .MuiStep-root": {
                minWidth: "60px", // Prevent excessive width
              },
              "& .MuiStepConnector-root": {
                display: { xs: "none", sm: "block" }, // Hide connectors on extra small screens
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  sx={{
                    "& .MuiStepIcon-root": {
                      fontSize: "20px", // Smaller step icons
                      color: activeStep >= index ? "#dc39fc" : "#ccc",
                    },
                    "& .MuiStepLabel-label": {
                      fontSize: { xs: "10px", sm: "14px" }, // Reduce label size
                      fontWeight: "500",
                    },
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Step Content */}
        <div className="mt-8">{steps[activeStep].content}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            className={`${
              activeStep != 0 && "bg-custom-gradient "
            } dark:text-white`}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              style={{
                backgroundColor: "#dc39fc",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="contained"
              className="bg-custom-gradient"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishAdd;
