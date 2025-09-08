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
        <div
          className={`animate-spin rounded-full border-4 w-16 h-16 border-t-transparent ${color}`}
        ></div>

        <p className="text-lg font-semibold text-gray-700">Loading ...</p>
      </div>
    </div>
  );
}
