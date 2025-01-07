import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-6 bg-white p-4 shadow-md py-4 mb-4 dark:bg-black">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2 dark:text-white">
        Leave a Reply
      </h2>
      <p className="text-gray-500 mb-6 dark:text-white">
        We're Ready to Help Your Business
      </p>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold">
          <div>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name "
              className="placeholder:text-black mt-2 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 dark:bg-black
              dark:placeholder:text-[#616161] dark:border-[#6345ED] dark:border"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="placeholder:text-black mt-2 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 dark:bg-black
              dark:placeholder:text-[#616161] dark:border-[#6345ED] dark:border"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <textarea
            id="message"
            rows={5}
            placeholder="Write Message"
            className="placeholder:text-black mt-1 font-semibold block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-black p-2 dark:placeholder:text-[#616161] dark:border-[#6345ED] dark:border "
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center rounded-l-3xl rounded-r-3xl px-12 py-3 rounded-lg text-white bg-gradient-to-r from-[#6345ED] to-[#DC39FC]  shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <i className="fas fa-paper-plane mr-2"></i> Send Reply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
