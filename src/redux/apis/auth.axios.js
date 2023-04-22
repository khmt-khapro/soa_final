import axios from "axios";

const BASE_URL = "http://localhost:5001/api";
const baseRequest = axios.create({ baseURL: BASE_URL });

export const signupRequest = async (data) => {
  const response = await baseRequest.post("/account/signup", data);

  return response.data.message;
};

export const signinRequest = async (data) => {
  const response = await baseRequest.post("/account/signin", data);
  console.log(
    "🚀 ~ file: auth.axios.js:5 ~ signupRequest ~ response:",
    response
  );
  
  return response.data;
};

export const activateAccountRequest = async (token) => {
  const response = await baseRequest.post("/account/activate", { token });

  return response.data.message;
};

export const forgotPasswordRequest = async (email) => {
  const response = await baseRequest.post("/account/forgot-password", {
    email,
  });

  return response.data.message;
};

export const createNewPasswordRequest = async (data) => {
  const response = await baseRequest.post("/account/create-new-password", data);

  return response.data.message;
};
