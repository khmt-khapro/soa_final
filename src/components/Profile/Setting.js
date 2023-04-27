import React from "react";
import SideBar from "../SideBar";
import { singleSideBar } from "../../constants/sideBar";
import { Outlet } from "react-router-dom";

function Setting() {
  return (
    <div className="mx-20 mt-[70px] relative">
      <p className="text-left text-3xl font-medium fixed top-[70px]">Cài đặt</p>
      <div className="flex gap-x-3 relative mt-[120px]">
        <SideBar list={singleSideBar} customClass="w-[200px]" />
        <div className="overflow-y-auto flex-1 ml-[calc(200px+12px)] bg-gray-100 rounded-md border-gray-600 border-[0.5px]">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Setting;
