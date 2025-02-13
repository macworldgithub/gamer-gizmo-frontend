import Link from "next/link";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
  faSquareGooglePlus,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AuthorSection = () => {
  return (
    <div className="w-full flex justify-center mt-6">
      <div className="dark:bg-black  w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 flex justify-center items-center gap-6 space-y-4 max-md:w-[90%] max-md:mx-auto">
        {/* Author Image */}
        <div className="w-44">
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        {/* Author Info */}
        <div className="flex flex-col items-start dark:text-white">
          <div>
            <h3 className="text-lg font-bold">Herbert N. Johnson</h3>
            <p className="text-gray-500 dark:text-white">Author</p>
          </div>
          {/* Description */}
          <p className="text-gray-600 max-md:text-xs md:text-sm leading-relaxed dark:text-white">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur must explain to you how all this
            mistaken idea of denouncing
          </p>
          {/* Social Links */}
          <div className="flex space-x-4 mt-2">
            <Link href="#" className="text-white">
              <FontAwesomeIcon icon={faFacebookF} color="#4267B2" />
            </Link>
            <Link href="#" className="text-white ">
              <FontAwesomeIcon icon={faLinkedin} color="#a0a4a7" />
            </Link>
            <Link href="#" className="text-white">
              <FontAwesomeIcon icon={faTwitter} color="#a0a4a7" />
            </Link>
            <Link href="#" className="text-white">
              <FontAwesomeIcon icon={faSquareGooglePlus} color="#a0a4a7" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;
