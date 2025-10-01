import React from "react";

export default function Loader({
  className = "",
  color = "border-yellow-400",
  size = "",
}) {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-white ${size} ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
       

        <p className="text-lg font-semibold text-gray-700">Loading ...</p>
      </div>
    </div>
  );
}
