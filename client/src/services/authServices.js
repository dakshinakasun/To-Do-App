import axios from "axios";

// Base URL for the server API
const SERVER_URL = "http://localhost:5000/api";

//Registers a new user by sending a POST request to the server.
const registerUser = (data) => {
  return axios.post(SERVER_URL + "/register", data);
};

//Logs in an existing user by sending a POST request to the server.
const loginUser = (data) => {
  return axios.post(SERVER_URL + "/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
