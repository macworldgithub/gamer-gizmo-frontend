import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

const Form: React.FC<any> = ({ onSubmit, formData, onChange }) => {
  return (
    <Wrapper>
      <form
        className="p-6 rounded-lg shadow-2xl flex flex-col gap-4 dark:bg-black mb-4 max-lg:mx-auto max-lg:w-[40rem] sm:w-[25em]
         max-sm:w-[20em]"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={onChange}
          className="w-full p-3 bg-blueLight text-black rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <select
          name="industry"
          value={formData.industry}
          onChange={onChange}
          className="w-full p-3 bg-blueLight text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option value="">Select Industry</option>
          <option value="tech">Tech</option>
          <option value="gaming">Gaming</option>
          <option value="finance">Finance</option>
        </select>
        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          value={formData.contactName}
          onChange={onChange}
          className="w-full p-3 bg-blueLight text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <input
          type="email"
          name="companyEmail"
          placeholder="Company Email"
          value={formData.companyEmail}
          onChange={onChange}
          className="w-full p-3 bg-blueLight text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={onChange}
          className="w-full p-3 bg-blueLight text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
          rows={5}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-md font-bold hover:opacity-90 transition-opacity"
        >
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Form;
