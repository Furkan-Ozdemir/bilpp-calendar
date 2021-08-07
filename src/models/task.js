const mongoose = require("mongoose");
const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskName: {
    type: String,
    trim: true,
  },
  taskDate: {
    type: String,
    trim: true,
  },
  taskTime: {
    type: String,
  },
});

module.exports = Task;
