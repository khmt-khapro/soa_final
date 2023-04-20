import React from "react";
import SigninForm from "../../components/Signin";
import { HeaderForm, FooterForm } from "../../components/Form";

function SigninPage() {
  return (
    <div
      className="bg-blur-1 w-screen min-h-screen flex justify-center items-center"
    >
      <div className="w-[95%] md:w-[50%] lg:w-[40%] bg-gray-100 shadow-md rounded-sm p-4">
        <HeaderForm
          image={<i className="text-3xl text-cyan-600 fa-solid fa-user rounded-[50%] shadow-md p-2"/>}
          heading="ĐĂNG NHẬP"
          paragraph="Bạn chưa có tài khoản?"
          linkName="Đăng ký"
          linkUrl="/signup"
        />
        <SigninForm />
        <FooterForm />
      </div>
    </div>
  );
}

export default SigninPage;
