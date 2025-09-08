import React from "react";

const CustomButton = ({ type = "button", onClick, value, disabled }) => {
  let baseClass =
    "bg-amber-300 p-3 cursor-pointer rounded-2xl shadow-md hover:bg-amber-600 transition w-1/2 uppercase font-semibold font-sans";
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        variant="default"
        type={type}
        className={baseClass}
      >
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
