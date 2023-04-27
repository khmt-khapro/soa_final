import React, { useEffect } from "react";
import { HeaderForm } from "../../components/Form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewPassword, reset } from "../../redux/authSlice";

const CreatNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // get token from url
  const location = useLocation();
  const token = location.search.split("=")[1];
  console.log("🚀 ~ file: index.js:14 ~ CreatNewPassword ~ token:", token);

  const { loading, error, success, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }

    if (success) {
      toast.success(message);
      dispatch(reset());
    }
  }, [success, error]);
  // formik validation
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Mật khẩu không thể để trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Ít nhất tám ký tự, bao gồm một chữ cái, một số và một ký tự đặc biệt"
        ),
      passwordConfirm: Yup.string()
        .required("Mật khẩu không thể để trống")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: (values, onSubmitProps) => {
      // values is an object with all the form values
      dispatch(createNewPassword({ ...values, token }));

      // reset form
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (
    <div className="bg-blur-1 w-screen min-h-screen flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] lg:w-[40%] bg-gray-100 shadow-md rounded-sm p-4">
        <HeaderForm
          image={
            <i className="text-3xl text-cyan-600 fa-solid fa-lock rounded-[50%] shadow-md p-2" />
          }
          heading="Tạo mật khẩu mới"
        />

        {/* create new passord form */}
        <div>
          <form action="" className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-800 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="password"
                  placeholder="Nhập password của bạn"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-600 text-[14px]">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="passwordConfirm"
                className="text-base font-medium text-gray-900"
              >
                PasswordConfirm
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-800 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  type="password"
                  placeholder="Nhập passwordConfirm của bạn"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />

                {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm && (
                    <p className="text-red-600 text-[14px]">
                      {formik.errors.passwordConfirm}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              >
                Gửi yêu cầu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  ></path>
                </svg>
              </button>
            </div>
          </form>

          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            <Link
              to={"/signin"}
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatNewPassword;
