import { makeApiCall } from "../../api";

export const currentUserRecipesApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/me",
    method: "GET",
    data,
  });
};

export const createRecipesApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/",
    method: "POST",
    data,
  });
};

export const getNutrientsApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/nutrients",
    method: "POST",
    data,
  });
};

export const getAllRecipesApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/",
    method: "GET",
    data,
  });
};

export const getRecipeByIdApi = (id) => {
  return makeApiCall({
    url: `v1/recipes/${id}`,
    method: "GET",
  });
};

export const getRecipeUpdateByIdApi = (id, data) => {
  return makeApiCall({
    url: `v1/recipes/${id}`,
    method: "PATCH",
    data,
  });
};

export const getRecipeDeleteByIdApi = (id) => {
  return makeApiCall({
    url: `v1/recipes/${id}`,
    method: "DELETE",
  });
};
