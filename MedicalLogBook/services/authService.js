import axiosInstance from "../api";
//functions > fire store > user collections > auth data(Curd)
// firebase auth 
export const signUpWithFirebase = async (email, password) => {
  try {
    let response = await axiosInstance.post("/signup", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
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
    console.log(error);
    return error;
  }
};
