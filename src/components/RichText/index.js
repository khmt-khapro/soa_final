import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPost } from "../../redux/postSlice";
import "./style.css";
import { createMessage } from "../../redux/messageSlice";

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

function RichText({ customClass, path = "", modules, handleFunction, message }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");

  const handleCreate = (value) => {
    dispatch(createMessage({
      type: "success",
      message: message,
    }))
    setValue("");
    dispatch(handleFunction(value))
    path && navigate(path);
  };
  return (
    <div className={`relative ${pathname === "/" && "bg-gray-100"}`}>
      <ReactQuill
        modules={modules}
        placeholder="Viết gì đó đi..."
        className={`editor-input ${customClass}`}
        value={value}
        onChange={setValue}
      />
      {pathname === "/" && <style>{styleModules}</style>}
      <div className="flex justify-end gap-x-3 p-[10px]">
        <button
          onClick={() => handleCreate(value)}
          className="rounded shadow-md w-[100px] py-2 bg-sky-500 text-white hover:bg-white hover:text-sky-500 transition-colors duration-300"
        >
          {pathname !== "/" ? (
            "Đăng bài"
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
        {pathname !== "/" && (
          <button
            className="rounded shadow-md w-[100px] py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors duration-300"
            onClick={() => setValue("")}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default RichText;
