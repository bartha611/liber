import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  books: [],
  error: false,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    loadBook(state) {
      state.loading = true;
    },
    readBooks(state, action) {
      state.loading = false;
      state.books = action.payload.books;
    },
    errorBooks(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default bookSlice.reducer;

export const { loadBook, readBooks, errorBooks } = bookSlice.actions;
