import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    top: [],
    latest: [],
    revelant: [],
    bookmarks: [],
  },
  reducers: {
    createPost: (state, action) => {
      console.log(state.post);
      state.post = [...state.post, action.payload];
    },
    updatePost: (state, action) => {
      // state.post = [...state.post, action.payload];
    },
    addComment: (state, action) => {
      const posts = [...state.post];
      const post = posts.find((p) => p.id === action.payload.id);
      post.comments.push(action.payload.content);
    },

    getPost: (state, action) => {
      state.post = [...state.post, ...action.payload];
    },
    getTop: (state, action) => {
      state.top = action.payload;
    },
    getLatest: (state, action) => {
      state.latest = action.payload;
    },
    revelantPost: (state, action) => {
      state.post = action.payload;
    },
    resetPost: (state) => {
      state.post = [];
    },
  },
});

export const { createPost, updatePost, addComment, getPost, resetPost } =
  PostSlice.actions;
export default PostSlice.reducer;
