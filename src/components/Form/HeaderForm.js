import React from "react";
import { Link } from "react-router-dom";

function HeaderForm({ image, heading, paragraph = "", linkUrl, linkName }) {
  return (
    <div>
      <div className="flex justify-center">
        {image}
      </div>
      <div className="text-center my-4 text-3xl font-extrabold text-neutral-500">
        {heading}
      </div>
      <p className="mt-2 text-gray-400 text-center">
        {paragraph + " "}
        <Link
          to={linkUrl}
          className="text-cyan-500 font-bold hover:opacity-80 transition-opacity duration-100"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}

export default HeaderForm;
