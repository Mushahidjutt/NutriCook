import React from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";

function Recipe() {
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl font-semibold mb-6">Create Recipe</h1>

      <div className="flex justify-center items-center my-6">
        <div className=" w-full max-w-3xl p-8 rounded-3xl shadow-2xl bg-amber-200">
          <CustomInput />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
