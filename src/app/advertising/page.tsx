import PageHeader from "@/components/PageHeader";
import React from "react";
import ServiceCards from "./ServiceCards";
import StatsCards from "./StatsCards";
import Wrapper from "@/components/Common/Wrapper/Wrapper";
import BuisnessInquiries from "@/components/BuisnessInquiries";

const page = () => {
  const cardContent = {
    title: "Tell us about you...",
    description:
      "Whether you want to promote PCs, Consoles, or simply looking for new customers for your business; reach out and tell us what you’re after. We’ll find a way to help!",
    note: "Note: Please use this form to submit business inquiries only. For other inquiries, email us at support@gamergizmo.com",
  };

  return (
    <div className="text-white bg-white dark:bg-[#0D0D12]">
      <PageHeader
        pageName="Advertising"
        title="GamerGizmo for buisness"
        description="We leverage our amazing traffic, excellent reach and professional tools to help PC dealers and
  advertiser in the UAE grow their business"
      />
      <ServiceCards />
      <StatsCards />
      <BuisnessInquiries cardContent={cardContent} />
    </div>
  );
};

export default page;
 