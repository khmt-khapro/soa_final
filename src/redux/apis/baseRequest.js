import axios from "axios";

const BASE_URL = "http://localhost:5002/api";
const baseRequest = axios.create({ baseURL: BASE_URL });
const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).accessToken
  : null;

baseRequest.interceptors.request.use((req) => {
    console.log(token)
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default baseRequest;