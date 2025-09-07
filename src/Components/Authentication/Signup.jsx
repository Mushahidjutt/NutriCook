import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import { signupApi } from "../../app/feautures/Authentication/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters"),
  email: Yup.string().required("Email address is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string().required("Confirm Password is required"),
});

function Signup() {
  const navigate = useNavigate();

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
        const res = await signupApi(values);
        toast.success("Account created successfully 🎉");
        console.log("SignUp success:", res);
        navigate("/login");
      } catch (error) {
        toast.error("Failed to Signup. Try Again!");
        console.error("Signup Failed:", error);
      }
    },
  });

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <main className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Sign up to get started 🚀
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1 ml-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your full name"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 ml-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 ml-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white text-gray-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-300 shadow-sm"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 ml-2">
              Confirm Password
            </label>
            <input
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
                <div className="text-sm text-red-500">
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </div>

          <div className="text-center">
            <CustomButton type="submit" value="Sign Up" />
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
