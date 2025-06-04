import React from "react";
import Image from "next/image";
const NowOrder = () => {
  return (
    <div className="dark:bg-[#1e1e2f]">
      <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto px-4 py-8 ">
        <div className="">
          <div className="w-full md:w-full p-4 bg-white rounded-lg shadow-md border border-black lg:w-full h-full ">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">Express check out</h3>
              <div className="flex gap-1 mb-6">
                <div className=" px-4 py-2 rounded flex items-center">
                  <Image
                    src="/images/pay.png"
                    alt="Amazon Pay"
                    width={100}
                    height={40}
                  />
                </div>
                <div className=" px-4 py-2 rounded flex items-center">
                  <Image
                    src="/images/amazon.png"
                    alt="Amazon Pay"
                    width={100}
                    height={40}
                  />
                </div>
                <div className=" px-4 py-2 rounded flex items-center">
                  <Image
                    src="/images/google.png"
                    alt="Amazon Pay"
                    width={100}
                    height={40}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <input
                  type="radio"
                  name="payment"
                  id="debit"
                  defaultChecked
                  className="accent-green-500"
                />
                <label htmlFor="debit">Debit Card</label>
                <input
                  type="radio"
                  name="payment"
                  id="credit"
                  className="accent-gray-500"
                />
                <label htmlFor="credit">Credit Card</label>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Card Holder</label>
                    <input
                      type="text"
                      className="w-2/3 border border-[#808080] p-2 rounded"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-2/3 border border-[#808080] p-2 rounded"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Expires</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-1/2 border border-[#808080] p-2 rounded"
                        placeholder="MM"
                      />
                      <input
                        type="text"
                        className="w-1/2 border border-[#808080] p-2 rounded "
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-1/2 border border-[#808080] p-2 rounded"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-between mt-4">
          <button className="text-purple-500 border border-[#DC39FC] px-4 py-2 rounded hover:bg-purple-500 hover:text-white transition text-sm md:text-base">
            Back
          </button>
        </div> */}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4  md:text-base">
            Summary
          </h2>
          <div className="w-full h-[2px] bg-gray-300 mb-4"></div>
          <div className="mb-4">
            <label
              htmlFor="discountCode"
              className="block text-sm font-medium mb-2"
            >
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
              <span className="text-xs md:text-sm">
                Shipping (Flat Rate - Fixed)
              </span>
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

export default NowOrder;
