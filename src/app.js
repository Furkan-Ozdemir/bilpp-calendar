const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is running on port ", port);
});
