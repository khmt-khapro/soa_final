import React from "react";
import Search from "../Search";

function ReadingList() {
  return (
    <div
      className={`mx-auto w-[calc(100%-20px)] sm:w-[calc(50%-20px)]`}
    >
      <div className="flex flex-col gap-y-[10px] md:flex-row items-center justify-between mb-[10px]">
        <div className="font-medium text-emerald-600 text-2xl text-center md:text-left">
        Đã lưu (0)
        </div>
        <Search
          placeHolder="Nhập tên thẻ"
          customClass="w-full md:w-[200px]"
        />
      </div>
      <div className="bg-gray-100 rounded p-[10px] shadow-md relative flex items-center gap-x-4">
        <img
          className="w-10 h-10"
          src="./images/google-icon.png"
          alt="avatar"
        />
        <div>
          <p className="text-left font-bold">Title</p>
          <div className="flex items-center gap-x-3 text-sm">
            <p className="font-bold">Name</p>
            <div className="">Date</div>
            <p>tag</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingList;
