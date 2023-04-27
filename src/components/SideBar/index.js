import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar({ list, customClass }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const [isSelect, setIsSelect] = useState(0);

  useEffect(() => {
    let newIsSelect = 0;
    if (pathname === "/") newIsSelect = 0;
    else if (path[1] === "reading-list") newIsSelect = 1;
    else newIsSelect = 2;

    setIsSelect(newIsSelect);
  }, [pathname]);

  const handleItemClick = (itemId) => {
    let newIsSelect = itemId;
    setIsSelect(newIsSelect);
    navigate(`${list[itemId].path}`);
  };

  return (
    <div
      className={`hidden sm:flex sm:flex-col h-[calc(100% - 70px)] fixed ${customClass}`}
    >
      {list?.map((item) => (
        <div
          key={item.id}
          className={`w-full flex items-center gap-x-3 py-3 pl-10 mb-1 text-[16px] rounded-md hover:bg-sky-600 hover:text-white transition-all duration-200 cursor-pointer ${
            item.id === isSelect ? "bg-sky-600 text-white" : "text-gray-700"
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          {item.image}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default React.memo(SideBar);
