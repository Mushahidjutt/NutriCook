import { makeApiCall } from "../../api";

export const currentUserRecipesApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/me",
    method: "GET",
    data,
    noAuth: true,
  });
};

export const createRecipesApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/",
    method: "POST",
    data,
    noAuth: true,
  });
};

export const getNutrientsApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/nutrients",
    method: "POST",
    data,
    noAuth: true,
  });
};
