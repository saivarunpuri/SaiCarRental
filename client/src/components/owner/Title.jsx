import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="font-medium text-2xl">{title}</h2>
      <p className="text-sm text-gray-500 md:text-base mt-2 max-w-156">
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
