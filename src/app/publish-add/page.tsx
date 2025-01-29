"use client";
import BrandSelection from "@/components/Publish-add/BrandSelection";
import CategorySelection from "@/components/Publish-add/CategorySelection";
import DetailSection from "@/components/Publish-add/DetailSection";
import MoreSpecification from "@/components/Publish-add/MoreSpecification";
import PriceComponent from "@/components/Publish-add/PriceComponent";
import UploadImages from "@/components/Publish-add/UploadImages";
import { RootState } from "@/components/Store/Store";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { UploadFile } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const PublishAdd: React.FC = () => {
  const [selectComponentCategory, setSelectedComponentCategory] = useState();
  const [selectCategory, setSelectedCategory] = useState({id:0,name:""});
  const [selectBrand, setSelectedBrand] = useState({id:0,name:""});
  const [selectModel, setSelectedModel] = useState({id:0,name:""});
  const [activeStep, setActiveStep] = useState<number>(0);
  const [price,setPrice]=useState("10")
  const [quantity,setQuantity]=useState("10")
  const [formData, setFormData] = useState<Record<string, any>>({
    processor: "",
  processor_type: "",
  ram: "",
  storage: "",
  screenSize: "",
  screenResolution: "",
  weight: "",
  title:"",
  condition:"",
  description:"",
  graphics: "",
  ports: "",
  batteryLife: "",
  color: "",
  component_text: "",
  });
  const [componentCategories, setComponentCategories] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const token = useSelector((state: RootState) => state.user.token);

 


  const handleNext = () => {
    if (activeStep === 0 && !selectCategory.id) {
      toast.error("Please select a category before proceeding.");
      return;
    }
    if (activeStep === 1 && !selectBrand.id) {
      toast.error("Please select a brand before proceeding.");
      return false;
    }
    if (activeStep === 2 && (!formData.title|| !formData.description|| !formData.condition|| !selectModel) ) {
      toast.error("Please provide all the following details.");
      return false;
    }
    setActiveStep((prevStep) => prevStep + 1);
    // }else if(activeStep==1){
    //   if(formData.category){
    //     setActiveStep((prevStep) => prevStep + 1);
    //   }
    // }
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
  
  const steps = [
    {
      label: "Category Selection",
      content: (
        <CategorySelection selectCategory={selectCategory} setSelectedCategory={setSelectedCategory}/>
      ),
    },
    {
      label: "Brand Selection",
      content: (
        <BrandSelection selectCategory={selectCategory} setComponentCategories={setComponentCategories} setSelectedBrand={setSelectedBrand} selectBrand={selectBrand}/>
      ),
    },
    {
      label: "Details",
      content: (
        <DetailSection handleFormChange={handleFormChange} selectModel={selectModel} setSelectedModel={setSelectedModel} selectBrand={selectBrand} formData={formData}/>
      ),
    },
    {
      label: "More Specifications",
      content: (
       <MoreSpecification selectCategory={selectCategory} formData={formData} handleFormChange={handleFormChange} selectComponentCategory={selectComponentCategory} setSelectedComponentCategory={setSelectedComponentCategory} componentCategories={componentCategories} />
      ),
    },

    {
      label: "Set Price",
      content: (
        <div className="flex flex-col space-y-4">
          <PriceComponent price={price} setPrice={setPrice} quantity={quantity} setQuantity={setQuantity}/>
        </div>
      ),
    },
    {
      label: "Upload Images",
      content: (
        <div className="flex  justify-center items-center ">
         <UploadImages fileList={fileList} setFileList={setFileList}/>
        </div>
      ),
    },
    {
      label: "Review",
      content: (
        <div className="text-center text-black">
        <h2 className="text-lg font-bold">Review Your Details</h2>
        <div className="text-left space-y-4 mt-4">
          <p>
            <strong>Category:</strong> {selectCategory?.name || "Not selected"}
          </p>
          <p>
            <strong>Brand:</strong> {selectBrand?.name || "Not selected"}
          </p>
          <p>
            <strong>Model:</strong> {selectModel?.name || "Not selected"}
          </p>
          <p>
            <strong>Details:</strong> {formData?.details || "Not provided"}
          </p>
          <p>
            <strong>Specifications:</strong>{" "}
            {formData.specifications || "Not provided"}
          </p>
          <p>
            <strong>Price:</strong> {formData?.price || "Not provided"}
          </p>
          <div>
            <strong>Images:</strong>
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
        <p className="text-gray-500 dark:text-white mt-4">
          Make sure all details are correct before publishing.
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
          <Button variant="contained" color="primary">
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
