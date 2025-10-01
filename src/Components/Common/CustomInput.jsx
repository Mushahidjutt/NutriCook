import React from "react";

const CustomInput = ({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  type = "text",
  variant = "default",
  className,
}) => {
  let baseClass =
    " w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200";

  if (variant === "textarea") {
    return (
      <>
        {label && <label className="block mb-1 ml-2">{label}</label>}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={4}
          className={`${baseClass} ${className}`}
        />
      </>
    );
  }

  return (
    <>
      
    </>
  );
};

export default CustomInput;
