import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const baseRequest = axios.create({ baseURL: BASE_URL });
// const token = localStorage.getItem("accessToken")
//   ? JSON.parse(localStorage.getItem("user")).token
//   : null;

// baseRequest.interceptors.request.use((req) => {
//   if (token) {
//     req.headers.authorization = `Bearer ${token}`;
//   }
//   return req;
// });

export default baseRequest;
