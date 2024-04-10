import axiosInstance from "../api";

export const signUpWithFirebase = async (email, password) => {
  try {
    let response = await axiosInstance.post("/signup", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    // return { errorCode, errorMessage };
  }
};

export const signInWithFirebase = async (email, password) => {
  try {
    let response = await axiosInstance.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
};
