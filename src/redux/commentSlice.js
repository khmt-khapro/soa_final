import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAComment, getComments } from "./apis/comment";

export const createPostComment = createAsyncThunk(
  "comment/createPostComment",
  async ({ postID, content, parent }, thunkAPI) => {
    try {
      await createAComment(postID, content, parent)
      return await getComments(postID)
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostComment = createAsyncThunk(
    "comment/getPostComment",
    async (postID , thunkAPI) => {
      try {
        return await getComments(postID)
      } catch (error) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    // getComments: (state, action) => {
    //   state.comments = [...state.comments, ...action.payload];
    // },
    // updatePost: (state, action) => {
    //   // state.post = [...state.post, action.payload];
    // },
    // addComment: (state, action) => {
    //   const posts = [...state.post];
    //   const post = posts.find((p) => p.id === action.payload.id);
    //   post.comments.push(action.payload.content);
    // },

    // getPost: (state, action) => {
    //   state.post = [...state.post, ...action.payload];
    // },
    // getTop: (state, action) => {
    //   state.top = action.payload;
    // },
    // getLatest: (state, action) => {
    //   state.latest = action.payload;
    // },
    // revelantPost: (state, action) => {
    //   state.post = action.payload;
    // },
    // resetPost: (state) => {
    //   state.post = [];
    // },

  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.comments = [...action.payload]
      })

      .addCase(getPostComment.fulfilled, (state, action) => {
        state.comments = [...action.payload]
      })
  }
});

export const {  } =
  CommentSlice.actions;
export default CommentSlice.reducer;
