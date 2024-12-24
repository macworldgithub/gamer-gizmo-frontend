import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";

const ServiceCards = () => {
  const services = [
    {
      icon: "/images/PC.svg",
      title: "For Individual Sellers",
      description:
        "Robust listing plans with smart add-ons to turbocharge your PC sales.",
      buttonText: "Learn More",
    },
    {
      icon: "/images/PC.svg",
      title: "For Retailers",
      description:
        "Connect with UAE’s largest online audience with our bespoke advertising solutions.",
      buttonText: "Learn More",
    },
    {
      icon: "/images/PC.svg",
      title: "For Advertisers",
      description:
        "Versatile plans & premium products to boost your property leads.",
      buttonText: "Learn More",
    },
  ];

  return (
    <Wrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className=" flex flex-col items-center text-center  rounded-lg w-full max-w-sm mx-auto"
          >
            <Image
              src={service.icon}
              className="text-4xl mb-4 dark:invert"
              width={100}
              height={100}
              alt="pc"
            />
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-500 text-base mb-4">
              {service.description}
            </p>
            <button className="bg-custom-gradient text-white py-2 px-6 rounded hover:opacity-90">
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ServiceCards;
