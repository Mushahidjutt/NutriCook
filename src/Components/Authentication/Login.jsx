import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../app/feautures/Authentication/authApi";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
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
      }
    },
  });

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <main className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please login to your account
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 shadow-sm"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full border border-gray-300 rounded-xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300 shadow-sm"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div className="text-center">
            <CustomButton
              type="button"
              value="Login"
              onClick={formik.handleSubmit}
            />
          </div>
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
