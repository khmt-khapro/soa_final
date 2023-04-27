import React from "react";

function Card({ allTags, handleToggleFollowTag, tagsFollow = [] }) {
  return (
    <div className="flex gap-y-3 flex-wrap justify-between">
      {allTags?.map((tag) => (
        <div
          key={tag._id}
          className="basis-[100%] lg:basis-[49%] bg-gray-200 shadow-sm rounded-md p-4 flex flex-col h-[250px]"
        >
          <div className="flex-1 flex flex-col gap-y-4">
            <p className="font-bold">#{tag.name}</p>
            <p>{tag.description}</p>
            <p>
              <span className="font-bold">{tag.count_post}</span> posts published
            </p>
          </div>
          {!tagsFollow.includes(tag._id) ? (
            <button
              className="py-2 rounded-md text-white bg-emerald-500 hover:opacity-80 transition-opacity duration-300"
              onClick={() => handleToggleFollowTag(tag._id)}
            >
              Theo dõi
            </button>
          ) : (
            <button
              className="py-2 rounded-md text-white bg-gray-500 hover:opacity-80 transition-opacity duration-300"
              onClick={() => handleToggleFollowTag(tag._id)}
            >
              Bỏ theo dõi
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Card;
