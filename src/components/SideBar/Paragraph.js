import React from "react";

function Paragraph({customClass}) {
  return (
    <div className={`pl-10 hidden sm:flex sm:flex-col h-[calc(100% - 70px)] w-[calc(25%-10px)] fixed ${customClass} mt-[10px]`}>
      <p className="text-xl font-medium mb-4">Giới thiệu</p>
      <ul>
        <li>
          Đây là cộng đồng của những người đam mê về lập trình, công nghệ,...
        </li>
        {/* <li></li> */}
      </ul>
    </div>
  );
}

export default Paragraph;
