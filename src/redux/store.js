import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";
import messageSlice from "./messageSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    postStore: postSlice,
    commentStore: commentSlice,
    messageStore: messageSlice,
  },
});
