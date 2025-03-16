import React from "react";
import Image from "next/image";
import performance from "../../../../public/images/performance.png";
import inventory from "../../../../public/images/inventory.png";
import shareability from "../../../../public/images/Shareablity.png";
import findability from "../../../../public/images/Findeablity.png";
import googleplay from "../../../../public/images/google-play.png";
import appstore from "../../../../public/images/App_Store.png";
import Gamermobile from "../../../../public/images/Gamermobile.png";
import Wrapper from "@/components/Common/Wrapper/Wrapper";

function DownloadApp() {
  return (
    <Wrapper>
      <div className=" bg-[#f7f3ff] py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Advertising Packages & pricing
          </h1>
          <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto">
            Basic Listing - Standard ad placement, Visible for 30 days
          </p>
          <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto">
            Premium Listing - Featureed on homepage & category pages
          </p>
          <p className="text-gray-400 text-sm text-center max-w-2xl mx-auto">
            Sponsored Ad - Banner ad + priority placement
          </p>
        </div>
        <div className="w-full overflow-x-hidden  py-8 px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex flex-col items-center text-center gap-4">
                <Image
                  src={performance}
                  alt="Performance tracking"
                  width={64}
                  height={64}
                  className="max-w-full h-auto"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Performance tracking
                </h3>
                <p className="text-gray-600 text-sm">
                  Make pricing or stock update decisions from anywhere. View the
                  number of views, clicks, and leads for your account overall or
                  for a specific listing.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <Image
                  src={inventory}
                  alt="Inventory view"
                  width={64}
                  height={64}
                  className="max-w-full h-auto"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Inventory view
                </h3>
                <p className="text-gray-600 text-sm">
                  Browse through your inventory of live listings and quickly get
                  the most important details upfront wherever you are.
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <Image
                src={Gamermobile}
                alt="GamerGizmo App"
                width={300}
                height={500}
                className="max-w-full h-auto w-[250px] md:w-[300px]"
              />
            </div>

            <div className="flex flex-col items-center text-center gap-8">
              <div className="flex flex-col items-center text-center gap-4">
                <Image
                  src={shareability}
                  alt="Shareability view"
                  width={64}
                  height={64}
                  className="max-w-full h-auto"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Shareability{" "}
                </h3>
                <p className="text-gray-600 text-sm">
                  Export the report to share the data with others or do further
                  analysis of the overall and listings' performance.
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <Image
                  src={findability}
                  alt="Findability view"
                  width={64}
                  height={64}
                  className="max-w-full h-auto"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Findability
                </h3>
                <p className="text-gray-600 text-sm">
                  Save time by using the make/model filter to find the listing
                  you're looking for. Then have a look at how it's performing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Download the GAMERGIZMO app today!
          </h2>
          <div className="flex justify-center items-center gap-4">
            <Image
              src={googleplay}
              alt="Get it on Google Play"
              width={150}
              height={50}
              className="cursor-pointer"
            />
            <Image
              src={appstore}
              alt="Download on the App Store"
              width={150}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default DownloadApp;
