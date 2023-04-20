import { createSlice } from "@reduxjs/toolkit";

const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [
      //   {
      //     rootComment: {
      //       replyComment: [],
      //     },
      //   },
    ],
  },
  reducers: {
    createComment: (state, action) => {
      state.comment = [...state.comment, action.payload];
    },
    editComment: (state, action) => {
      //   const item = state.comment.filter((item) => item.id === id);
      //   // const otherItems = comment.filter(item => item.id !== id)
      //   //   const newComment = [...item]
      //   item.content = content;
      //   console.log(state.comment);
      //   console.log("edit:", item.content);
      //   state.comment = [...state.comment];
    },
    getAllComments: (state, action) => {
      state.post = action.payload;
    },

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

export const { createComment, editComment, getAllComments } =
  CommentSlice.actions;
export default CommentSlice.reducer;
