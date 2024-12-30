import Link from "next/link";

const RelatedNewsSection = () => {
  return (
    <div className="w-full flex justify-center mt-8 mb-5">
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related News
        </h2>
        <div className="grid grid-cols-2 gap-4 border border-gray-100">
          {/* News Item */}
          <div className="flex items-start  p-4 space-x-4">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-300 flex justify-center items-center text-gray-500 text-sm">
              80X80
            </div>
            {/* News Content */}
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-calendar-alt"></i>
                <span>05 Jan 2022</span>
              </div>
              <Link
                href="#"
                className="text-gray-800 font-medium mt-2 block hover:text-gray-600"
              >
                Comprehensive Guides Server Push Design Feature
              </Link>
            </div>
          </div>
          {/* Duplicate News Item */}
          <div className="flex items-start p-4 space-x-4">
            <div className="w-20 h-20 bg-gray-300 flex justify-center items-center text-gray-500 text-sm">
              80X80
            </div>
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-calendar-alt"></i>
                <span>05 Jan 2022</span>
              </div>
              <Link
                href="#"
                className="text-gray-800 font-medium mt-2 block hover:text-gray-600"
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
