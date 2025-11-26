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
  const [foodImages, setFoodImages] = useState([]);
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

      if (response?.data?.recipes?.length > 0) {
        let temp = [];
        for (let i = 0; i < response.data.recipes.length; i++) {
          const res = await fetch("https://foodish-api.com/api/");
          const data = await res.json();
          temp.push(data.image);
        }
        setFoodImages(temp);
      }

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
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
          {getAllRecipes?.data?.recipes?.map((recipe, index) => (
            <div key={index} className="relative group flex flex-col h-full">
              <div
                className="relative flex flex-col justify-between h-full rounded-3xl p-6 
        bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl 
        transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:border-white/50"
              >
             

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600 font-bold">
                      By:
                    </span>{" "}
                    <span className="font-semibold">
                      {recipe?.userName?.name}
                    </span>
                  </p>
                  <button
                    onClick={() => handleLikedToggleRecipes(recipe?.id)}
                    className="px-4 py-1.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-md hover:shadow-lg transition-all hover:from-red-600 hover:to-rose-500"
                  >
                    ❤️ Like
                  </button>
                </div>

                <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
                  {recipe?.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {recipe?.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    ❤{" "}
                    <span className="font-bold text-lg text-rose-600">
                      {recipe?.likes}
                    </span>{" "}
                    Likes
                  </p>
                  <button
                    className="px-5 py-2 rounded-xl font-semibold text-sm text-white shadow-md 
              bg-gradient-to-r from-amber-400 to-orange-500 hover:from-orange-500 hover:to-amber-400 
              transition-all duration-300 hover:shadow-lg"
                    onClick={() => navigate(`/recipe-details/${recipe?.id}`)}
                  >
                    Show Details ✨
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
