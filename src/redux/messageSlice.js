import { createSlice } from "@reduxjs/toolkit";

const MessageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
  },
  reducers: {
    createMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { createMessage, clearMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
