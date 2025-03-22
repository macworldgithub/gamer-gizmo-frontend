"use client";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import CustomLoader from "@/components/CustomLoader";
import FreeAdSection from "@/components/FreeAdSection";
import Inspection from "@/components/Inspection";
import ProductCard from "@/components/ProductCard";
import ProductMain from "@/components/ProductMain";
import SelectLabels from "@/components/SelectLabels";
import { RootState } from "@/components/Store/Store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LaptopHeroSection = ({ query }: any) => {
  // const token = useSelector((state: RootState) => state.user.token);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [fetcher, seReftech] = useState(false);
  // const fetch = async () => {
  //   try {
  //     const filteredValues = Object.fromEntries(
  //       Object.entries(query).filter(([key, value]) => value !== "")
  //     );

  //     // @ts-expect-error
  //     const queryParams = new URLSearchParams(filteredValues).toString();
  //     setLoading(true);
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=1&${queryParams}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if ((response.status = 200)) {
  //       setData(response.data.data);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //     toast.error("Error");
  //   }
  // };
  // useEffect(() => {
  //   fetch();
  // }, [query, fetcher]);
  return (
    <div className="bg-white dark:bg-black w-full h-auto">
      {/* Main Content */}
      <div className=" w-[100%] bg-[#F9F9F9] h-auto dark:bg-secondaryBlack pt-1 dark:text-white">
        <div className="w-[100%] flex flex-col xl:flex-row relative justify-around items-center  mx-auto">
          <div className="flex w-full   justify-center items-center gap-4 ">
            <SelectLabels query={query} route={"laptops"} />
          </div>
 
          
        </div>
      </div>
      <div className=" dark:bg-black bg-gray-50 ">
        <Wrapper>
          <div className="w-full h-auto dark:bg-black">
            <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
             
              <ProductMain query={query} categoryId={1} />
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

export default LaptopHeroSection;
