import React from 'react';
import Image from 'next/image';
import gpu from '../../../public/images/GPU6.png';
import bin from '../../../public/images/Delete.png';

const ShoppingCart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shopping Cart Heading */}
      <h1 className="text-xl lg:text-2xl font-bold mb-6 text-center lg:text-left">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shopping Cart Table */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 text-sm md:text-base">Item</th>
                  <th className="text-left p-4 text-sm md:text-base">Price</th>
                  <th className="text-left p-4 text-sm md:text-base">Qty</th>
                  <th className="text-left p-4 text-sm md:text-base">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2].map((item, index) => (
                  <tr key={index} className="border-b-2 border-gray-200">
                    <td className="p-4 sm:flex items-center gap-4 text-purple-500 text-sm md:text-base max-sm:text-[8px]">
                      <Image
                        src={gpu}
                        alt="Graphics Card"
                        width={64}
                        height={64}
                        className="object-cover "
                      />
                      <span>AMD Radeon RX 580 GTS XXX Edition Graphics Card...</span>
                    </td>
                    <td className="p-4 font-bold text-sm md:text-base">
                      <span className="text-xs">AED </span>
                      <span>551.00</span>
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-16 border border-gray-300 p-2 text-center rounded text-xs md:text-sm"
                      />
                    </td>

                    <td className="p-4 text-[#DC39FC] relative text-sm md:text-base">
                      <Image
                        src={bin}
                        alt="Delete"
                        width={20}
                        height={20}
                        className="absolute right-2 top-0 mt-1"
                      />
                      <span className="text-xs">AED </span>
                      <span>551.00</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button className="text-purple-500 border border-[#DC39FC] px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition text-sm md:text-base">
              Continue Shopping
            </button>
            <button className="text-purple-500 border border-[#DC39FC] px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition text-sm md:text-base">
              Update Cart
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-sm md:text-base">Summary</h2>
          <div className="w-full h-[2px] bg-gray-300 mb-4"></div>
          <div className="mb-4">
            <label htmlFor="discountCode" className="block text-sm font-medium mb-2">
              Apply Discount Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="discountCode"
                placeholder="Enter discount code"
                className="flex-1 border border-gray-300 p-2 rounded text-xs md:text-sm"
              />
              <button className="text-black bg-white px-4 py-2 rounded hover:bg-white transition text-xs md:text-sm">
                Apply
              </button>
            </div>
          </div>
          <div className="w-full h-[2px] bg-gray-300 mb-4"></div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs md:text-sm">Subtotal</span>
              <div className="font-bold">
                <span className="text-xs">AED </span>
                <span>551.00</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-xs md:text-sm">Shipping (Flat Rate - Fixed)</span>
              <div className="font-bold">
                <span className="text-xs">AED </span>
                <span>20.00</span>
              </div>
            </div>
            <div className="w-full h-[2px] bg-gray-300 mb-4"></div>
            <div className="flex justify-between font-semibold text-sm md:text-lg">
              <span>Order Total</span>
              <span>AED 571.00</span>
            </div>
          </div>

          <button className="w-full mt-6 text-white bg-[#6345ED] px-4 py-2 rounded hover:bg-purple-600 transition text-sm md:text-base">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
