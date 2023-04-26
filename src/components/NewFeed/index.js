import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { getNewsFeed } from "../../redux/apis/post";
import { resetPost } from "../../redux/postSlice";

const category = [
  { name: "Liên quan", filter: "relevant" },
  { name: "Mới nhất", filter: "latest" },
  { name: "Hàng đầu", filter: "top" },
];

const topFilters = [
  { name: "Tuần", filter: "week" },
  { name: "Tháng", filter: "month" },
  { name: "Năm", filter: "year" },
];

function NewFeed() {
  const dispatch = useDispatch();
  // handle load more post
  const [currentPage, setCurrentPage] = useState(1);
  const [select, setSelect] = useState(category[0].name);
  const [filter, setFilter] = useState(category[0].filter);
  const [topFilter, setTopFilter] = useState(topFilters[0].filter);

  // fetch post base on "select"
  useEffect(() => {
    let query = { filter, page: currentPage };
    if (filter === "top") {
      query = { ...query, topFilter };
    }
    getNewsFeed(dispatch, query);
  }, [filter, currentPage, topFilter]);

  return (
    <div
      className={`mx-auto w-[calc(100%-20px)] sm:w-[calc(50%-20px)] relative`}
    >
      <div className="flex justify-around sm:justify-center text-center gap-x-4 fixed top-[60px] left-[50%] -translate-x-[50%] z-20 bg-white w-[calc(100%)] sm:w-[calc(50%)] py-[10px]">
        {category?.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelect(item.name);
              setFilter(item.filter);
              setCurrentPage(1);
              if (item.name !== select) {
                dispatch(resetPost());
              }
            }}
            className={`border-b-[0.5px] ${
              item.name === select
                ? "border-sky-500 text-sky-500"
                : "border-transparent"
            } text-base py-2 w-[150px] sm:w-[100px] rounded-t-md cursor-pointer hover:bg-gray-100 transition-colors duration-300`}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* top filter: week, month, year */}
      {filter === "top" && (
        <div className="flex justify-end mt-[60px] text-center gap-x-4 py-[10px]">
          {topFilters?.map((item) => (
            <div
              className="px-4 py-2"
              onClick={() => setTopFilter(item.filter)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      <Post />

      {/* load more button */}
      <button
        className="px-4 py-2 bg-blue-600 rounded-md text-white mb-[40px]"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Load more
      </button>
    </div>
  );
}

export default NewFeed;
