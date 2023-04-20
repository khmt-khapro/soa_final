import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import commentSlice from "./commentSlice";
import messageSlice from "./messageSlice";

export default configureStore({
    reducer: {
        postStore: postSlice,
        commentStore: commentSlice,
        messageStore: messageSlice
    }
})