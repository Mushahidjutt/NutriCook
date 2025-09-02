import React from "react";

const CustomButton = ({  onClick, value }) => {
  let baseClass =
    "bg-amber-300 p-3 cursor-pointer rounded-2xl shadow-md hover:bg-amber-600 transition w-1/2 uppercase font-semibold font-sans";
  return (
    <div>
      <button onClick={onClick} variant="default" className={baseClass}>
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
