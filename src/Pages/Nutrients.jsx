import React, { useState, useEffect } from "react";
import Navbar from "../Components/Layout/Navbar";
import axios from "axios";

function Nutrients() {
  const [nutrients, setNutrients] = useState([]);
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   axios
  //     .post("api/v1/recipes/nutrients")
  //     .then((response) => setNutrients(response.data))
  //     .catch((error) => console.error("Error ", error));
  // }, []);

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
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center mt-10">
        <div className=" w-full max-w-3xl bg-amber-200 p-8 rounded-3xl shadow-2xl">
          <h1 className="text-center text-2xl font-semibold">Calculate Nutrients</h1>

          <input
            type="text"
            placeholder="e.g. 2 apple"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-amber-300 p-2 cursor-pointer"
            onClick={handleGetNutrients}
          >
            Check
          </button>

          {nutrients && (
            <div>
              <h2>Result</h2>
              <p>Food: {nutrients.food}</p>
              <p>Calories: {nutrients.calories}</p>
              <p>Protein: {nutrients.protein}</p>
              <p>Carbs: {nutrients.carbs}</p>
              <p>Fat: {nutrients.fat}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
