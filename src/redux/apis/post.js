import { getPost } from "../postSlice";
import { getTags } from "../tagSlice";
import axiosInstance from "./baseRequest";

// const BASE_URL = "http://localhost:5002/api";
// const axiosInstance = axios.create({ baseURL: BASE_URL });

// get newsfeed api
export const getNewsFeed = async (dispatch, query) => {
  let url = `/posts/${query.filter}?page=${query.page}`;
  if (query.topFilter) {
    url = `${url}&filter=${query.topFilter}`;
  }
  const { data } = await axiosInstance.get(url);
  dispatch(getPost(data.data.posts));
};

// create post api
export const createPost = async (postData) => {
  const response = await axiosInstance.post("/posts", postData);
  console.log(response);
  return response.data.post;
};

// get related posts api
export const getRelatedPosts = async (postID) => {
  const { data } = await axiosInstance.get(`/posts/${postID}/related`);
  return data.data.relatedPosts;
};

// get post api
export const getPostConent = async (postID) => {
  const { data } = await axiosInstance.get(`/posts/${postID}/detail`);
  return data.data.post;
};

// del post api
export const deletePost = async (postID) => {
  const response = await axiosInstance.delete(`/posts/${postID}`);
  return response.data;
};

// edit post api
export const editPost = async (postID, desc) => {
  const response = await axiosInstance.put(`/posts/${postID}`, {
    desc,
  });
  return response.data;
};

// get tag api
export const getAllTags = async (dispatch) => {
  const res = await axiosInstance.get(`/posts/tags`);
  dispatch(getTags(res.data.data.tags));
};

//follow tag api
export const followTag = async (tagID, userID) => {
  const res = await axiosInstance.post(`posts/${tagID}/follow`, { userID });
  console.log("api follow called");
  return res.data.tagfollowed;
};

//unfollow tag api
export const unfollowTag = async (tagId, userID) => {
  const res = await axiosInstance.post(`posts/${tagId}/unfollow`, { userID });
  console.log("api unfollow called");
  return res.data.tagfollowed;
};

export const likePost = async (postID, userID) => {
  const res = await axiosInstance.post(`posts/${postID}/like`);
  return res.data.status === "success"
    ? { postID, userID, status: "like" }
    : {};
};

export const unlikePost = async (postID, userID) => {
  const res = await axiosInstance.post(`posts/${postID}/unlike`);
  return res.data.status === "success"
    ? { postID, userID, status: "unlike" }
    : {};
};
