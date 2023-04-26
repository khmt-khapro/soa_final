import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { addComment } from "../../redux/postSlice";
import ReactQuill from "react-quill";
import { commentModules } from "../../constants/modules";
import { useDispatch, useSelector } from "react-redux";
import { createPostComment, getPostComment } from "../../redux/commentSlice";

const styleModules = `
.ql-toolbar {
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.ql-editor {
    border-top: 0.5px solid #ccc;
    /* outline: none; */
}`;

function Comment({ postID, userID }) {
  const dispatch = useDispatch();
  const [contentValue, setContentValue] = useState("");
  const [isOption, setIsOption] = useState({ status: false, index: null });
  const commentStore = useSelector((state) => state.commentStore?.comments);

  const handleComment = () => {
    dispatch(createPostComment({ postID, content: contentValue }));
    setContentValue("");
  };

  const handleToggleIsOption = (index) => {
    if (isOption.index !== index) setIsOption({ status: true, index });
    else setIsOption({ status: !isOption.status, index });
  };

  useEffect(() => {
    dispatch(getPostComment(postID));

    // return () => {
    //   dispatch()
    // }
  }, []);

  return (
    <div className="">
      {commentStore.length > 0 ? (
        commentStore.map((comment, index) => (
          <div
            key={comment._id}
            className="m-[10px] flex justify-between items-center"
          >
            <div className="flex gap-x-[10px]">
              <div>
                <img
                  className="w-8 h-8 rounded-full"
                  src={comment.author?.avatar || "/images/dev-icon.webp"}
                  alt=""
                />
              </div>
              <div className=" flex-1 text-sm">
                <div className="bg-gray-200 rounded-md">
                  <p className="p-[10px] pb-0 font-medium">
                    {comment.author?.username}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                    className="post p-[10px]"
                  ></div>
                </div>
                <div className="flex gap-x-2 text-xs">
                  <p className="cursor-pointer font-medium hover:text-sky-700 transition-colors duration-200">Thích</p>
                  <p className="cursor-pointer font-medium hover:text-emerald-700 transition-colors duration-200">Phản hồi</p>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleToggleIsOption(index)}
              className="relative"
            >
              <i className="rounded hover:bg-gray-200 transition-colors duration-200 px-3 text-lg fa-solid fa-ellipsis-vertical"></i>
              {comment.author?._id === userID && isOption.status && isOption.index === index && (
                <div className="absolute right-8 bg-gray-200 rounded w-[100px] p-2">
                  <p className="hover:text-sky-600 transition-colors duration-200 cursor-pointer">
                    Chỉnh sửa
                  </p>
                  <p className="hover:text-sky-300 transition-colors duration-200 cursor-pointer">
                    Xóa
                  </p>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="ml-2">Chưa có bình luận nào!</p>
      )}
      <div className={`relative bg-gray-100`}>
        <ReactQuill
          modules={commentModules}
          placeholder="Viết gì đó đi..."
          className={`editor-input border-gray-300 border-[0.5px]`}
          value={contentValue}
          onChange={setContentValue}
        />
        <style>{styleModules}</style>
        <div className="flex justify-end gap-x-3 p-[10px]">
          <button
            onClick={handleComment}
            className="rounded shadow-md w-[100px] py-2 bg-sky-500 text-white hover:bg-white hover:text-sky-500 transition-colors duration-300"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
