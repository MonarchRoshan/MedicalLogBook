import axiosInstance from "../api";
// function array mapping
export const getAllUsersDataService = async () => {
  try {
    let response = await axiosInstance.get("/users");

    return response.data;                                        
  } catch (error) {
    console.log(error);
    return error;
  }
};
// filter on specific userID
export const getSpecificUserService = async (uid) => {
  try {
    let response = await axiosInstance.get(`/users/${uid}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// Update on selected specific user

// array union function 
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
    return error;
  }
};
