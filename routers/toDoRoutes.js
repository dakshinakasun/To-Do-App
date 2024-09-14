const express = require("express");
const authenticateToken = require("../middleware/authJwt");
const {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/toDoController");
const router = express.Router();

// Define a POST route for creating a new ToDo item
router.post("/create-to-do", authenticateToken, createToDo);
// Define a GET route for retrieving all ToDo items for a specific user
router.get("/get-all-to-do/:userId", authenticateToken, getAllToDo);
// Define a DELETE route for deleting a specific ToDo item by its ID
router.delete("/delete-to-do/:id", authenticateToken, deleteToDo);
// Define a PATCH route for updating a specific ToDo item by its ID
router.patch("/update-to-do/:id", authenticateToken, updateToDo);

module.exports = router;
