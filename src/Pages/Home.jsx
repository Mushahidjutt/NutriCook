import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import { getAllRecipesApi } from "../app/feautures/Recipes/recipesApi";
import { likeToggleRecipeApi } from "../app/feautures/Recipes/likeToggleRecipe";
import toast from "react-hot-toast";

function Home() {
  const [getAllRecipes, setGetAllRecipes] = useState({});

  useEffect(() => {
    handleGetAllRecipes();
  }, []);

  const handleGetAllRecipes = async () => {
    try {
      const response = await getAllRecipesApi();
      setGetAllRecipes(response);
    } catch (error) {
      console.error("Error fetching GetAllRecipes:", error);
    }
  };

  const handleLikedToggleRecipes = async (id) => {
    try {
      await likeToggleRecipeApi(id);
      toast.success("Recipe Liked! 👍");
      handleGetAllRecipes();
    } catch (error) {
      console.error("Error in Like Toggle:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="grid grid-cols-3">
        {getAllRecipes?.data?.recipes?.map((recipe, index) => (
          <div key={index}>
            <div className="m-3 bg-gradient-to-br from-green-100 via-emerald-200 to-teal-200 rounded-lg p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-400">
                  <span className=" mx-1 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text font-semibold text-transparent">
                    By:
                  </span>
                  {recipe?.userName?.name}
                </p>
                <button
                  onClick={() => handleLikedToggleRecipes(recipe?.id)}
                  className="cursor-pointer rounded px-4 py-2 font-semibold text-white transition duration-200 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 hover:from-purple-500 hover:via-red-500 hover:to-pink-500"
                >
                  Like
                </button>
              </div>
              <h3 className="mb-2 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-2xl font-bold text-transparent">
                {recipe?.title}
              </h3>
              <p>{recipe?.description}</p>
              <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p>
                  ❤ <span className="font-bold">{recipe?.likes}</span> Likes
                </p>
                <button className="p-2 bg-amber-300 rounded-2xl cursor-pointer">
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
