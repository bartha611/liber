import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadAuth(state) {
      state.loading = true;
      state.error = false;
    },
    loginAuth(state, action) {
      state.loading = false;
      state.user = action.payload.user;
    },
    logoutAuth(state) {
      state.loading = false;
      state.user = null;
    },
    errorAuth(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loadAuth, loginAuth, logoutAuth, errorAuth } = authSlice.actions;

export default authSlice.reducer;
