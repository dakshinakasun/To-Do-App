import axios from "axios";
import { getUserDetails } from "../util/GetUser";

// Base URL for the To-Do API endpoints
const SERVER_URL = "http://localhost:5000/api/todo";

// Retrieves the authentication headers with the user token.
const authHeaders = () => {
  // Get the user's token from local storage
  let userToken = getUserDetails()?.token;
  return { headers: { Authorization: userToken } };
};

//Creates a new To-Do item by sending a POST request to the server.
const createToDo = (data) => {
  return axios.post(SERVER_URL + "/create-to-do", data, authHeaders());
};

//Retrieves all To-Do items for a specific user by sending a GET request to the server.
const getAllToDo = (userId) => {
  return axios.get(SERVER_URL + "/get-all-to-do/" + userId, authHeaders());
};

//Deletes a specific To-Do item by sending a DELETE request to the server.
const deleteToDo = (id) => {
  return axios.delete(SERVER_URL + "/delete-to-do/" + id, authHeaders());
};

//Updates a specific To-Do item by sending a PATCH request to the server.
const updateToDo = (id, data) => {
  return axios.patch(SERVER_URL + "/update-to-do/" + id, data, authHeaders());
};

const ToDoServices = {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;
