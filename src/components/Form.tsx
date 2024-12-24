import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

const Form: React.FC<any> = ({ onSubmit, formData, onChange }) => {
  return (
    <form
      className="p-6 rounded-lg shadow-2xl lg:ml-8 flex flex-col gap-6 dark:bg-black mb-4 max-lg:mx-auto w-full
     lg:h-[60rem] text-black dark:text-gray-400 "
      onSubmit={onSubmit}
    >
      {/* <Wrapper className=""> */}
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={onChange}
        className="w-80 max-md:w-[80%]  max-lg:mx-auto p-3 bg-blueLight dark:bg-black rounded-md border border-bluishBorder dark:border-purple-700 shadow-lg  focus:ring-2 focus:ring-purple-500 focus:outline-none "
      />
      <select
        name="industry"
        value={formData.industry}
        onChange={onChange}
        className="w-80 p-3 max-md:w-[80%]  max-lg:mx-auto bg-blueLight text-gray-400 dark:bg-black rounded-md border border-bluishBorder focus:ring-2 dark:border-purple-700  focus:ring-purple-500 focus:outline-none"
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
        className="w-80 p-3 max-md:w-[80%]  max-lg:mx-auto bg-blueLight dark:bg-black rounded-md border border-bluishBorder dark:border-purple-700  dark:bg-blackfocus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
      <input
        type="email"
        name="companyEmail"
        placeholder="Company Email"
        value={formData.companyEmail}
        onChange={onChange}
        className="w-80 p-3 bg-blueLight max-md:w-[80%]  max-lg:mx-auto dark:bg-black rounded-md border dark:border-purple-700  border-bluishBorder focus:ring-2 focus:ring-purple-500 focus:outline-none"
      />
      <textarea
        name="requirements"
        placeholder="Requirements"
        value={formData.requirements}
        onChange={onChange}
        className="w-80 p-3 bg-blueLight max-md:w-[80%]  max-lg:mx-auto rounded-md border dark:border-purple-700  dark:bg-black border-bluishBorder focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
        rows={5}
      />
      <button
        type="submit"
        className="w-80 p-3 bg-custom-gradient max-md:w-[80%]  max-lg:mx-auto dark:bg-black dark:border-purple-700  text-white rounded-md font-bold hover:opacity-90 transition-opacity"
      >
        Submit
      </button>
      {/* </Wrapper> */}
    </form>
  );
};

export default Form;
