import axiosInstance from "../api";

export const getAllUsersDataService = async () => {
  try {
    let response = await axiosInstance.get("/users");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificUserService = async (uid) => {
  try {
    let response = await axiosInstance.get(`/users/${uid}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateSpecificDataService = async (uid, keyName, data) => {
  try {
    let response = await axiosInstance.patch(
      `/users/${uid}`,
      {
        keyName,
        data,
      },
      {
        params: {
          uid,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
