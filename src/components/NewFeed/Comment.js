import React from "react";
import RichText from "../RichText";
import { commentModules } from "../../constants/modules";
// import { createComment } from "../../redux/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/postSlice";

function Comment({idPost, comments = []}) {
  // const dispatch = useDispatch()
  // console.log(comments.length, idPost)

  const handleFunction = (content) => {
    const comment = {
      id: idPost,
      content:{
        id: comments.length,
        content: content,
    }};
    return addComment(comment);
  };

  return (
    <div className="">
      {comments ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-x-[10px] m-[10px]">
            <div >
              <img
                className="w-8 h-8 rounded-full"
                src="/images/dev-icon.webp"
                alt=""
              />
            </div>
            <div className="bg-gray-200 rounded-md flex-1 text-sm">
              <p className="p-[10px] pb-0 font-medium">Name</p>
              <div
                dangerouslySetInnerHTML={{ __html: comment.content }}
                className="post p-[10px]"
              ></div>
            </div>
          </div>
        ))
      ) : (
        <p>Chưa có bình luận nào!</p>
      )}
      <RichText
        customClass=""
        modules={commentModules}
        handleFunction={handleFunction}
      />
    </div>
  );
}

export default Comment;
