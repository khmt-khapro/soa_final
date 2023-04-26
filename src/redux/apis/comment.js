import axiosInstance from "./baseRequest";

export const createAComment = async (postID, content, parent = null) => {
  const res = await axiosInstance.post(`posts/${postID}/comments`, {
    content,
    parent,
  });
  console.log(res.data.data.newComment);
  return res.data.data.newComment;
};

export const getComments = async (postID) => {
    const res = await axiosInstance.get(`posts/${postID}/comments`);
    console.log("get", res.data.data.comments)
    return res.data.data.comments;
  };
