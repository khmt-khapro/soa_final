import React, { useState } from "react";
import Post from "./Post";

const sort = ["Liên quan", "Mới nhất", "Hàng đầu"];
function NewFeed() {
  const [select, setSelect] = useState(sort[0]);

  return (
    <div
      className={`mx-auto w-[calc(100%-20px)] sm:w-[calc(50%-20px)] relative `}
    >
      <div className="flex justify-around sm:justify-center text-center gap-x-4 fixed left-[50%] -translate-x-[50%] z-20 bg-white w-[calc(100%-20px)] sm:w-[calc(50%-20px)] rounded-b">
        {sort?.map((item) => (
          <div
            key={item}
            onClick={() => setSelect(item)}
            className={`border-b-[0.5px] ${
              item === select
                ? "border-sky-500 text-sky-500"
                : "border-transparent"
            } text-base py-2 w-[150px] sm:w-[100px] rounded-t-md cursor-pointer hover:bg-gray-100 transition-colors duration-300`}
          >
            {item}
          </div>
        ))}
      </div>
      <Post />
    </div>
  );
}

export default NewFeed;
