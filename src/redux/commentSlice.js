import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAComment,
  getComments,
  getCommentsReply,
  likeComment,
  unlikeComment,
} from "./apis/comment";

export const createPostComment = createAsyncThunk(
  "comment/createPostComment",
  async ({ postID, content, parent }, thunkAPI) => {
    try {
      await createAComment(postID, content, parent);
      return await getComments(postID);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostComment = createAsyncThunk(
  "comment/getPostComment",
  async (postID, thunkAPI) => {
    try {
      return await getComments(postID);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCommentReaction = createAsyncThunk(
  "comment/updateReactionComment",
  async ({ postID, userID, commentID, likes }, thunkAPI) => {
    try {
      return likes.includes(userID)
        ? await unlikeComment(postID, userID, commentID)
        : await likeComment(postID, userID, commentID);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getReplyComments = createAsyncThunk(
  "comment/getReplyComments",
  async ({ postID, commentID }, thunkAPI) => {
    try {
      return await getCommentsReply(postID, commentID);
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
    replyComments: [],
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
        state.comments = [...action.payload];
      })

      .addCase(getPostComment.fulfilled, (state, action) => {
        state.comments = [...action.payload];
      })
      .addCase(updateCommentReaction.fulfilled, (state, action) => {
        if (action.payload) {
          const updateComment = state.comments.find(
            (comment) => comment._id === action.payload.commentID
          );

          if (action.payload.status === "like") {
            updateComment.like_count += 1;
            updateComment.likes = [
              ...updateComment.likes,
              action.payload.userID,
            ];
          } else {
            updateComment.like_count -= 1;
            updateComment.likes = updateComment.likes.filter(
              (like) => like !== action.payload.userID
            );
          }
        }
      })
      .addCase(getReplyComments.fulfilled, (state, action) => {
        state.replyComments = action.payload;
      })
  },
});

export const {} = CommentSlice.actions;
export default CommentSlice.reducer;
