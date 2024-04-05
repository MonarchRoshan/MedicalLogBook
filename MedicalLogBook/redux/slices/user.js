import { createSlice } from "@reduxjs/toolkit";
import { getDataFromAsyncStorage, storeDataInAsyncStorage } from "../../utils";

// Define the initial state using that type
const initialState = {
  user: null,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      storeDataInAsyncStorage("user", action.payload);
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, setUserLoading, clearUser } = userSlice.actions;

export default userSlice.reducer;
