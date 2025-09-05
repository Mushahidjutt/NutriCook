import { makeApiCall } from "../../api";

export const userEmailUpdateApi = (email) => {
  return makeApiCall({
    url: "v1/users/updateMe",
    method: "PATCH",
    data: email,
  });
};
