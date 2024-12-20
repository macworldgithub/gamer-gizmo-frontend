import Image from "next/image";
import Wrapper from "./Common/Wrapper/Wrapper";

interface PageHeadProps {
  pageName: string;
  title?: string;
  description?: string;
  button?: string;
}

const PageHeader = ({
  pageName,
  title,
  description,
  button,
}: PageHeadProps) => {
  return (
    <div className="w-full h-auto  bg-custom-gradient text-[white] font-bold max-sm:flex max-sm:justify-center py-6">
      {(title || description || button) && (
        <div className="flex flex-col bg-custom-gradient justify-center items-start text-center px-12 space-y-2  mb-10">
          {title && <h1 className="text-2xl lg:text-4xl font-bold">{title}</h1>}
          {description && (
            <p className="text-sm lg:text-lg mt-4 font-medium text-[white]">
              {description}
            </p>
          )}
          {button && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {button}
            </button>
          )}
        </div>
      )}
      {!title && !description && !button && (
        <Image
          src={"/images/HeroArea.png"}
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
          alt="Hero Image"
        />
      )}
    </div>
  );
};

export default PageHeader;
