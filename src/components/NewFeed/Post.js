import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./post.css";
import Comment from "./Comment";
import moment from "moment";
import { updatePostReaction } from "../../redux/postSlice";
import { useNavigate } from "react-router-dom";

function Post() {
  // const comments = useSelector((state) => state.commentStore.comment);
  const navigate = useNavigate();
  const posts = useSelector((state) => state.postStore?.post);
  const { _id } = useSelector((state) => state.auth?.user);
  
  const dispatch = useDispatch();

  const [indexShow, setIndexShow] = useState([null, false]);

  const handleIndexShow = (index) => {
    const newIndex =
      index === indexShow[0] ? [index, !indexShow[1]] : [index, true];
    setIndexShow(newIndex);
  };

  const handleToggleReactionPost = (postID, liked) => {
    dispatch(updatePostReaction({ postID, liked, userID: _id }));
  }
  
  const hanldeClickPost = (post) => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="mt-[64px]">
      {posts?.map((post, index) => (
        <div key={index} className=" bg-gray-100 rounded shadow my-[20px]">
          <div className="flex items-center gap-x-3 p-[10px] pb-0">
            <img
              className="w-10 h-10 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              src={post?.author?.avatar}
              alt="avatar"
            />
            <div className="text-left">
              <p className="text-sm font-medium hover:text-sky-500 transition-colors duration-200 cursor-pointer">
                {post.author?.username || "unknown"}
              </p>
              <p className="text-[12px] text-gray-400">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>

          <h2
            className="flex items-center px-14 py-2 pb-0 font-bold text-2xl cursor-pointer"
            onClick={() => hanldeClickPost(post)}
          >
            {post.title || ""}
          </h2>

          <div className="flex items-center gap-x-3 px-14 py-2">
            {post.tags?.map((tag, index) => (
              <span key={tag.name}>#{tag.name}</span>
            ))}
          </div>
          {/* <style>{previewStyle}</style> */}
          {/* <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="post p-[10px]"
          ></div> */}

          <div className="flex justify-between items-center mt-[20px] border-black border-opacity-10 border-t-[1px]">
            <div className="flex items-center gap-x-4">
              <div
                onClick={() => handleToggleReactionPost(post._id, post.likes)}
                className={`flex justify-center items-center gap-x-3 px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative ${post.likes.includes(_id) && 'text-sky-500'}`}
              >
                <p>{post.likes.length}</p>
                <div className="">Lượt thích</div>
              </div>
              <div
                onClick={() => handleIndexShow(index)}
                className="flex justify-center items-center gap-x-3 px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-comment"></i>
                <p>Thêm bình luận</p>
              </div>
            </div>

            <div className="flex items-center">
              <span className="mr-2">{post?.time_to_read || 5} phút đọc</span>
              <i className="px-5 py-3 cursor-pointer fa-solid fa-bookmark hover:bg-gray-200 transition-colors duration-200 rounded-br"></i>
            </div>
          </div>
          {index === indexShow[0] && indexShow[1] && (
            <Comment postID={post?._id} userID={_id} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
