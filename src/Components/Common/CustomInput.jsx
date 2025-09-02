import React from "react";

const CustomInput = ({
  value,
  onchange,
  placeholder,
  lable,
  type = "text",
  variant = "default",
}) => {
  let baseClass =
    " my-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200";
  return (
    <>
      {lable}
      <input
        type={type}
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        variant="default"
        className={baseClass}
      />
    </>
  );
};

export default CustomInput;
