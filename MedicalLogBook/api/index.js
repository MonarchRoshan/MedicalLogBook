// Import Axios
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    // You can set other default headers here
  },
});

// Export the Axios instance to use it throughout your application
export default axiosInstance;
