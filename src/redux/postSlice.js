import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    draftPost: [],
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
      const post = posts.find(p => p.id === action.payload.id);
      post.comments.push(action.payload.content)
    }

    // get: (state, action) => {
    //   state.usedTable = [...state.usedTable, action.payload];
    //   localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    // },
    // removedOneUsedTable: (state, action) => {
    //   state.usedTable = state.usedTable.filter(
    //     (ut) => action.payload !== ut.cusId
    //   );
    //   console.log(state.usedTable)
    //   localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    // },
    // orderedUsedTable: (state, action) => {
    //   const update = state.usedTable.find(ut => ut.cusId === action.payload);
    //   update.ordered = true;
    //   const newUsedTable = state.usedTable.filter(ut => ut.cusId !== action.payload);
    //   state.usedTable = [...newUsedTable, update];
    //   localStorage.setItem("usedTable", JSON.stringify(state.usedTable));
    // }
  },
});

export const { createPost, updatePost, addComment } = PostSlice.actions;
export default PostSlice.reducer;
