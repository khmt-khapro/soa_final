import React from "react";

function Paragraph({customClass}) {
  return (
    <div className={` hidden sm:flex sm:flex-col h-[calc(100% - 70px)] w-[calc(25%-10px)] fixed ${customClass}`}>
      <p className="text-xl font-medium mb-4">Giới thiệu</p>
      <ul className="space-y-[10px]">
        <li>
          Đây là cộng đồng của những người đam mê về lập trình, công nghệ,...
        </li>
        <li>
          Một nơi để mọi người có thể học hỏi, trao đổi kinh nghiệm
        </li>
        {/* <li></li> */}
      </ul>
    </div>
  );
}

export default Paragraph;
