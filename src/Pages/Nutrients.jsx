import React, { useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";
import { makeApiCall } from "../app/api";

function Nutrients() {
  const [nutrients, setNutrients] = useState({});
  const [query, setQuery] = useState("");
  const [onClick, setOnClick] = useState(false);

  const handleGetNutrients = async () => {
    try {
      const response = await makeApiCall({
        url: "v1/recipes/nutrients",
        method: "POST",
        data: {
          ingredients: [{ ingName: query }],
        },
      });

      setNutrients(response);

      setOnClick(true);
    } catch (error) {
      console.error("Error fetching nutrients:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center mt-10 mb-8">
        <div className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl mb-8 bg-[#BAE6FD]">
          <h1 className="text-center text-2xl font-semibold mb-6">
            Calculate Nutrients
          </h1>

          <CustomInput
            className="my-6 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-300 focus:outline-none transition duration-200"
            type="text"
            placeholder="write some food apple"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="text-center">
            <button
              className="bg-amber-300 p-3 cursor-pointer rounded-2xl shadow-md hover:bg-amber-600 transition w-1/2 uppercase font-semibold font-sans"
              onClick={handleGetNutrients}
            >
              Calculate
            </button>
          </div>

          {onClick && (
            <div className="max-w-2xl bg-amber-100 p-8 rounded-3xl shadow-2xl my-6">
              <h1 className="text-center text-2xl font-semibold my-6">
                Total Nutrients
              </h1>
              {nutrients?.data?.updatedIngredients?.map((item, index) => (
                <div
                  key={index}
                  className="bg-amber-100 p-4 rounded-xl my-4 shadow-md grid grid-cols-2"
                >
                  <p>Calories: {item.nutrients.calories}</p>
                  <p>Protein: {item.nutrients.protein}</p>
                  <p>Fat: {item.nutrients.fat}</p>
                  <p>Carbs: {item.nutrients.carbohydrates}</p>

                  {/* <h3 className="font-semibold mt-2">Vitamins:</h3> */}
                  <p>Sodium: {item.nutrients.vitamins.sodium}</p>
                  <p>Potassium: {item.nutrients.vitamins.potassium}</p>
                  <p>Cholesterol: {item.nutrients.vitamins.cholesterol}</p>
                  <p>Fiber: {item.nutrients.vitamins.fiber}</p>
                  <p>Sugar: {item.nutrients.vitamins.sugar}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
