import React, { useEffect } from "react";
import "../../components/NewFeed/post.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const PostDetail = () => {
  // post id from url
  const { postID } = useParams();
  const post = useSelector((state) => {
    return state?.postStore?.post.find((post) => post._id === postID);
  });

  // get related posts of author
  useEffect(() => {}, []);

  return (
    <div className="flex justify-center gap-x-5 px-20 py-5 bg-slate-100 h-screen">
      {/* left side */}
      <div className="basis-[10%]">
        <div className="flex flex-col items-center gap-y-5 mt-[50px]">
          <div className="">
            <i class="fa-regular fa-heart text-[30px]"></i>
          </div>
          <div className="">
            <i class="fa-regular fa-comment text-[30px]"></i>
          </div>
          <div className="">
            <i class="fa-regular fa-bookmark text-[30px]"></i>
          </div>
          <div className="">
            <i class="fa-light fa-circle-ellipsis text-[30px]"></i>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="basis-[60%]">
        <div className="bg-white h-full rounded-lg shadow-md px-10 py-5 flex flex-col gap-y-5 flex-wrap overflow-y-scroll no-scrollbar">
          {/* author info */}
          <div className="flex justify-start gap-2">
            <img
              src={post.author.avatar}
              alt="avatar"
              className="w-[50px] h-[50px] rounded-[50%] object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <span className="text-[18px] font-bold">
                {post.author.username}
              </span>
              <span className="text-sm">
                Ngày đăng {moment(post.createdAt).format("DD/MM")}
              </span>
            </div>

            <div className="ml-auto">
              <button className="px-6 py-2 rounded-lg bg-blue-400 text-white mx-auto">
                Theo dõi
              </button>
            </div>
          </div>

          <div className="flex justify-start gap-x-4">
            {post.tags.map((tag) => (
              <span>#{tag.name}</span>
            ))}
          </div>

          <h2 className="text-[40px] font-bold ">{post.title}</h2>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="post p-[10px]"
          ></div>
        </div>
      </div>

      {/* right side */}
      <div className="basis-[30%]">
        <div className="p-5 bg-white rounded-lg shadow-md">
          <h2 className="text-[18px]">
            Các bài đăng khác của {post.author.username}
          </h2>

          <div className="flex flex-col">
            <h2>post1</h2>
            <h2>post1</h2>
            <h2>post1</h2>
            <h2>post1</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
