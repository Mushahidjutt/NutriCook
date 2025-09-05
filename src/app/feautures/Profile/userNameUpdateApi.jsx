import { makeApiCall } from "../../api";

export const userNameUpdateApi = (data) => {
  return makeApiCall({
    url: "v1/users/updateMe",
    method: "PATCH",
    data,
  });
};
