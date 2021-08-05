require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://adminFurkan:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.dpj3v.mongodb.net/bilpp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
