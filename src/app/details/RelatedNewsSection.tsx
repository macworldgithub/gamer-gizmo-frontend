import Image from "next/image";
import Link from "next/link";

const RelatedNewsSection = () => {
  return (
    <div className="w-full flex justify-center mt-8 mb-5">
      <div className="w-full max-w-5xl  border border-btnGray">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related News
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* News Item */}
          <div className="flex items-start  p-4 space-x-4">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={80}
              height={80}
              className="object-contain"
            />
            {/* News Content */}
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-calendar-alt"></i>
                <span>05 Jan 2022</span>
              </div>
              <Link
                href="#"
                className="text-gray-800 font-bold mt-2 block hover:text-gray-600 max-md:text-sm  max-w-xs break-words"
              >
                Comprehensive Guides Server Push Design Feature
              </Link>
            </div>
          </div>
          {/* Duplicate News Item */}
          <div className="flex items-start p-4 space-x-4">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={80}
              height={80}
              className="object-contain"
            />
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-calendar-alt"></i>
                <span>05 Jan 2022</span>
              </div>
              <Link
                href="#"
                className="text-gray-800 font-bold max-md:text-sm mt-2 block hover:text-gray-600 max-w-xs break-words"
              >
                Comprehensive Guides Server Push Design Feature
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedNewsSection;
