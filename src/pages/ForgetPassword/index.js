import React from "react";
import ForgetPassword from "../../components/ForgotPassword";
import { FooterForm, HeaderForm } from "../../components/Form";

function ForgetPasswordPage() {
  return (
    <div className="bg-blur-1 w-screen min-h-screen flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] lg:w-[40%] bg-gray-100 shadow-md rounded-sm p-4">
        <HeaderForm
          image={<i className="text-3xl text-cyan-600 fa-solid fa-lock rounded-[50%] shadow-md p-2" />}
          heading="LẤY LẠI MẬT KHẨU"
        />
        <ForgetPassword />
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
