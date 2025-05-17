import React from 'react';
// import { cn } from '@/lib/utils';

const FeatureCard = ({ title, description, icon}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:translate-y-[-4px]">
      <div className="w-12 h-12 bg-[#e9f5ec] rounded-full flex items-center justify-center text-[#274A2A] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
