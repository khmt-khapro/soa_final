import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import messageSlice from "./messageSlice";
import authSlice from "./authSlice";
import tagSlice from "./tagSlice";
import commentSlice from "./commentSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    postStore: postSlice,
    commentStore: commentSlice,
    messageStore: messageSlice,
    tagStore: tagSlice
  },
});
