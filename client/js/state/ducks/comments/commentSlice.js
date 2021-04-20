import { createSlice } from "@reduxjs/toolkit";
import { updateReview } from "../reviews/reviewSlice";

const initialState = {
  loading: false,
  review: null,
  comments: [],
  totalComments: null,
  totalPages: null,
  currentPage: null,
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
      state.totalPages = action.payload.total_pages;
      state.currentPage = action.payload.page;
    },
    createComment(state, action) {
      state.loading = false;
      state.totalComments += 1;
      state.comments =
        state.totalPages === state.currentPage
          ? [...state.comments, action.payload]
          : state.comments;
    },
    errorComment(state) {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    [updateReview]: (state, action) => {
      state.review =
        state.review?.id === action.payload.id ? action.payload : state.review;
    },
  },
});

export const {
  loadComment,
  readComment,
  createComment,
  errorComment,
} = commentSlice.actions;

export default commentSlice.reducer;
