import axiosInstance from "./baseRequest";

// get newsfeed api
export const getNewsFeed = async () => {
  const { data } = await axiosInstance.post(`/posts/relevant`);
  return data;
};

// create post api
export const createPost = async (postData) => {
  const response = await axiosInstance.post("/post", postData);
  return response.data.post;
};

// del post api
export const deletePost = async (postID) => {
  const response = await axiosInstance.delete(`/post/${postID}`);
  return response.data;
};

// edit post api
export const editPost = async (postID, desc) => {
  const response = await axiosInstance.put(`/post/${postID}`, {
    desc,
  });
  return response.data;
};
