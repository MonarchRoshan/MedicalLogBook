
import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  // baseURL: "https://us-central1-medicallogbook-b8d1a.cloudfunctions.net/v1",
  baseURL: "http://18.135.45.161:5000/v1", // API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    //  default headers 
  },
});


export default axiosInstance;
