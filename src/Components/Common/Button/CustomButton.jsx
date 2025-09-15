import React from "react";

const CustomButton = ({
  type = "button",
  onClick,
  value,
  disabled,
  variantClass,
  variant,
  className = "",
}) => {
  // let variantClass = "";

  if (variant === "mobileview") {
    variantClass =
      "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5 text-xs";
  }
  let baseClass =
    "bg-amber-300 p-3 cursor-pointer rounded-2xl shadow-md hover:bg-amber-600 transition w-1/2 uppercase font-semibold font-sans";
  return (
    <div>
      <button
        disabled={disabled}
        onClick={onClick}
        variant="default"
        type={type}
        className={`${baseClass} ${variantClass} ${className}`}
      >
        {value}
      </button>
    </div>
  );
};

export default CustomButton;
