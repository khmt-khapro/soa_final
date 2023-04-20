import React, { useEffect, useState } from "react";
import { clearMessage } from "../../redux/messageSlice";
import { useDispatch } from "react-redux";

const types = {
  success: "fa-check",
  info: "fa-info",
  error: "fa-exclamation",
};

const Toast = ({type = "info", message = "Empty message" }) => {
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowMessage(true)

    const countdown = setTimeout(function () {
      setShowMessage(false)
    }, 5500);

    const delayAfter = setTimeout(() => dispatch(clearMessage()), 6000);

    return () => {
      clearTimeout(countdown);
      clearTimeout(delayAfter);
    };
  }, []);

  return (
    <div
      className={`relative mb-4 min-w-[400px] max-w-[500px] overflow-hidden rounded-lg ${
        type === "success"
          ? "border-l-green-500"
          : type === "info"
          ? "border-l-blue-500"
          : "border-l-red-500"
      }  bg-white py-5 px-6 shadow-md transition-all duration-500 ease-custom-trans ${
        showMessage ? "translate-x-0" : "translate-x-[calc(100%+35px)]"
      } `}
    >
      <div className="pp-toast-content flex items-center gap-5">
        <i
          className={`fa-solid ${
            types[type]
          } pp-icon flex h-[34px] w-[34px] items-center justify-center rounded-full ${
            type === "success"
              ? "bg-green-500"
              : type === "info"
              ? "bg-blue-500"
              : "bg-red-500"
          } text-base text-white`}
        ></i>
        <div className="pp-message flex flex-col">
          <span className="pp-text pp-title text-base font-semibold capitalize text-gray-500">
            {type === "success" ? "thành công" : type === "error" ? "lỗi" : "thông báo"}
          </span>
          <span className="pp-text pp-content text-base text-gray-500">
            {message}
          </span>
        </div>
      </div>
      <i
        className="fa-solid fa-xmark pp-close absolute top-[10px] right-[15px] p-[6px] opacity-50 duration-500 hover:cursor-pointer hover:opacity-100"
        onClick={() => setShowMessage(false)}
      ></i>
      <div
        className={`pp-progress absolute bottom-0 left-0 h-[3px] w-full bg-gray-200 before:absolute before:top-0 before:right-full before:h-full before:w-full ${
          type === "success"
            ? "before:bg-green-500"
            : type === "info"
            ? "before:bg-blue-500"
            : "before:bg-red-500"
        } before:content-[''] ${
          showMessage ? "before:animate-[timeout_5s_linear]" : ""
        }`}
      ></div>
    </div>
  );
};

export default Toast;
