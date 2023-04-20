import React from "react";

function FooterForm({heading="hoặc"}) {
  return (
    <div>
      <div className="flex items-center my-4">
        <div className="flex-1 h-[1px] bg-gray-300"></div>
        <p className="px-3 text-neutral-500 ">{heading}</p>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>
      <div className="flex justify-center gap-x-6">
        <img
          className="w-10 h-10 p-1 cursor-pointer shadow-md rounded-[50px] hover:bg-gray-200 transition-opacity duration-200"
          src="./images/google-icon.png"
          alt="google icon"
        />
        <img
          className="w-10 h-10 cursor-pointer shadow-md rounded-[50px] hover:bg-gray-200 transition-opacity duration-200"
          src="./images/github-icon.png"
          alt="google icon"
        />
      </div>
    </div>
  );
}

export default FooterForm;
