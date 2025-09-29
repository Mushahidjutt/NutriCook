import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import {
  currentUserRecipesApi,
  getRecipeDeleteByIdApi,
} from "../app/feautures/Recipes/recipesApi";
import { likeToggleRecipeApi } from "../app/feautures/Recipes/likeToggleRecipe";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Common/Loader";
import toast from "react-hot-toast";

const Recipes = () => {
  const [getCurrentUserRecipes, setGetCurrentUserRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDeleteRecipe = async (id) => {
    try {
      await getRecipeDeleteByIdApi(id);
      toast.success("Recipe Deleted Successfully 🗑️");
      setGetCurrentUserRecipes((prev) => ({
        ...prev,
        data: {
          ...prev?.data,
          recipes: prev?.data?.recipes?.filter((recipe) => recipe.id !== id),
        },
      }));
    } catch (error) {
      console.error("Failed to Delete Recipe:", error);
      toast.error("Recipe Delete Failed ");
    }
  };

  const handleLikedToggleRecipes = async (id) => {
    try {
      await likeToggleRecipeApi(id);
    } catch (error) {
      console.error("Error in Like Toggle:", error);
    }
  };

  useEffect(() => {
    handleCurrentAllRecipes();
  }, []);

  const handleCurrentAllRecipes = async () => {
    try {
      setLoading(true);
      const response = await currentUserRecipesApi();
      setGetCurrentUserRecipes(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Get Current User:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      {loading ? (
        <Loader />
      ) : getCurrentUserRecipes?.data?.recipes?.length > 0 ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {getCurrentUserRecipes.data.recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between transition transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">By: </span>
                    {recipe?.userName?.name}
                  </p>
                  <button
                    onClick={() => handleLikedToggleRecipes(recipe?.id)}
                    className="px-3 py-1.5 cursor-pointer rounded-lg font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition"
                  >
                    ❤️ Like
                  </button>
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {recipe?.title}
                </h3>
                <p className="text-gray-600 mb-4">{recipe?.description}</p>

                <p className="text-gray-700 mb-6">
                  ❤ <span className="font-semibold">{recipe?.likes}</span> Likes
                </p>
              </div>

              <div className="flex gap-3 justify-between">
                <button
                  className="flex-1  py-1.5 cursor-pointer rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium hover:from-orange-500 hover:to-amber-400 transition"
                  onClick={() => navigate(`/recipe-details/${recipe?.id}`)}
                >
                  Show Details
                </button>
                <button
                  className="flex-1  py-1.5 cursor-pointer rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium hover:from-emerald-500 hover:to-green-400 transition"
                  onClick={() => navigate(`/edit/${recipe?.id}`)}
                >
                  Update
                </button>
               
              </div>
            </div>
          ))}
        </main>
      ) : (
        <div className="p-10 text-center">
          <h1 className="text-xl font-semibold text-gray-600">
            There is no data
          </h1>
        </div>
      )}
    </div>
  );
};

export default Recipes;
