import PageHeader from "@/components/PageHeader";
import ContactCards from "./ContactCards";
import Map from "./Map";

const AboutPage = () => {
  return (
    <div className="w-full bg-white dark:bg-black">
      <PageHeader pageName={"Contact Us"} title="Contact" />
      <ContactCards />
      <Map />
    </div>
  );
};

export default AboutPage;
