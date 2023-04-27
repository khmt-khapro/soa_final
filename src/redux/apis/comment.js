import axiosInstance from "./baseRequest";

// create comment api
export const createAComment = async (postID, content, parent = null) => {
  const res = await axiosInstance.post(`posts/${postID}/comments`, {
    content,
    parent,
  });
  console.log(res.data.data.newComment);
  return res.data.data.newComment;
};

// get all comments
export const getComments = async (postID) => {
  const res = await axiosInstance.get(`posts/${postID}/comments`);
  return res.data.data.comments;
};

// like comment
export const likeComment = async (postID, userID, commentID) => {
  const res = await axiosInstance.post(`posts/${postID}/comments/${commentID}/like`);
  return res.data.status === "success"
    ? { commentID, userID, status: "like" }
    : {};
};

// unlike comment
export const unlikeComment = async (postID, userID, commentID) => {
  const res = await axiosInstance.post(`posts/${postID}/comments/${commentID}/unlike`);
  return res.data.status === "success"
    ? { commentID, userID, status: "unlike" }
    : {};
};

// get reply comment
export const getCommentsReply = async (postID, commentID) => {
  const res = await axiosInstance.get(`posts/${postID}/comments/${commentID}/replies`)
  return res.data.data;
}