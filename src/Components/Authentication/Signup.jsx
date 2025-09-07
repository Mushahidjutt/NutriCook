import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/Button/CustomButton";
import CustomInput from "../Common/CustomInput";
import { signupApi } from "../../app/feautures/Authentication/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .required(" Full Name is required")
    .min(3, " Full Name must be at least 3 characters"),
  email: Yup.string().required("Address is required"),
  password: Yup.string().required("password is required"),
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
        toast.success("You have Succesful created a Account");

        console.log("SignUp  success:", res);
        navigate("/login");
      } catch (error) {
        toast.error("Failed To Signup. -Try Again-");

        console.error("Signup Failed : ", error);
      }
    },
  });

  const handleNavigateLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold text-center my-6">Sign Up</h1>
        <div className="flex justify-center">
          <div className='" w-full max-w-3xl  p-8 rounded-3xl shadow-2xl mb-8   bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200'>
            <h1 className="font-semibold text-center">
              Please Sign up for an account
            </h1>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              <div className="mb-5 flex flex-col gap-3">
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-5 flex flex-col gap-2">
                <label className="text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  className="input grow border border-gray-300 rounded-2xl bg-white px-4 py-2 text-gray-700 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {formik.errors.passwordConfirm &&
                formik.touched.passwordConfirm ? (
                  <div style={{ color: "red" }} className="text-sm">
                    {formik.errors.passwordConfirm}
                  </div>
                ) : null}
              </div>

              <div className="text-center">
                <CustomButton type="submit" value="Sign Up"></CustomButton>
              </div>
            </form>
            <h1 className=" font-semibold text-center my-4">Alreay a user?</h1>
            <div className="text-center">
              <CustomButton value="Login" onClick={handleNavigateLogin} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
