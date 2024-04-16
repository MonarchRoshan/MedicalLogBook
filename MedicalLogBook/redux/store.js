import { configureStore } from "@reduxjs/toolkit";
// ...
import user from "./slices/user";
import snackbar from "./slices/snackbar";
export const store = configureStore({
  reducer: {
    user,
    snackbar,
  },
});
