import React, { useEffect, useState } from "react";
import Navbar from "../Components/Layout/Navbar";
import { getAllRecipesApi } from "../app/feautures/Recipes/recipesApi";
import { likeToggleRecipeApi } from "../app/feautures/Recipes/likeToggleRecipe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Common/Loader";

function Home() {
  const [getAllRecipes, setGetAllRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllRecipes();
    if (error) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  const handleGetAllRecipes = async () => {
    try {
      setLoading(true);
      const response = await getAllRecipesApi();
      setGetAllRecipes(response);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GetAllRecipes:", error);
      if (error.response?.status === 401) {
        toast.error("You have no access");
        setError("You have no access");
      } else {
        toast.error("Something went wrong");
        setError("Something went wrong");
      }
      setLoading(false);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {getAllRecipes?.data?.recipes?.map((recipe, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="flex flex-col justify-between h-full bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 transition-transform hover:scale-[1.02] hover:shadow-2xl">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500">
                      <span className="mx-1 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text font-semibold text-transparent">
                        By:
                      </span>
                      {recipe?.userName?.name}
                    </p>
                    <button
                      onClick={() => handleLikedToggleRecipes(recipe?.id)}
                      className="cursor-pointer rounded-lg px-4 py-1.5 font-medium text-white transition duration-200 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500"
                    >
                      ❤️ Like
                    </button>
                  </div>
                  <h3 className="mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                    {recipe?.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-4">
                    {recipe?.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-gray-700">
                    ❤ <span className="font-bold">{recipe?.likes}</span> Likes
                  </p>
                  <button
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg cursor-pointer font-medium hover:from-orange-500 hover:to-amber-400 transition"
                    onClick={() => navigate(`/recipe-details/${recipe?.id}`)}
                  >
                    Show Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}

export default Home;
