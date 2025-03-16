import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";

const ServiceCards = () => {
  const services = [
    {
      icon: "/images/listing.png",
      title: "Basic Listing",
      description: "Standard ad placement, Visible for 30days",
    },
    {
      icon: "/images/premium.png",
      title: "Premium Listing",
      description: "Featured on homepage & category page",
    },
    {
      icon: "/images/sponsored.png",
      title: "Sponsored Ad",
      description: "Banner ad  + priority placement",
    },
  ];

  return (
    <Wrapper>
      <div className=" text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 ">
          Advertising Packages & pricing
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 w-full dark:bg-black mb-6">
        {services.map((service, index) => (
          <div
            key={index}
            className=" flex flex-col items-center text-center  rounded-lg w-full max-w-sm mx-auto dark:text-white"
          >
            <Image
              src={service.icon}
              className="text-4xl mb-4 dark:invert"
              width={64}
              height={64}
              alt="pc"
            />
            <h3
              className="text-lg font-bold  text-black 
              "
            >
              {service.title}
            </h3>
            <p className="text-gray-500 text-base mb-4 dark:text-white">
              {service.description}
            </p>
            {/* <button className="bg-custom-gradient text-white py-2 px-6 rounded hover:opacity-90">
              {service.buttonText}
            </button> */}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ServiceCards;
