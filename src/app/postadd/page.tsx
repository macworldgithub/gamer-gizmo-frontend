import PageHeader from "@/components/PageHeader";
import React from "react";
import Image from "next/image";
import Guide from "./guide";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import { Select, MenuItem } from "@mui/material";
import PartsNames from "./parts";
import PartsInfromation from "./info";
import LaptopInformation from "./laptopinfo";
import UploadPhotos from "./uploadphotos";
import ContactInformation from "./contact";
import SubmissionButton from "./submit";
import { StructuredData } from "@/components/StructuredData";

const PostAdd = () => {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://gamergizmo.com"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}/postadd`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Post Your Ad | GamerGizmo",
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "GamerGizmo", url: siteUrl },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to post your ad on GamerGizmo",
    step: [
      { "@type": "HowToStep", name: "Provide laptop or product information" },
      { "@type": "HowToStep", name: "Upload product photos" },
      { "@type": "HowToStep", name: "Enter contact information" },
      { "@type": "HowToStep", name: "Submit your ad" },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Post Your Ad", item: canonical },
    ],
  };
  return (
    <>
      <StructuredData data={[webPage, howTo, breadcrumb]} />
      <PageHeader pageName="postyouradd" />

      <div id="layout" className="dark:bg-black">
        <Guide />
        <Wrapper>
          <div className="w-[100%] pb-5 dark:text-white h-max flex justify-center items-center flex-col">
            <LaptopInformation />
            <UploadPhotos />
            <ContactInformation />
            <SubmissionButton />
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default PostAdd;
