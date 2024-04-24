import { createSlice } from "@reduxjs/toolkit";
import { getDataFromAsyncStorage, storeDataInAsyncStorage } from "../../utils";
import { userSchema } from "../../schema/userSchema";
//  the initial state using that type
const initialState = {
  user: {
    ...userSchema,
  },
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
    setLogbookData: (state, action) => {
      state.user.userDetails[action.payload.keyName] = [
        ...state.user.userDetails[action.payload.keyName],
        action.payload.data,
      ];

      storeDataInAsyncStorage("user", state.user);
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, setUserLoading, clearUser, setLogbookData } =
  userSlice.actions;

export default userSlice.reducer;
