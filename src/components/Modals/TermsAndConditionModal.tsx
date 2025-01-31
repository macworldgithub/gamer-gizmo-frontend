import React, { useEffect, useState } from "react";

const TermsAndConditionModal = ({ openEditModal, setOpenEditModal }: any) => {
  if (!openEditModal) return null;
  return (
    <div
      className={`fixed inset-0 transition-all text-black  duration-200 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        openEditModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white transition-all duration-200 rounded-lg p-8 w-full max-w-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Terms And Condition</h2>
        <div className="h-64 overflow-y-auto p-2 border rounded">
          <p className="text-sm text-gray-600">
            By signing up, you agree to abide by our terms and conditions.
            Please read the following carefully:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 mt-4">
            <li>You must be at least 18 years old to use our services.</li>
            <li>
              All personal information provided must be accurate and up to date.
            </li>
            <li>
              Users are responsible for maintaining the confidentiality of their
              account details.
            </li>
            <li>
              Any misuse, fraud, or violation of our policies may result in
              termination of your account.
            </li>
            <li>
              We reserve the right to update these terms at any time without
              prior notice.
            </li>
          </ul>
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setOpenEditModal(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionModal;
