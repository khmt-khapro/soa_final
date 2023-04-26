import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { likePost, unlikePost } from "./apis/post";

export const updatePostReaction = createAsyncThunk(
  "post/updatePostReaction",
  async ({ postID, liked, userID }, thunkAPI) => {
    try {
      return liked.includes(userID)
        ? await unlikePost(postID, userID)
        : await likePost(postID, userID);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(updatePostReaction.fulfilled, (state, action) => {
        if (action.payload) {
          const post = state.post.find(p => p._id === action.payload.postID)
          action.payload.status === "like" ?
            post.likes = [...post.likes, action.payload.userID] : post.likes = post.likes.filter(p => p !== action.payload.userID)
        }
      })
  }
});

export const { createPost, updatePost, addComment, getPost, resetPost } =
  PostSlice.actions;
export default PostSlice.reducer;
