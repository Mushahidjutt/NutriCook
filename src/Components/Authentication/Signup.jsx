import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import { signupApi } from "../../app/feautures/Authentication/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomInput from "../Common/CustomInput";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
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
  passwordConfirm: Yup.string()
    .required("Confirm Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await signupApi(values);
        toast.success("Account created successfully 🎉");
        console.log("SignUp success:", res);
        navigate("/login");
      } catch (error) {
        toast.error("Failed to Signup. Try Again!");
        console.error("Signup Failed:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <main className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 my-6 mx-6">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Sign up to get started 🚀
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5 my-6">
          <div>
            <CustomInput
              label="Full Name"
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your full name"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-sm text-red-500 ml-2">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <CustomInput
              label="Email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500 ml-2">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <CustomInput
              label="Password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500 ml-2">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <CustomInput
              label="Confirm Password"
              type="password"
              name="passwordConfirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Re-enter your password"
            />
            {formik.errors.passwordConfirm &&
              formik.touched.passwordConfirm && (
                <div className="text-sm text-red-500 ml-2">
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </div>

          <div className="text-center">
            <CustomButton
              type="submit"
              value={
                loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"></div>
                  </div>
                ) : (
                  "Sign Up"
                )
              }
            />
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={handleNavigateLogin}
            className="cursor-pointer font-semibold text-pink-600 hover:text-pink-800"
          >
            Login
          </span>
        </p>
      </main>
    </div>
  );
}

export default Signup;
