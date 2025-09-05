import { makeApiCall } from "../../api";

export const userNameMeApi = (data) => {
  return makeApiCall({
    url: "v1/users/me",
    method: "GET",
    data,
  });
};
