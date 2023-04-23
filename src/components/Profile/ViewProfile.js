import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewProfile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mt-[60px] w-full">
      <div className="h-[150px] bg-emerald-700 "></div>
      <div className="relative h-[300px] shadow-md mx-20 lg:mx-60 flex flex-col items-center rounded-b-sm">
        <div className="absolute left-[50%] -translate-x-[50%] -top-20">
          {/* <img className='cursor-pointer w-40 h-40 rounded-full shadow-lg' src="./images/dev-icon.webp" alt="avatar" /> */}
          <div className="w-40 h-40 bg-sky-700 rounded-full border-emerald-700 border-[5px] shadow-lg"></div>
        </div>
        <Link
          to="/profile/edit"
          className="py-2 text-center text-lg mt-24 w-[150px] font-medium rounded-md bg-sky-600 text-white hover:opacity-80 transition-opacity duration-300"
        >
          Chỉnh sửa
        </Link>
        <p className="text-4xl font-extrabold my-3">
          {user?.fullname || "Tên"}
        </p>
        <p className="text-lg my-3 text-emerald-700">Sở thích</p>
        <p className="text-lg ">Ngày tham gia</p>
      </div>
      <div className="mx-20 lg:mx-60 h-[200px] w-[calc(50%-80px)] lg:w-[calc(50%-240px)] rounded-b-sm shadow-md mt-4">
        <div className="flex justify-center items-center gap-x-3 p-4">
          <i className="text-xl fa-solid fa-upload"></i>
          <p className="font-medium text-lg">Đã đăng 10 bài viết</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
