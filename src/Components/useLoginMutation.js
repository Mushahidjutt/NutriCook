
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/authService";
import { toast } from "react-toastify";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      // Example: store token or user data
      localStorage.setItem("token", response?.token);
      toast.success("Login successful!");
      // redirect after login
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    },
  });
};
