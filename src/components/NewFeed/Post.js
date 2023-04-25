import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./post.css";
import Comment from "./Comment";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Post() {
  // const comments = useSelector((state) => state.commentStore.comment);
  const navigate = useNavigate();
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

  const hanldeClickPost = (post) => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="mt-[64px]">
      {posts?.map((post, index) => (
        <div
          key={index}
          className=" bg-gray-100 rounded shadow my-[20px]"
          onClick={() => hanldeClickPost(post)}
        >
          <div className="flex items-center gap-x-3 p-[10px] pb-0">
            <img
              className="w-10 h-10 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              src={post?.author?.avatar}
              alt="avatar"
            />
            <div className="text-left">
              <p className="text-sm font-medium hover:text-sky-500 transition-colors duration-200 cursor-pointer">
                {post.author.username}
              </p>
              <p className="text-[12px] text-gray-400">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <h2 className="flex items-center px-14 py-2 pb-0 font-bold text-2xl">
            {post.title || ""}
          </h2>

          <div className="flex items-center gap-x-3 px-14 py-2">
            {post.tags?.map((tag, index) => (
              <span>#{tag.name}</span>
            ))}
          </div>
          {/* <style>{previewStyle}</style> */}
          {/* <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="post p-[10px]"
          ></div> */}

          <div className="flex justify-between items-center mt-[20px] border-black border-opacity-10 border-t-[1px]">
            <div className="flex items-center justify-start gap-x-5">
              <div
                onMouseOver={() => hoverToggleReaction(index, true)}
                onMouseOut={() => hoverToggleReaction(index, false)}
                className="flex justify-center gap-x-3 rounded-bl px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative"
              >
                <p>{post.likes.length}</p>
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
                <p>Thêm bình luận</p>
              </div>
            </div>

            <div className="ml-[40%]">
              <span>{post?.time_to_read || 5} phút đọc</span>
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
