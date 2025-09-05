import React from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";
import CustomButton from "../Components/Common/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createRecipesApi } from "../app/feautures/Recipes/recipesApi";

export default function Recipe() {
  const validationSchema = Yup.object({
    title: Yup.string().required("Recipe name is required"),
    description: Yup.string().required("Description is required"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingName: Yup.string().required("Ingredient is required"),
        })
      )
      .min(1, "At least one ingredient is required"),
    instructions: Yup.string().required("Instructions are required"),
    preparationTime: Yup.number()
      .required("Preparation time is required")
      .positive()
      .integer(),
    cookingTime: Yup.number()
      .required("Cooking time is required")
      .positive()
      .integer(),
    cuisine: Yup.string().required("Cuisine is required"),
    dietaryPreferences: Yup.string().required("Dietary preference is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      ingredients: [], // start empty array of objects
      instructions: "",
      preparationTime: "",
      cookingTime: "",
      cuisine: "",
      dietaryPreferences: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createRecipesApi(values);
        console.log("Recipe Created:", response);
      } catch (error) {
        console.error("Failed to Create Recipe:", error);
      }
    },
  });

  const addIngredient = () => {
    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      { ingName: "" },
    ]);
  };

  const removeIngredient = (index) => {
    const updated = formik.values.ingredients.filter((_, i) => i !== index);
    formik.setFieldValue("ingredients", updated);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl font-semibold mb-6 mt-4">
        Create Recipe
      </h1>

      <div className="flex justify-center items-center my-6">
        <div className=" w-full max-w-3xl p-8 rounded-3xl shadow-2xl bg-amber-200">
          <form onSubmit={formik.handleSubmit}>
            {/* Recipe Name */}
            <div className="mb-4">
              <CustomInput
                label="Enter Recipe Name"
                name="title"
                placeholder="Enter Recipe Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title && (
                <div className="text-red-600 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <CustomInput
                label="Description"
                name="description"
                variant="textarea"
                placeholder="Enter Recipe Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-600 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>

            {/* Ingredients */}
            {formik.values.ingredients.map((ingredient, index) => (
              <div key={index} className="mb-4 ">
                <CustomInput
                  label={`Ingredient ${index + 1}`}
                  name={`ingredients[${index}].ingName`}
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient.ingName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="text-red-600 font-semibold hover:text-red-400"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
                {formik.errors.ingredients &&
                  formik.errors.ingredients[index] &&
                  formik.errors.ingredients[index].ingName &&
                  formik.touched.ingredients &&
                  formik.touched.ingredients[index] && (
                    <div className="text-red-600 text-sm">
                      {formik.errors.ingredients[index].ingName}
                    </div>
                  )}
              </div>
            ))}

            <button
              type="button"
              className="font-semibold text-blue-700 cursor-pointer mb-6"
              onClick={addIngredient}
            >
              Add Another Ingredient
            </button>

            {/* Instructions */}
            <div className="mb-4">
              <CustomInput
                label="Instructions"
                name="instructions"
                variant="textarea"
                placeholder="Enter Cooking Details"
                value={formik.values.instructions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.instructions && formik.touched.instructions && (
                <div className="text-red-600 text-sm">
                  {formik.errors.instructions}
                </div>
              )}
            </div>

            {/* Prep Time */}
            <div className="mb-4">
              <CustomInput
                label="Preparation Time (minutes)"
                name="preparationTime"
                type="number"
                placeholder="Enter Preparation Time"
                value={formik.values.preparationTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.preparationTime &&
                formik.touched.preparationTime && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.preparationTime}
                  </div>
                )}
            </div>

            {/* Cook Time */}
            <div className="mb-4">
              <CustomInput
                label="Cooking Time (minutes)"
                name="cookingTime"
                type="number"
                placeholder="Enter Cooking Time"
                value={formik.values.cookingTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.cookingTime && formik.touched.cookingTime && (
                <div className="text-red-600 text-sm">
                  {formik.errors.cookingTime}
                </div>
              )}
            </div>

            {/* Cuisine */}
            <div className="mb-4">
              <CustomInput
                label="Cuisine"
                name="cuisine"
                placeholder="Enter Cuisine Type"
                value={formik.values.cuisine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.cuisine && formik.touched.cuisine && (
                <div className="text-red-600 text-sm">
                  {formik.errors.cuisine}
                </div>
              )}
            </div>

            {/* Dietary */}
            <div className="mb-4">
              <CustomInput
                label="Dietary Preferences"
                name="dietaryPreferences"
                placeholder="Enter Dietary Preferences (Comma Separated)"
                value={formik.values.dietaryPreferences}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.dietaryPreferences &&
                formik.touched.dietaryPreferences && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.dietaryPreferences}
                  </div>
                )}
            </div>

            <div className="text-center">
              <CustomButton type="submit" value="Create Recipe" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
