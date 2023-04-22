import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import messageSlice from "./messageSlice";
import authSlice from "./authSlice";
import tagSlice from "./tagSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    postStore: postSlice,
    messageStore: messageSlice,
    tagStore: tagSlice
  },
});
