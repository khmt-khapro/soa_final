import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { clearMessage, createMessage } from "../../redux/messageSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost, getAllTags } from "../../redux/apis/post";
import { useDispatch, useSelector } from "react-redux";
import { removeTags } from "../../redux/tagSlice";

function RichText({ customClass, path = "", modules, handleFunction }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let existTag = false;

  const tags = useSelector((state) => state.tagStore?.tags);

  const [contentValue, setContentValue] = useState("");
  const [isShowTags, setIsShowTags] = useState(false);
  const [tagValue, setTagValue] = useState([]);

  // show tag when click on Tag
  const handleGetTags = () => {
    setIsShowTags(true);
  };

  // Remove tag through id tag
  const removeTag = (id) => {
    const tagList = tagValue.filter((tag) => tag.tagId !== id);
    setTagValue(tagList);
  };

  const handleChooseTag = (tagId, tagName) => {
    // maximum of tag amount is 5
    if (tagValue.length === 5) {
      setIsShowTags(false);
    } else {
      setTagValue([...tagValue, { tagId, tagName }]);
      setIsShowTags(false);
    }
  };

  useEffect(() => {
    getAllTags(dispatch);

    return () => {
      dispatch(removeTags());
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tiêu đề không thể để trống!"),
    }),
    onSubmit: (values, onSubmitProps) => {
      // values is an object with all the form values
      const tagIds = tagValue.map((tag) => tag.tagId);
      console.log("tagIds: ", tagIds);
      handleFunction({ ...values, content: contentValue, tags: tagIds });

      setContentValue("");
      path && navigate(path);
      // reset form
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    },
  });

  return (
    <div
      className={`relative border-gray-300 border-[0.5px] ${
        pathname === "/" && "bg-gray-100"
      }`}
    >
      <form action="" method="POST" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Tiêu đề..."
          className="w-full text-2xl px-3 py-2 outline-none"
        ></input>
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-opacity-50 px-3">
            {formik.errors.title}
          </p>
        )}

        <div className="relative flex ml-3 mb-3">
          {tagValue.length > 0 && (
            <div className="flex gap-x-2 mr-3">
              {tagValue.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center px-2 gap-x-2 bg-sky-400 text-white rounded-sm"
                >
                  <span className="w-max">#{tag.tagName}</span>
                  <i
                    onClick={() => removeTag(tag.tagId)}
                    className="fa-solid fa-xmark cursor-pointer hover:text-red-400 transition-colors duration-200"
                  ></i>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            id="tags"
            name="tags"
            readOnly
            onClick={handleGetTags}
            placeholder="Thẻ... (tối đa 5 thẻ)"
            className="w-full py-2 outline-none"
            autoComplete="off"
          ></input>

          {isShowTags && (
            <div className="absolute top-10 z-20 px-3 shadow-sm rounded-sm bg-gray-100 w-full">
              {tags?.map((tag) => {
                // Check if tag has selected is hidden
                if (
                  tagValue.find((selectedTag) => selectedTag.tagId === tag._id)
                )
                  existTag = true;
                else existTag = false;
                return (
                  <div
                    key={tag._id}
                    onClick={() => handleChooseTag(tag._id, tag.name)}
                    className={`
                    ${existTag && "hidden "}
                    hover:text-sky-500 transition-colors duration-200 cursor-pointer py-2 "
                  `}
                  >
                    {tag.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* {formik.touched.tags && formik.errors.tags && (
          <p className="text-red-500 text-opacity-50 px-3 mb-2">
            {formik.errors.tags}
          </p>
        )} */}

        <ReactQuill
          modules={modules}
          placeholder="Viết gì đó đi..."
          className={`editor-input ${customClass}`}
          value={contentValue}
          onChange={setContentValue}
        />
        <div className="flex justify-end gap-x-3 p-[10px]">
          <button
            type="submit"
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
              type="reset"
              className="rounded shadow-md w-[100px] py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-colors duration-300"
              onClick={() => setContentValue("")}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RichText;
