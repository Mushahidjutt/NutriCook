import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full border-4 border-yellow-400 border-t-transparent w-16 h-16"></div>

        <p className="text-lg font-semibold text-gray-700">Loading ...</p>
      </div>
    </div>
  );
}
