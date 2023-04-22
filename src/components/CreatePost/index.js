import React, { useState } from "react";
import { createPost } from "../../redux/apis/post";
import { Link } from "react-router-dom";
import RichText from "../RichText";
import { postModules } from "../../constants/modules";
import { useSelector } from "react-redux";

// const CustomFormat = Quill.import('blots/block')
// CustomFormat.className = 'align-center'
// Quill.register(CustomFormat, true)

function CreatePost() {
  
  // const posts = useSelector(state => state.postStore?.post);
  // const handleCreatePost = (value) => {
  //   const post = {id: posts.length,content: value, emojis: {'thumbs-up': 0, 'heart': 0, 'face-surprise': 0, 'face-smile': 0, 'face-sad-cry': 0, 'face-angry': 0}, comments: []}
    
  //   return createPost(post);
  // }

  return (
    <div className="w-[75%] mt-[70px] mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="text-2xl font-bold text-emerald-700">Tạo bài đăng</p>
        <Link
          to="/"
          className="flex justify-center items-center border-green-500 text-green-500 border-[0.5px] gap-x-3 text-base font-medium w-[100px] py-2 rounded-md hover:bg-green-500 hover:text-white transition-alls duration-200"
        >
          <i className="fa-solid fa-arrow-right"></i>
          <span>Trở về</span>
        </Link>
      </div>
      <RichText customClass="" path="/" modules={postModules} handleFunction={createPost} message="Bài đăng đã được tạo!" />
      {/* <div dangerouslySetInnerHTML={{__html:value}}></div> */}
    </div>
  );
}
export default CreatePost;
