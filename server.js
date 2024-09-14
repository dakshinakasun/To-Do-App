require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routers/authRoutes");
const toDoRoutes = require("./routers/toDoRoutes");

// Set the port to use from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount authentication routes
app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

// Connect to the MongoDB database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
