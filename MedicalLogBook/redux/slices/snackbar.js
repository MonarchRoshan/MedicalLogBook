// slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.isVisible = true;
      state.message = action.payload.message;
    },
    hideSnackbar(state) {
      state.isVisible = false;
      state.message = "";
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
