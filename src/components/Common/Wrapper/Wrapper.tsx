import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex justify-center w-full ">
      <div className={`max-w-screen-xl px-4 md:px-8 w-full ${className}`}>
        {children}
      </div>
      ;
    </div>
  );
};

export default Wrapper;
