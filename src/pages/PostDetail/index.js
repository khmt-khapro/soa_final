import React, { useEffect, useState } from "react";
import "../../components/NewFeed/post.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPostConent, getRelatedPosts } from "../../redux/apis/post";
import Comment from "../../components/NewFeed/Comment";
import { getPostComment } from "../../redux/commentSlice";

const PostDetail = () => {
  // post id from url
  const { postID } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isComment, setIsComment] = useState(
    location.state?.isComment || false
  );
  const { _id } = useSelector((state) => state.auth?.user);
  const amountComment = useSelector(
    (state) => state.commentStore?.comments.length
  );

  // get post detail
  useEffect(() => {
    async function fetchPost() {
      // fetch related posts
      const _post = await getPostConent(postID);
      setPost(_post);
    }

    fetchPost();
  }, [postID]);

  // get related posts of author
  useEffect(() => {
    async function fetchRelatedPost() {
      // fetch related posts
      const relatedPosts = await getRelatedPosts(postID);
      setRelatedPosts(relatedPosts);
    }

    fetchRelatedPost();
  }, [postID]);

  useEffect(() => {
    dispatch(getPostComment(postID));
  }, [postID]);

  return (
    post && (
      <div className={`flex justify-center gap-x-5 px-20 py-5 bg-slate-100 ${isComment ? 'h-[160vh]': 'h-[calc(100vh-60px)]'} mt-[60px]`}>
        {/* left side */}
        <div className="basis-[10%]">
          <div className="flex flex-col items-center gap-y-5 mt-[50px]">
            <div className="">
              {post.likes.includes(_id) ? (
                <i className="fa-solid fa-heart text-red-600 text-[30px] hover:cursor-pointer hover:opacity-60"></i>
              ) : (
                <i className="fa-regular fa-heart text-[30px] hover:cursor-pointer hover:opacity-60"></i>
              )}
              <p className="text-center">{post.likes.length}</p>
            </div>
            <div className="">
              <i
                className="fa-regular fa-comment text-[30px] hover:cursor-pointer hover:opacity-60"
                onClick={() => setIsComment(!isComment)}
              ></i>
              <p className="text-center">{amountComment}</p>
            </div>
            <div className="">
              <i className="fa-regular fa-bookmark text-[30px]"></i>
            </div>
            <div className="">
              <i className="fa-light fa-circle-ellipsis text-[30px]"></i>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="basis-[60%]">
          <div className="bg-white h-full rounded-lg shadow-md px-10 py-5 flex flex-col gap-y-5">
            {/* author info */}
            <div
              className={`overflow-y-scroll no-scrollbar ${
                isComment ? "h-[48%]" : "h-full"
              }`}
            >
              <div className="flex justify-start gap-2">
                <img
                  src={post.author?.avatar}
                  alt="avatar"
                  className="w-[50px] h-[50px] rounded-[50%] object-cover"
                />
                <div className="flex flex-col gap-y-1">
                  <span className="text-[18px] font-bold">
                    {post.author?.usernam || "unknown"}
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
                  <span key={tag._id}>#{tag.name}</span>
                ))}
              </div>

              <h2 className="text-[40px] font-bold ">{post.title}</h2>

              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="post p-[10px]"
                ></div>
              </div>
            </div>
            {isComment && (
              <div className="h-[52%] border-t-[1px] border-gray-300">
                <Comment postID={post?._id} userID={_id} />
              </div>
            )}
          </div>
        </div>

        {/* right side */}
        <div className="basis-[30%]">
          <div className="p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-[18px]">Các bài đăng liên quan</h2>

            <div className="flex flex-col gap-y-2 mt-5">
              {relatedPosts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <div className="bg-slate-100 px-4 py-2 rounded-lg">
                    <h2 className="font-medium text-[18px]">{post.title}</h2>
                    <div className="flex gap-x-2">
                      {post.tags.map((tag) => (
                        <span key={tag.name}>#{tag.name}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostDetail;
