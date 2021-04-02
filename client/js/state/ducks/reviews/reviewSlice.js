import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  book: null,
  reviews: [],
  nextPage: null,
  error: false,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    loadReview(state) {
      state.loading = true;
      state.error = false;
    },
    readReviews(state, action) {
      state.loading = false;
      state.reviews = action.payload.reviews;
      state.nextPage = action.payload.next;
    },
    paginateReviews(state, action) {
      state.loading = false;
      state.reviews = [...state.reviews, ...action.payload.reviews];
      state.nextPage = action.payload.next;
    },
    deleteReview(state, action) {
      state.loading = false;
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload.id
      );
    },
    errorReview(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  loadReview,
  readReviews,
  paginateReviews,
  errorReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
