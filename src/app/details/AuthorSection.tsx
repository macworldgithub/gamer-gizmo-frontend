import Link from "next/link";

const AuthorSection = () => {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className=" w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex justify-center items-center gap-6 space-y-4">
        {/* Author Image */}
        <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center text-gray-500 text-lg">
          100X100
        </div>
        {/* Author Info */}
        <div className="flex flex-col items-start">
          <div className="">
            <h3 className="text-lg font-bold">Herbert N. Johnson</h3>
            <p className="text-gray-500">Author</p>
          </div>
          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur must explain to you how all this
            mistaken idea of denouncing
          </p>
          {/* Social Links */}
          <div className="flex space-x-4">
            <Link href="#" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-google-plus-g"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;
