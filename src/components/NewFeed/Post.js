import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./post.css";
import Comment from "./Comment";

function Post() {
  // const comments = useSelector((state) => state.commentStore.comment);
  const posts = useSelector((state) => state.postStore?.post);
  const [displayReaction, setDisplayReaction] = useState(
    Array(posts?.length).fill(false)
  );

  const [indexShow, setIndexShow] = useState([null, false]);

  const hoverToggleReaction = (index, state) => {
    const newState = [...displayReaction];
    newState[index] = state;
    setDisplayReaction(newState);
  };

  const handleIndexShow = (index) => {
    const newIndex =
      index === indexShow[0] ? [index, !indexShow[1]] : [index, true];
    setIndexShow(newIndex);
  };

  return (
    <div className="mt-[63px]">
      {posts?.map((post, index) => (
        <div key={index} className=" bg-gray-100 rounded shadow my-[10px]">
          <div className="flex items-center gap-x-3 p-[10px] pb-0">
            <img
              className="w-10 h-10 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              src="./images/google-icon.png"
              alt="avatar"
            />
            <div className="text-left">
              <p className="text-sm font-medium hover:text-sky-500 transition-colors duration-200 cursor-pointer">
                Name
              </p>
              <p className="text-[12px] text-gray-400">Date</p>
            </div>
          </div>
          {/* <style>{previewStyle}</style> */}
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="post p-[10px]"
          ></div>

          <div className="flex justify-between items-center mt-[40px] border-black border-opacity-10 border-t-[1px]">
            <div className="flex items-center justify-start gap-x-5">
              <div
                onMouseOver={() => hoverToggleReaction(index, true)}
                onMouseOut={() => hoverToggleReaction(index, false)}
                className="flex justify-center gap-x-3 rounded-bl px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
              >
                <p>10000</p>
                <div className="">Lượt thích</div>

                {displayReaction[index] && (
                  <div className="absolute flex justify-between left-0 -top-[48px] gap-x-3 rounded-xl p-2 bg-gray-200 bg-opacity-70">
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-thumbs-up cursor-pointer text-sky-500 hover:scale-150 transition-all duration-300"
                    ></i>
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-heart cursor-pointer text-pink-700 hover:scale-150 transition-all duration-300"
                    ></i>
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-face-surprise cursor-pointer text-emerald-400 hover:scale-150 transition-all duration-300"
                    ></i>
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-face-smile cursor-pointer text-green-300 hover:scale-150 transition-all duration-300"
                    ></i>
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-face-sad-cry cursor-pointer text-blue-500 hover:scale-150 transition-all duration-300"
                    ></i>
                    <i
                      onClick={() => hoverToggleReaction(index, false)}
                      className="text-2xl fa-solid fa-face-angry cursor-pointer text-red-600 hover:scale-150 transition-all duration-300"
                    ></i>
                  </div>
                )}
              </div>
              <div
                onClick={() => handleIndexShow(index)}
                className="flex justify-center items-center gap-x-3 px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-comment"></i>
                <p>{post.comments?.length || 0} Bình luận</p>
              </div>
            </div>
            <div>
              <i className="px-5 py-3 cursor-pointer fa-solid fa-bookmark hover:bg-gray-200 transition-colors duration-200 rounded-br"></i>
            </div>
          </div>
          {index === indexShow[0] && indexShow[1] && (
            <Comment idPost={post?.id} comments={post?.comments} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
