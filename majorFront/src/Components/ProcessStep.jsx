import React from 'react';

const ProcessStep = ({ number, title, description, isLast = false }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-[#274A2A] rounded-full text-white font-bold">
          {number}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-[#92cb9f] my-2"></div>
        )}
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;
