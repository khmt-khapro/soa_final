import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, signin } from "../../redux/authSlice";

function SigninPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/')
    }
  }, [success, error]);

  // formik validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email không thể để trống"),
      password: Yup.string()
        .required("Mật khẩu không thể để trống")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Ít nhất tám ký tự, bao gồm một chữ cái, một số và một ký tự đặc biệt"
        ),
    }),
    onSubmit: (values, onSubmitProps) => {
      // values is an object with all the form values
      dispatch(signin(values));

      // reset form
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (
    <div className="bg-blur-1 w-screen min-h-screen flex justify-center items-center">
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
            <div className="w-[75%] md:w-[50%] lg:w-[75%]">
              <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                Đăng nhập
              </h2>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                Bạn chưa có tài khoản? {" "}
                <Link
                  to={"/signup"}
                  href=""
                  title=""
                  className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                >
                  Đăng ký
                </Link>
              </p>
              <form
                action=""
                method="POST"
                className="mt-8"
                onSubmit={formik.handleSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900 dark:text-gray-200"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="email"
                        placeholder="Nhập email của bạn"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />

                      {formik.touched.email && formik.errors.email && (
                        <p className="text-red-600 text-[14px]">
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900 dark:text-gray-200"
                    >
                      Mật khẩu
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
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

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    >
                      Đăng nhập
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
                </div>
              </form>

              <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                <Link
                  to={"/forgot-password"}
                  className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                >
                  Quên mật khẩu?
                </Link>
              </p>
            </div>
          </div>

          <div className="h-full w-full">
            <img
              className="mx-auto h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SigninPage;
