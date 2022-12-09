import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: null, // 'https://medication-track.herokuapp.com/api/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json, text/csv",
  },
});

export default axiosInstance;

// package.json
//  "proxy": "http://127.0.0.1:8000",
