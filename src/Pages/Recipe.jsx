import React from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";
import CustomButton from "../Components/Common/Button/CustomButton";
import { useState } from "react";

function Recipe() {
  // const [ingredients, setIngredients] = useState("");
  const [ingredientsList, setIngredientsList] = useState([""]);

  const handleInputChange = (index, value) => {
    const updatevalue = [...ingredientsList];
    updatevalue[index] = value;
    setIngredientsList(updatevalue);
  };

  const AddIngredients = () => {
    // if (ingredientsList.trim() !== "") {
      setIngredientsList([...ingredientsList, ""]);
    
  };
  const RemoveInput = (index) => {
    const updateList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(updateList);
  };
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl font-semibold mb-6 mt-4">
        Create Recipe
      </h1>

      <div className="flex justify-center items-center my-6">
        <div className=" w-full max-w-3xl p-8 rounded-3xl shadow-2xl bg-amber-200">
          <CustomInput
            label="Enter Recipe Name"
            placeholder="Enter Recipe Title"
          />
          <CustomInput
            label="Description "
            variant="textarea"
            type="text"
            placeholder="Enter Recipe Description"
          />

          {ingredientsList.map((ingredients, index) => {
            return (
              <>
                {" "}
                <div key={index} className="mb-4">
                  <CustomInput
                    label="Ingredients "
                    value={ingredients}
                    variant="default"
                    type="text"
                    placeholder={` Ingredient ${index + 1}`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                  <button onClick={() => RemoveInput(index)}>Remove</button>
                </div>
              </>
            );
          })}

          <button
            className="font-semibold text-blue-700 cursor-pointer mb-8"
            onClick={AddIngredients}
          >
            Add Another Ingredients
          </button>
          <br />

          <CustomInput
            label="Instructions"
            variant="textarea"
            type="text"
            placeholder="Enter Cooking Details"
          />
          <CustomInput
            label="Preparation Time (minutes)"
            variant="default"
            type="number"
            placeholder="Enter Preparation Time "
          />
          <CustomInput
            label="Cooking Time (minutes)"
            variant="default"
            type="number"
            placeholder="Enter Cooking Time "
          />
          <CustomInput
            label="Cuisine"
            variant="default"
            type="text"
            placeholder="Enter Cuisine Type "
          />
          <CustomInput
            label="Dietary Preferences"
            variant="default"
            type="text"
            placeholder="Enter Dietary Preferences(Comma Seprate) "
          />
          {/* <label className="font-bold ml-4">Submit</label> */}
          <div className="text-center">
            <CustomButton value="Create Recipe" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipe;
