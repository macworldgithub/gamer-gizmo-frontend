import Wrapper from "@/components/Common/Wrapper/Wrapper";
import Image from "next/image";

const ServiceCards = () => {
    const services = [
      {
        icon: "/images/Flexibile.png",
        title: "Flexible packages",
        description:
          "Get your credits all up front at the beginning of your monthly billing cycle and use them as you need throughout the month. You call the shots!",
        buttonText: "Learn More",
      },
      {
        icon: "/images/Value.png",
        title: "Value-added exposure",
        description:
          "Looking to stay at the top? No problem! Our featured and promoted ads are designed specifically to ensure your cars get the best exposure, right at the top!",
        buttonText: "Learn More",
      },
      {
        icon: "/images/business.png",
        title: "Business visibility",
        description:
          "Manage your listings inventory, keep track of credit usage, and view your leads activity all in one easy to use dashboard",
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
                className="text-4xl mb-4 "
                width={100}
                height={100}
                alt="pc"
              />
              <h3 className="text-xl font-bold mb-2 text-black 
              ">
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
  