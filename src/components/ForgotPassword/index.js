import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, reset } from "../../redux/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();

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

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email không thể để trống"),
    }),
    onSubmit: (values, onSubmitProps) => {
      // values is an object with all the form values
      dispatch(forgotPassword(values.email));

      // reset form
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (
    <div>
      <form action="" className="mt-4" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-900 dark:text-gray-200"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              type="email"
              placeholder="Nhập email của bạn"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-[14px]">{formik.errors.email}</p>
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
    </div>
  );
}

export default ForgotPassword;
