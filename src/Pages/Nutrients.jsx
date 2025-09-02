import React, { useState, useEffect } from "react";
import Navbar from "../Components/Layout/Navbar";
import axios from "axios";
import CustomInput from "../Components/Common/CustomInput";

function Nutrients() {
  const [nutrients, setNutrients] = useState([]);
  const [query, setQuery] = useState("");
  const [onClick, setOnClick] = useState(false);

  const handleGetNutrients = async () => {
    try {
      const response = await axios.post(
        "https://nutricook-backend.onrender.com/api/v1/recipes/nutrients",
        {
          query: query,
        }
      );

      setNutrients(response.data);
    } catch (error) {
      console.error("Error fetching nutrients:", error);
    }
    setOnClick(true);
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center mt-10 mb-8">
        <div className=" w-full max-w-3xl  p-8 rounded-3xl shadow-2xl mb-8   bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200">
          <h1 className="text-center text-2xl font-semibold mb-6">
            Calculate Nutrients
          </h1>

          <CustomInput
            className=" my-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
            type="text"
            placeholder="write some food apple"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="text-center">
            <button
              className="bg-amber-300 p-3 cursor-pointer rounded-2xl shadow-md hover:bg-amber-600 transition w-1/2 uppercase font-semibold font-sans "
              onClick={handleGetNutrients}
            >
              Calculate
            </button>
          </div>

          {onClick ? (
            <div className="max-w-2xl bg-amber-100 p-8 rounded-3xl shadow-2xl my-6">
              <h1 className="text-center text-2xl font-semibold my-6">
                Total Nutrients
              </h1>
              <div className="grid grid-cols-3 text-xl gap-2">
                <p>Food: {nutrients.food}</p>
                <p>Calories: {nutrients.calories}</p>
                <p>Protein: {nutrients.protein}</p>
                <p>Carbs: {nutrients.carbs}</p>
                <p>Fat: {nutrients.fat}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
