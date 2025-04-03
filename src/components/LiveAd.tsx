// const LiveAdSection = ({ className = "w-full h-96" }) => {
//   return (
//     <div
//       className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center ${className}`}
//     >
//       <h1 className="font-bold text-2xl">This section is for live Ad</h1>
//       <h1 className="text-center font-bold text-xl">
//         Boost Your Brand Visibility
//       </h1>
//       <p className="text-center dark:text-white text-gray-700 text-sm">
//         Advertise with gamergizmo today!
//       </p>
//     </div>
//   );
// };

// export default LiveAdSection;

const LiveAdSection = ({ className = "w-full h-96" }) => {
  return (
    <div
      className={`dark:bg-secondaryBlack dark:text-white border-gray-300 justify-center rounded-lg bg-gray-200 shadow-md flex flex-col items-center p-4 sm:p-6 ${className}`}
    >
      {/* <h1 className="font-bold text-lg sm:text-sm md:text-2xl text-center">
        This section is for live Ad
      </h1>
      <h1 className="text-center font-bold text-base sm:text-sm md:text-xl">
        Boost Your Brand Visibility
      </h1>
      <p className="text-center dark:text-white text-gray-700 text-xs sm:text-sm md:text-base">
        Advertise with gamergizmo today!
      </p> */}
      <h1>Advertising</h1>
    </div>
  );
};

export default LiveAdSection;
