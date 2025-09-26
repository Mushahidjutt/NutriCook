import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../app/feautures/Authentication/authApi";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";
import { IconEyeOff, IconEyeCheck } from "@tabler/icons-react";
import CustomInput from "../Common/CustomInput";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address (e.g. name@example.com)")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});

export default function Login() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setLoadingButton(true);
        const res = await loginApi(values);
        toast.success("Login Successful");

        if (res?.token) {
          localStorage.setItem("token", res.token);
        }
        if (res?.data?.user?.role) {
          localStorage.setItem("role", res.data.user.role);
        }

        navigate("/");
      } catch (error) {
        toast.error("Failed! To Login");
        console.error("Login failed Put Correct email/Password:", error);
      } finally {
        setLoadingButton(false);
        setLoading(false);
      }
    },
  });

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <main className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 my-8 mx-6">
        <h1 className="text-4xl font-extrabold text-center mb-2  text-primary text-blue-500">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Please login to your account
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <>
           

            <div className="relative">
              {/* <label className="block text-gray-700 font-medium mb-1">
                Password
              </label> */}
              <CustomInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 shadow-sm"
                placeholder="Enter your password"
              />
              <div
                className="absolute top-[2.9rem] right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IconEyeCheck /> : <IconEyeOff />}
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="text-sm text-red-500 ml-2">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="text-center">
              <CustomButton
                type="submit"
                disabled={loading}
                value={
                  loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
                    </div>
                  ) : (
                    "Login"
                  )
                }
              />
            </div>
          </>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={handleNavigateSignup}
            className="cursor-pointer font-semibold text-purple-600 hover:text-purple-800"
          >
            Signup
          </span>
        </p>
      </main>
    </div>
  );
}
