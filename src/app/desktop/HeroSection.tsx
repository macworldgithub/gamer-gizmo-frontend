"use client";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import SelectLabels from "@/components/SelectLabels";
import Image from "next/image";
import CustomLoader from "@/components/CustomLoader";
import Inspection from "@/components/Inspection";
import { RootState } from "@/components/Store/Store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/navigation";

const HeroSection = ({ query }: any) => {
  const token = useSelector((state: RootState) => state.user.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [fetcher, seReftech] = useState(false);

  const fetch = async () => {
    try {
      const filteredValues = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => value !== "")
      );

      // @ts-expect-error
      const queryParams = new URLSearchParams(filteredValues).toString();
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=2&${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ((response.status = 200)) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetch();
  }, [query, fetcher]);
  return (
    <div className="bg-white dark:bg-black w-full h-auto">
      <div className="py-28 max-lg:py-8 w-[100%] bg-[#F9F9F9] h-auto dark:bg-secondaryBlack dark:text-white">
        <div className="w-[100%] flex flex-col xl:flex-row relative justify-around items-center  mx-auto space-y-8 md:space-y-0">
          <div className="flex w-full max-lg:min-h-[50%] max-xl:max-h-[75%]  justify-center items-center gap-4 xl:absolute xl:-top-36 md:pb-16">
            <SelectLabels query={query} route={"desktop"} />
          </div>
          {/* Free Ad Section */}
          <Wrapper>
            <div className="dark:bg-secondaryBlack dark:text-white text-gray-800  flex justify-center gap-4 max-md:flex-col items-center">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    src="/images/adds.png"
                    alt="Free Ad"
                    width={50}
                    height={50}
                  />
                </div>
                <h3 className="md:text-xl font-semibold max-md:text-lg">
                  Free Ad
                </h3>
                <p className=" md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                  Post your ads for free in 30 seconds at a better price.
                </p>
              </div>
              {/* Genuine Buyer Section */}
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    src="/images/handshake.png"
                    alt="Genuine Buyer"
                    width={50}
                    height={50}
                  />
                </div>
                <h3 className="md:text-xl font-semibold max-md:text-lg">
                  Genuine Buyer
                </h3>
                <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                  Get authentic offers from verified buyers at a better price.
                </p>
              </div>
              {/* Sell Faster Section */}
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Image
                    src="/images/adds.png"
                    alt="Sell Faster"
                    width={50}
                    height={50}
                  />
                </div>
                <h3 className="md:text-xl font-semibold max-md:text-lg">
                  Sell Faster
                </h3>
                <p className="text-gray-600 dark:text-white md:text-base max-md:text-xs break-words md:max-w-xs max-md:px-8">
                  Sell your product faster than others at a better price.
                </p>
              </div>
              {/* Call-to-Action Button */}
              <button
                onClick={() => router.push("/publish-ad")}
                className="bg-custom-gradient  
cursor-pointer text-white  w-36 h-12 rounded-full shadow-md text-sm max-md:mt-8"
              >
                Sell Your Product
              </button>
            </div>
          </Wrapper>
        </div>
      </div>
      <div className="py-10  dark:bg-black">
        <Wrapper>
          <div className="w-full h-auto dark:bg-black">
            <Wrapper className="max-sm:mx-0 max-sm:pl-0 max-sm:pr-0">
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start max-sm:gap-[0.5rem] ">
                {data && data.length > 0 ? (
                  data.map((product, index) => (
                    <ProductCard
                      fetcher={fetcher}
                      seReftech={seReftech}
                      product={product}
                    />
                  ))
                ) : (
                  <div className="text-red-600">No Product To display</div>
                )}
              </div>
            </Wrapper>
          </div>
        </Wrapper>
      </div>
      <Inspection />
      {loading && <CustomLoader />}
    </div>
  );
};

export default HeroSection;
