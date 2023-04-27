import React, { useEffect, useState } from "react";
import Search from "../Search";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { folowTag, getAllTags, unfolowTag } from "../../redux/apis/post";
import { removeTags } from "../../redux/tagSlice";
import { updateFollowTags } from "../../redux/authSlice";

function Tag() {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.tagStore?.tags);
  const {_id, following_tags} = useSelector((state) => state.auth?.user);

  const handleToggleFollowTag = (tagId) => {
    console.log("handle called");
    dispatch(updateFollowTags({tagId, userId: _id, following_tags}))
  };

  useEffect(() => {
    getAllTags(dispatch);

    return () => {
      dispatch(removeTags());
    };
  }, []);

  return (
    <div className={`mx-auto w-[calc(100%-20px)] sm:w-[calc(50%-20px)]`}>
      <div className="flex flex-col gap-y-[10px] md:flex-row items-center justify-between mb-[10px]">
        <p className="text-2xl text-center md:text-left font-medium text-emerald-700">
          Thẻ hàng đầu
        </p>
        <Search
          placeHolder="Nhập thẻ cần tìm!"
          customClass="w-full md:w-[200px]"
        />
      </div>
      <Card
        allTags={allTags}
        handleToggleFollowTag={handleToggleFollowTag}
        tagsFollow={following_tags}
      />
    </div>
  );
}

export default Tag;
