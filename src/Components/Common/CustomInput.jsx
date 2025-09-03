import React from "react";

const CustomInput = ({
  value,
  onChange,
  placeholder,
  label,
  onBlur,
  type = "text",
  variant = "default",
}) => {
  let baseClass =
    " my-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-3  text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200";
  if (variant === "textarea") {
    return (
      <>
        {label && <label className="block mb-1 ml-2">{label}</label>}{" "}
        <textarea
          value={value}
          type={type}
          placeholder={placeholder}
          rows={4}
          className={baseClass}
        />
      </>
    );
  }
  return (
    <>
       {label && <label className="block mb-1 ml-2">{label}</label>}{" "}
      <input
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        variant="default"
        className={baseClass}
      />
    </>
  );
};

export default CustomInput;
