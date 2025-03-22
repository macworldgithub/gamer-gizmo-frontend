import React from "react";
import Wrapper from "./Common/Wrapper/Wrapper";

const Form: React.FC<any> = ({ onSubmit, formData, onChange }) => {
  return (
    <form
      className="p-4 rounded-lg shadow-2xl lg:ml-8 flex flex-col gap-2 dark:bg-black mb-4 max-lg:mx-auto max-md:w-full 
     lg:h-auto text-black dark:text-gray-400 "
      onSubmit={onSubmit}
    >
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={onChange}
        className="input-field"
      />
      <input
        type="text"
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactName}
        onChange={onChange}
        className="input-field"
      />
      <input
        type="email"
        name="companyEmail"
        placeholder="Company Email"
        value={formData.companyEmail}
        onChange={onChange}
        className="input-field"
      />
      <select
        name="industry"
        value={formData.industry}
        onChange={onChange}
        className="input-field bg-blueLight text-gray-400"
      >
        <option value="">Select Industry</option>
        <option value="tech">Tech</option>
        <option value="gaming">Gaming</option>
        <option value="finance">Finance</option>
      </select>

      <input
        type="number"
        name="budget"
        placeholder="Enter your budget in AED"
        value={formData.budget}
        onChange={onChange} 
        className="pl-4 input-field"
        min="0"
      />

      <textarea
        name="requirements"
        placeholder="Requirements"
        value={formData.requirements}
        onChange={onChange}
        className="input-field"
        rows={5}
      />
      <button
        type="submit"
        className="input-field dark:bg-black bg-custom-gradient dark:border-purple-700  text-white font-bold hover:opacity-90 "
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
