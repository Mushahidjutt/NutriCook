import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeByIdApi } from "../app/feautures/Recipes/recipesApi";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipe() {
      const response = await getRecipeByIdApi(id);
      setRecipe(response?.data?.recipe || null);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-5 text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-emerald-200 flex items-center justify-center p-6">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
          {recipe.title}
        </h1>

        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          <span className="font-semibold text-gray-900">Description:</span>{" "}
          {recipe.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-gray-600 mb-6">
          <p>
            <span className="font-semibold"> By:</span> {recipe?.userName?.name}
          </p>
          <p>
            <span className="font-semibold"> Prep Time:</span>{" "}
            {recipe.preparationTime} min
          </p>
          <p>
            <span className="font-semibold"> Cooking Time:</span>{" "}
            {recipe.cookingTime} min
          </p>
          <p>
            <span className="font-semibold"> Cuisine:</span> {recipe.cuisine}
          </p>
          <p className="col-span-2">
            <span className="font-semibold"> Dietary:</span>{" "}
            {recipe.dietaryPreferences}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-inner">
          <h3 className="font-bold text-xl mb-3 text-gray-800">
            🛒 Ingredients
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {(recipe.ingredients || []).map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.ingName}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-inner">
          <h3 className="font-bold text-xl mb-3 text-gray-800">
            📖 Instructions
          </h3>
          <p className="text-gray-700">{recipe.instructions}</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-lg">
            ❤ <span className="font-bold">{recipe.likes}</span> Likes
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
