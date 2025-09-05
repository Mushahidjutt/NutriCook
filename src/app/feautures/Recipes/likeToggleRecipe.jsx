import { makeApiCall } from "../../api";

export const likeToggleRecipeApi = (id) => {
  return makeApiCall({
    url: `v1/recipes/like/${id}`,
    method: "PATCH",
  });
};

export const likedRecipeApi = (data) => {
  return makeApiCall({
    url: "v1/recipes/likedRecipes/",
    method: "GET",
    data,
  });
};
