const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the ToDo model
const toDoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    completedOn: String,
    createdBy: {
      ref: "User",
      type: Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", toDoSchema);
