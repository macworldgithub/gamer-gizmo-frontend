import React from "react";

interface CardProps {
  title: string;
  items?: string[]; // For lists of features
  buttonText?: string;
  onButtonClick?: () => void; // Optional button handler
  separator?: boolean; // Show separator if true
  customStyle?: string; // Optional for category styling
}

const Card: React.FC<CardProps> = ({
  title,
  items,
  buttonText,
  onButtonClick,
  separator = false,
  customStyle = "",
}) => {
  return (

        <div
          className={`bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between ${customStyle}`}
        >
          <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>
          {items && (
            <ul className="text-sm mb-4 space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-purple-500">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mx-auto"
            >
              {buttonText}
            </button>
          )}
          {separator && <div className="border-l h-12 border-gray-300 mx-auto" />}
        </div>
  );
};

export default Card;
