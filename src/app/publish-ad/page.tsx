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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

interface Category {
  id: number;
  name: string;
  icon?: string;
}
const PublishAdd: React.FC = () => {
  const [selectComponentCategory, setSelectedComponentCategory] =
    useState<any>(null);

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
  const [formData, setFormData] = useState<Record<string, string | null>>({
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
  console.log(selectCategory, "..");
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
    // if (activeStep === 1 && !selectBrand?.id) {
    //   toast.error("Please fill a brand before proceeding.");
    //   return;
    // }
    if (
      activeStep === 1 &&
      (!formData?.title || !formData?.description || !selectBrand)
    ) {
      toast.error("Please provide all the required details.");
      return;
    }
    if (activeStep === 1 && (!selectedLocation || !selectedLocation.id)) {
      toast.error("Please select a location before proceeding.");
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

  // Function to skip the current step
  const handleSkip = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsLoading(true);
    setIsPublished(false);

    let formDataObject = new FormData();

    formDataObject.append("name", formData.title || "");
    formDataObject.append("user_id", id?.toString() || "");
    formDataObject.append("description", formData.description || "");
    formDataObject.append("price", price?.toString() || "");
    formDataObject.append("stock", quantity?.toString() || "");
    formDataObject.append("brand_id", selectBrand?.id?.toString() || "");
    formDataObject.append("otherBrandName", formData.otherBrandName || "");
    formDataObject.append("model_id", selectModel?.id?.toString() || "");
    formDataObject.append("category_id", selectCategory?.id?.toString() || "");
    formDataObject.append("condition", selectedCondition?.id?.toString() || "");
    formDataObject.append("location", selectedLocation?.id?.toString() || "");
    formDataObject.append("is_published", "true");

    if (selectCategory?.name === "Components and Accessories") {
      formDataObject.append(
        "component_type",
        selectComponentCategory?.id || "0"
      );
      formDataObject.append("text", formData?.component_text || "");
    } else if (selectCategory?.name === "Gaming Consoles") {
      formDataObject.append("accessories", formData.accessories || "");
      formDataObject.append("connectivity", formData.connectivity || "");
      formDataObject.append("warranty_status", formData.warranty_status || "");
      formDataObject.append("battery_life", formData.batteryLife || "");
      formDataObject.append("color", formData.color || "");
    } else {
      if (selectRam?.id) formDataObject.append("ram", selectRam.id.toString());
      if (selectStoarge?.id)
        formDataObject.append("storage", selectStoarge.id.toString());
      if (selectStorageType?.id)
        formDataObject.append("storageType", selectStorageType.id.toString());

      formDataObject.append("graphics", formData.graphics || "");
      if (selectGpu?.id) formDataObject.append("gpu", selectGpu.id.toString());
      formDataObject.append("ports", formData.ports || "");
      formDataObject.append("battery_life", formData.batteryLife || "");
      formDataObject.append("warranty_status", formData.warranty_status || "");
      formDataObject.append("connectivity", formData.connectivity || "");
      formDataObject.append("accessories", formData.accessories || "");
      formDataObject.append("screen_size", formData.screenSize || "");
      formDataObject.append("weight", formData.weight || "");
      formDataObject.append(
        "screen_resolution",
        formData.screenResolution || ""
      );
      formDataObject.append("color", formData.color || "");
    }

    // ✅ New Part: Check and Compress Images
    const MAX_IMAGES = 5;
    const MAX_IMAGE_SIZE_MB = 0.5; // 500 KB

    if (fileList.length > MAX_IMAGES) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES} images.`);
      setIsLoading(false);
      isSubmittingRef.current = false;
      return;
    }

    if (fileList.length > 0) {
      for (const file of fileList) {
        let fileObj = file.originFileObj as File;
        let fileSizeMB = fileObj.size / 1024 / 1024;

        if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
          try {
            const compressedFile = await imageCompression(fileObj, {
              maxSizeMB: MAX_IMAGE_SIZE_MB,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            });
            formDataObject.append("images", compressedFile);
          } catch (compressErr) {
            console.error("Image compression error:", compressErr);
            toast.error("Failed to compress image.");
          }
        } else {
          formDataObject.append("images", fileObj);
        }
      }
    }

    console.log(formData, "Form Data to be sent");

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

      if (response.status === 201) {
        toast.success("Product Added Successfully");
        setIsPublished(true);
        router.push("/");
      }
    } catch (err) {
      toast.error("Error submitting product");
      console.log("Error", err);
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
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
          handleSkip={handleSkip}
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
                minWidth: "60px",
              },
              "& .MuiStepConnector-root": {
                display: { xs: "none", sm: "block" },
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
              onClick={handleSubmit}
              variant="contained"
              style={{
                backgroundColor: "#dc39fc",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              disabled={isLoading || isSubmittingRef.current}
            >
              {isLoading ? "Publishing..." : "Publish"}
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
