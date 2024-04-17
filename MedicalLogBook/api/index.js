// Import Axios
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: "https://us-central1-medicallogbook-b8d1a.cloudfunctions.net/v1", // Your API base URL
  baseURL: "http://18.135.45.161:5000/v1", // Your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

// Export the Axios instance to use it throughout your application
export default axiosInstance;
