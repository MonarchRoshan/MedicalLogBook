import axiosInstance from "../api";
import { getSpecificUserService } from "./userService";

export const getLogbookData = async (data) => {
  try {
    let result = await getSpecificUserService();
  } catch (error) {}
};
