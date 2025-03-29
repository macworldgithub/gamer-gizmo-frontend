"use client";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import CustomLoader from "@/components/CustomLoader";
import FreeAdSection from "@/components/FreeAdSection";
import ProductMain from "@/components/ProductMain";
import SelectLabels from "@/components/SelectLabels";
import { RootState } from "@/components/Store/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const HeroSection = ({ query }: any) => {
  const token = useSelector((state: RootState) => state.user.token);
 
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [fetcher, seReftech] = useState(false);

  return (
    <div className="bg-white dark:bg-black w-full h-auto">
      <div className=" mt-1 w-[100%] bg-[#F9F9F9] h-auto dark:bg-secondaryBlack dark:text-white">
        <div className="w-[100%] flex flex-col xl:flex-row relative justify-around items-center  mx-auto s">
          <div className="flex w-full  justify-center items-center gap-4 ">
            <SelectLabels query={query} route={"console"} />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 mb-2 dark:bg-black">
        <Wrapper>
          <div className="w-full h-auto dark:bg-black">
            <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start max-sm:gap-[0.5rem] ">
                <ProductMain categoryId={4} query={query} />
              </div>
            </Wrapper>
          </div>
        </Wrapper>
      </div>
      <FreeAdSection/>
      {/* <Inspection /> */}
      {loading && <CustomLoader />}
    </div>
  );
};

export default HeroSection;
