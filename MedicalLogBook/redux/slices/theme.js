// features/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
