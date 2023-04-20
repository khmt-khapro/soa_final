import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar({ list, customClass }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  console.log(path[1]);
  const [isSelect, setIsSelect] = useState(0);

  useEffect(() => {
    if (pathname === "/") setIsSelect(0);
    else if (path[1] === "reading-list") setIsSelect(1);
    else setIsSelect(2);
  }, [pathname]);

  return (
    <div
      className={`hidden sm:flex sm:flex-col h-[calc(100% - 70px)] w-[calc(25%-10px)] fixed ${customClass} mt-[10px]`}
    >
      {list?.map((item) => (
        <div
          key={item.id}
          className={`w-full flex items-center gap-x-3 py-3 pl-10 mb-1 text-[16px] rounded-md hover:bg-sky-600 hover:text-white transition-all duration-200 cursor-pointer ${
            item.id === isSelect
              ? "bg-sky-600 text-white"
              : "text-gray-700"
          }`}
          onClick={() => {
            setIsSelect(item.id);
            navigate(`${item.path}`);
          }}
        >
          {item.image}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
