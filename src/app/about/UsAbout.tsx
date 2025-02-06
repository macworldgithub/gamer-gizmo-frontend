import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-16 px-6 sm:px-10 lg:px-20 dark:bg-black">
      <div className="max-w-7xl w-full bg-gray-50 shadow-xl rounded-lg overflow-hidden dark:bg-black">
        <div className="relative w-full h-80">
          <Image
            src="/images/Rectangle1.png"
            alt="Gaming Setup"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        <div className="p-10 text-center">
          {/* <h1 className="text-5xl font-extrabold text-gray-800">About Us</h1> */}
          <p className="text-lg text-gray-600 mt-4 dark:text-white">
            Your ultimate destination for gaming hardware, where gamers connect,
            trade, and celebrate their passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 pb-12">
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
            <p className="text-gray-700 mt-2">
              To become the ultimate marketplace where gamers connect, trade,
              and celebrate their passion for gaming hardware and culture.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-700 mt-2">
              To serve gamers as our valued customers by offering a secure and
              innovative platform for buying, selling, and exchanging gaming
              PCs, laptops, and components. We strive to cater to gaming
              enthusiasts globally, ensuring our technology remains cutting-edge
              and reliable. Committed to growth, financial soundness, and
              fostering a vibrant gaming community, we embrace ethical values
              and inclusivity. Our competitive edge lies in creating a seamless,
              user-friendly marketplace that prioritizes trust and connection.
              We are dedicated to social and environmental responsibility and
              recognize our employees as the cornerstone of our success
            </p>
          </section>
        </div>

        <section className="px-10 pb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6 dark:text-white">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-indigo-100 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold text-indigo-800">Community</h3>
              <p className="text-indigo-700">Bringing gamers together.</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold text-green-800">Trust</h3>
              <p className="text-green-700">
                Secure transactions and verified users.
              </p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold text-yellow-800">Innovation</h3>
              <p className="text-yellow-700">
                Cutting-edge features like AI and livestreaming.
              </p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg text-center shadow-md">
              <h3 className="text-xl font-bold text-red-800">Passion</h3>
              <p className="text-red-700">Celebrating the gaming lifestyle.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
