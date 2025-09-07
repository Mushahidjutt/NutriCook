import React, { useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";
import { getNutrientsApi } from "../app/feautures/Recipes/recipesApi";
import Loader from "../Components/Common/Loader";

function Nutrients() {
  const [ingredients, setIngredients] = useState([]);
  const [query, setQuery] = useState("");
  const [nutrients, setNutrients] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddIngredient = () => {
    if (query.trim() !== "") {
      setIngredients([...ingredients, query.trim()]);
      setQuery("");
      setNutrients(null);
    }
  };

  const handleGetNutrients = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      const response = await getNutrientsApi({
        ingredients: ingredients.map((ing) => ({ ingName: ing })),
      });
      setNutrients(response);
    } catch (error) {
      console.error("Error fetching nutrients:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-start mt-10 mb-10 px-4">
        <div className="w-full max-w-3xl p-8 rounded-2xl shadow-md bg-white">
          <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
            Nutrient Calculator
          </h1>

          <div className="flex gap-2 mb-4">
            <CustomInput
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 outline-none transition"
              type="text"
              placeholder="Enter an ingredient e.g. Apple"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
            />
            <button
              className=" text-white  cursor-pointer rounded-full  font-medium"
              onClick={handleAddIngredient}
            >
              ➕
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mb-6">
            <button
              className="bg-amber-500 text-white px-6 py-2 cursor-pointer rounded-lg shadow hover:bg-amber-600 transition font-medium"
              onClick={handleGetNutrients}
            >
              Calculate Nutrients
            </button>
          </div>

          {loading && (
            <div className="flex justify-center my-6">
              <Loader />
            </div>
          )}

          {nutrients && !loading && (
            <div className="space-y-6">
              {nutrients?.data?.updatedIngredients?.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    {item.ingredientName || ingredients[index]}
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <p>Calories: {item.nutrients.calories}</p>
                    <p>Protein: {item.nutrients.protein}</p>
                    <p>Fat: {item.nutrients.fat}</p>
                    <p>Carbs: {item.nutrients.carbohydrates}</p>
                    <p>Sodium: {item.nutrients.vitamins.sodium}</p>
                    <p>Potassium: {item.nutrients.vitamins.potassium}</p>
                    <p>Cholesterol: {item.nutrients.vitamins.cholesterol}</p>
                    <p>Fiber: {item.nutrients.vitamins.fiber}</p>
                    <p>Sugar: {item.nutrients.vitamins.sugar}</p>
                  </div>
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
