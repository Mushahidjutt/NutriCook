import { makeApiCall } from "../../api";

export const loginApi = (data) => {
  return makeApiCall({
    url: "v1/users/login",
    method: "POST",
    data,
    noAuth: true,
  });
};

export const signupApi = (data) => {
  return makeApiCall({
    url: "v1/users/signup",
    method: "POST",
    data,
    noAuth: true,
  });
};

export const updatePasswordApi = (data) => {
  return makeApiCall({
    url: "v1/users/updateMyPassword",
    method: "PATCH",
    data,
    // noAuth: true,
  });
};
