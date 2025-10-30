"use client";

import React, { useState } from "react";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import PageHeader from "@/components/PageHeader";
import PartsNames from "./device";
import Guide from "./guide";
import Features from "./pictureside";
import SubmissionButton from "./submit";
import PartsInformation from "./info";
import PcInspectionForm from "./PcInspectionForm";
import { StructuredData } from "@/components/StructuredData";

const SellForMe = () => {
  const [deviceType, setDeviceType] = useState("");

  const handleDeviceSelect = (device: string) => {
    setDeviceType(device);
    console.log("Selected Device:", device);
  };

  const [adInformation, setAdInformation] = useState<Record<string, string>>(
    {}
  );
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/Inspection`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PC Inspection Service",
    description:
      "GamerGizmo PC inspection: expert hardware checks to ensure performance and value before you buy.",
    provider: { "@type": "Organization", name: "GamerGizmo", url: siteUrl },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    url: canonical,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "PC Inspection", item: canonical },
    ],
  };

  return (
    <>
      <StructuredData data={[service, breadcrumb]} />
      <PageHeader pageName="sellforme" />
      <div className="dark:bg-[#1e1e2f] ">
        <Guide />
        <Wrapper>
          <div className="w-[100%] h-[100%] flex p-2 justify-around  ">
            <div className="w-[60%] max-sm:w-[100%] h-max shadow-combinedNight border rounded py-5 px-[5%] box-border my-10 flex flex-col  ">
              <h1 className="font-bold text-lg text-center pb-2 text-secondaryColorDark">
                Book Your PC Inspection
              </h1>
              <h1 className="text-[0.8rem] font-medium dark:text-white text-black">
                PC Inspection, Hassle-Free! Buy with confidence and avoid costly
                surprises with GamerGizmo’s expert PC inspections. Get a
                detailed hardware check to ensure you’re getting the best
                performance and value every time!
              </h1>
              <div className="flex">
                {/* <PartsNames onDeviceSelect={handleDeviceSelect} /> */}
                <PcInspectionForm />
                {/* <PartsInformation adInformation={adInformation} setAdInformation={setAdInformation} /> */}
              </div>
              {/* <SubmissionButton /> */}
            </div>

            <Features />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SellForMe;
