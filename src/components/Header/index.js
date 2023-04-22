import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import { leftSideBar } from "../../constants/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Header({ path }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth);

  const [isSelect, setIsSelect] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);

  // const { pathname } = useLocation();
  // const [isChoose, setIsChoose] = useState(0);

  const navigateProfile = () => {
    navigate(`/profile/view`);
    setIsSelect(false);
  };

  const navigateDashboard = () => {
    navigate(`/profile/dashboard`);
    setIsSelect(false);
  };

  const navigateReadingList = () => {
    navigate(`/reading-list`);
    setIsSelect(false);
  };

  const navigateSetting = () => {
    navigate(`/profile/setting/edit-profile`);
    setIsSelect(false);
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }

  return (
    <header className="bg-gray-200 fixed top-0 w-full h-[60px] flex items-center justify-around z-50 border-black border-opacity-20 border-b-[1px]">
      <div className="flex items-center gap-x-5 relative">
        <i
          onClick={() => setIsDisplay(!isDisplay)}
          className="fa-solid fa-bars cursor-pointer text-lg p-2 rounded-md hover:bg-gray-300 transition-colors duration-200 flex justify-center items-center sm:hidden"
        ></i>
        <img
          onClick={() => navigate("/")}
          className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          src="/images/dev-icon.webp"
        />
        <Search placeHolder="Bạn muốn tìm gì?" customClass="w-[300px]" />

        {isDisplay && (
          <div className="fixed top-[60px] bg-white shadow-lg rounded-b-md w-[200px] flex flex-col gap-y-1 sm:hidden">
            {leftSideBar?.map((item) => (
              <div
                key={item.id}
                className={`w-full flex items-center gap-x-3 py-3 pl-10 hover:bg-sky-600 hover:text-white transition-all duration-200 cursor-pointer`}
                onClick={() => {
                  setIsDisplay(false);
                  navigate(`${item.path}`);
                }}
              >
                {item.image}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {!user?.accessToken ? (
        <div className="flex items-center gap-x-5">
          <Link
            to="/signin"
            className="font-medium hover:underline hover:text-emerald-600 transition-colors duration-200"
          >
            Đăng nhập
          </Link>
          <Link
            to="/signup"
            className="font-medium text-sky-600 border-sky-500 border-[1px] py-2 px-5 rounded-md hover:bg-sky-500 hover:text-white transition-all duration-200"
          >
            Đăng ký
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-x-5 relative">
          <Link
            to={"create-post"}
            className={`hidden sm:block cursor-pointer px-5 py-2 rounded-md border-emerald-600 border-[1px] font-medium text-emerald-600 hover:bg-emerald-600 hover:text-white transition-alls duration-300 ${
              path === "create-post" && "hidden"
            }`}
          >
            Tạo bài đăng
          </Link>
          <i className="cursor-pointer p-3 text-xl leading-5 rounded-full fa-sharp fa-solid fa-bell hover:bg-gray-300 transition-colors duration-300"></i>
          <img
            onClick={() => setIsSelect(!isSelect)}
            className="cursor-pointer rounded-full w-8 h-8 hover:opacity-80 transition-opacity duration-300"
            src="/images/google-icon.png"
            alt="avatar"
          />
          {isSelect && (
            <div className="absolute right-0 top-[51px] bg-white rounded-b-md shadow-lg flex flex-col text-left">
              <div
                onClick={navigateProfile}
                className="font-medium cursor-pointer hover:text-sky-400 transition-colors duration-200 p-3 border-emerald-200 border-b-[1px]"
              >
                {user?.fullname}
              </div>
              <div
                onClick={navigateDashboard}
                className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 p-3"
              >
                Tổng quan
              </div>
              <div
                onClick={navigateReadingList}
                className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 p-3"
              >
                Xem sau
              </div>
              <div
                onClick={navigateSetting}
                className="cursor-pointer hover:bg-gray-100 transition-colors duration-200 p-3"
              >
                Cài đặt
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-600 transition-colors duration-200 p-3 font-medium border-emerald-200 border-t-[1px]"
              >
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
