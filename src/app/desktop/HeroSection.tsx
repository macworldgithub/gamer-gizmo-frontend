"use client";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import FreeAdSection from "@/components/FreeAdSection";
import LiveAdSection from "@/components/LiveAd";
import ProductMain from "@/components/ProductMain";
import SelectLabels from "@/components/SelectLabels";
import { useRouter } from "next/navigation";

const HeroSection = ({ query }: any) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-black w-full h-auto">
      <div className=" w-[100%] bg-[#F9F9F9] h-auto dark:bg-secondaryBlack dark:text-white">
        <div className="w-[100%] flex flex-col xl:flex-row relative justify-around items-center  mx-auto space-y-8 md:space-y-0">
          <div className="flex w-full   justify-center items-center gap-4">
            <SelectLabels query={query} route={"desktop"} />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-black">
        <Wrapper>
          <div className="w-full h-auto dark:bg-black mb-2">
            {/* <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0"> */}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start max-sm:gap-[0.5rem] ">
             
              <ProductMain query={query} categoryId={2} />
            </div>
            {/* </Wrapper> */}
          </div>
        </Wrapper>
       
      </div>

      {/* Free Ad Section */}
      {/* <FreeAdSection /> */}
      {/* <Inspection /> */}
      {/* {loading && <CustomLoader />} */}
    </div>
  );
};

export default HeroSection;
