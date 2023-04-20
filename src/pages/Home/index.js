import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import NewFeed from "../../components/NewFeed";
import { leftSideBar, rightSideBar } from "../../constants/sideBar";
import { Outlet, useLocation } from "react-router-dom";
import Paragraph from "../../components/SideBar/Paragraph";

const Home = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/");

  return (
    <div className="">
      <Header path={path[1]} />
      {path[1] !== "profile" && path[1] !== "create-post" ? (
        <div className="flex mt-[60px] gap-x-[10px] relative">
          <SideBar list={leftSideBar} customClass="left-[10px]"/>
          <Outlet />
          <Paragraph customClass="right-[10px]"/>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Home;
