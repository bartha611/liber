import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  book: null,
  reviews: [],
  commentPage: null,
  totalPages: null,
  userReview: null,
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
    createReview(state, action) {
      state.loading = false;
      state.book = action.payload.book;
      state.userReview = action.payload;
    },
    readReviews(state, action) {
      state.loading = false;
      state.book = action.payload.book;
      state.reviews = action.payload?.reviews ?? null;
      state.userReview = action.payload.userReview;
      state.totalPages = action.payload.total_pages;
      state.nextPage = action.payload.next;
    },
    loadComments(state, action) {
      state.loading = false;
      state.reviews = state.reviews.map((review) => {
        review.comments =
          review.id === action.payload.review.id
            ? action.payload.comments
            : null;

        return review;
      });
    },
    updateReview(state, action) {
      state.loading = false;
      state.reviews = state.reviews?.map((review) =>
        review.id === action.payload.id ? action.payload : review
      );
      state.userReview = action.payload;
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
  loadComments,
  updateReview,
  createReview,
  errorReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
