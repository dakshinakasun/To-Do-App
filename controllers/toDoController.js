const ToDo = require("../models/ToDoList");

// Function to create a new To-Do item
exports.createToDo = async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;
    // Create a new ToDo instance with the provided data
    const todo = new ToDo(data);
    // Save the new ToDo item to the database
    const result = await todo.save();
    console.log(result);
    res.status(201).send({ message: "Created New Task !" });
  } catch (err) {
    console.log(err);
    res.status(err);
  }
};

// Function to retrieve all To-Do items for a specific user
exports.getAllToDo = async (req, res) => {
  // Extract userId from request parameters
  let { userId } = req.params;
  try {
    // Find all ToDo items created by the specified user
    const result = await ToDo.find({ createdBy: userId });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// Function to update a specific To-Do item
exports.updateToDo = async (req, res) => {
  try {
    // Extract ToDo item ID from request parameters
    const { id } = req.params;
    const data = req.body;
    // Find the ToDo item by ID and update it with the provided data
    const result = await ToDo.findByIdAndUpdate(
      id,
      // Use $set to update only specified fields
      { $set: data },
      // Return the updated document
      { returnOriginal: false }
    );
    console.log(result);
    res.send({ message: "ToDo list Updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

// Function to delete a specific To-Do item
exports.deleteToDo = async (req, res) => {
  try {
    // Extract ToDo item ID from request parameters
    const { id } = req.params;
    const result = await ToDo.findByIdAndDelete(id);
    console.log(result);
    res.send({ message: "ToDo Task Deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
