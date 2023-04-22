import { createSlice } from "@reduxjs/toolkit";

const TagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
  },
  reducers: {
    getTags: (state, action) => {
      state.tags = action.payload;
    },
    removeTags: (state, action) => {
      state.tags = [];
    },
  },
});

export const { getTags, removeTags } = TagSlice.actions;
export default TagSlice.reducer;
