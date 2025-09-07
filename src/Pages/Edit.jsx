import React, { useEffect } from "react";
import Navbar from "../Components/Layout/Navbar";
import CustomInput from "../Components/Common/CustomInput";
import CustomButton from "../Components/Common/Button/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getRecipeByIdApi,
  getRecipeUpdateByIdApi,
} from "../app/feautures/Recipes/recipesApi";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Recipe name is required"),
    description: Yup.string().required("Description is required"),
    ingredients: Yup.array()
      .of(
        Yup.object({ ingName: Yup.string().required("Ingredient is required") })
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
      ingredients: [],
      instructions: "",
      preparationTime: "",
      cookingTime: "",
      cuisine: "",
      dietaryPreferences: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await getRecipeUpdateByIdApi(id, {
          ...values,

          instructions: values.instructions
            ? values.instructions.split("\n").map((i) => i.trim())
            : [],
          dietaryPreferences: values.dietaryPreferences
            ? values.dietaryPreferences.split(",").map((i) => i.trim())
            : [],
        });
        toast.success("Recipe Updated Successfully ");
        navigate("/recipes");
      } catch (error) {
        console.error("Failed to Update Recipe:", error);
        toast.error("Recipe Update Failed ");
      }
    },
  });

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await getRecipeByIdApi(id);
        const data = res?.data?.recipe;
        console.log(data, "Fetched recipe data");

        formik.setValues({
          title: data.title || "",
          description: data.description || "",
          ingredients: data.ingredients || [],
          instructions: Array.isArray(data.instructions)
            ? data.instructions.join("\n")
            : data.instructions || "",
          preparationTime: data.preparationTime || "",
          cookingTime: data.cookingTime || "",
          cuisine: data.cuisine || "",
          dietaryPreferences: Array.isArray(data.dietaryPreferences)
            ? data.dietaryPreferences.join(", ") //
            : data.dietaryPreferences || "",
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        toast.error("Failed to load recipe data ");
      }
    }
    fetchRecipe();
  }, [id]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Navbar />

      <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-8 mt-6">
        ✏️ Edit Recipe
      </h1>

      <div className="flex justify-center items-center pb-10">
        <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-2xl border border-sky-300">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <CustomInput
                label="Recipe Name"
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

            <div>
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

            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
              <h3 className="text-lg font-semibold mb-3 text-sky-700">
                🛒 Ingredients
              </h3>
              {formik.values.ingredients.map((ingredient, index) => (
                <div key={index} className="mb-3">
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
                    className="text-red-600 font-semibold hover:text-red-400 text-sm mt-1"
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
                className="text-sky-700 font-semibold mt-2 hover:underline"
                onClick={addIngredient}
              >
                ➕ Add Ingredient
              </button>
            </div>

            <div>
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

            <div className="grid grid-cols-2 gap-6">
              <div>
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
              <div>
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
            </div>

            <div>
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

            <div>
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

            <div className="text-center pt-4">
              <CustomButton type="submit" value=" Update Recipe" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
