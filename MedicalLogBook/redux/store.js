import { configureStore } from "@reduxjs/toolkit";
// ...
import user from "./slices/user";
import snackbar from "./slices/snackbar";
import theme from "./slices/theme";
export const store = configureStore({
  reducer: {
    user,
    snackbar,
    theme,
  },
});
