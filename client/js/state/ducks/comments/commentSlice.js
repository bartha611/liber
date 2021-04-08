import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  review: null,
  comments: [],
  totalComments: null,
  error: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    loadComment(state) {
      state.loading = true;
      state.error = false;
    },
    readComment(state, action) {
      state.loading = false;
      state.review = action.payload.review;
      state.comments = action.payload.comments;
      state.totalComments = action.payload.count;
    },
    errorComment(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loadComment, readComment, errorComment } = commentSlice.actions;

export default commentSlice.reducer;
