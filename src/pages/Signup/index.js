import React from "react";
import SignupForm from "../../components/Signup";
import { FooterForm, HeaderForm } from "../../components/Form";

function SignupPage() {
  return (
    <div className="bg-blur-1 w-screen min-h-screen flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] lg:w-[40%] bg-gray-100 shadow-md rounded-sm p-4">
        <HeaderForm
          image={
            <i className="text-3xl text-cyan-600 fa-solid fa-user-plus rounded-[50%] shadow-md p-2" />
          }
          heading="ĐĂNG KÝ"
          paragraph="Bạn đã có tài khoản?"
          linkName="Đăng nhập"
          linkUrl="/signin"
        />
        <SignupForm />
        <FooterForm heading="hoặc đăng nhập qua" />
      </div>
    </div>
  );
}

export default SignupPage;
